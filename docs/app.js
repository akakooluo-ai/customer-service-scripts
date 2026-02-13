const state = {
  data: null,
  selected: null,
  ai: null
};

const byId = (id) => document.getElementById(id);

const refs = {
  templateCount: byId("templateCount"),
  searchInput: byId("searchInput"),
  groupFilter: byId("groupFilter"),
  platformFilter: byId("platformFilter"),
  industryFilter: byId("industryFilter"),
  templateList: byId("templateList"),
  selectedTemplateTitle: byId("selectedTemplateTitle"),
  toneInput: byId("toneInput"),
  variablesArea: byId("variablesArea"),
  generatedOutput: byId("generatedOutput"),
  generateBtn: byId("generateBtn"),
  aiGenerateBtn: byId("aiGenerateBtn"),
  copyBtn: byId("copyBtn"),
  aiBaseUrl: byId("aiBaseUrl"),
  aiModel: byId("aiModel"),
  aiApiKey: byId("aiApiKey"),
  aiTemp: byId("aiTemp"),
  saveAiConfigBtn: byId("saveAiConfigBtn"),
  clearAiConfigBtn: byId("clearAiConfigBtn"),
  aiStatus: byId("aiStatus")
};

const AI_CONFIG_KEY = "talkq_byok_config_v1";

function textContains(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function fillSelect(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}

function renderVariableInputs(variables) {
  refs.variablesArea.innerHTML = "";
  if (!variables || variables.length === 0) {
    const hint = document.createElement("p");
    hint.className = "muted";
    hint.textContent = "This template has no variables.";
    refs.variablesArea.appendChild(hint);
    return;
  }

  for (const variable of variables) {
    const label = document.createElement("label");
    label.textContent = variable;
    const input = document.createElement("input");
    input.type = "text";
    input.dataset.variable = variable;
    input.placeholder = `Input ${variable}`;
    refs.variablesArea.appendChild(label);
    refs.variablesArea.appendChild(input);
  }
}

function tonePrefix(tone) {
  if (tone === "professional") {
    return "Thank you for contacting us. ";
  }
  if (tone === "apology") {
    return "We are sorry for the inconvenience. ";
  }
  return "Hi there! ";
}

function currentVariableMap() {
  const map = {};
  const varInputs = refs.variablesArea.querySelectorAll("input[data-variable]");
  for (const input of varInputs) {
    const key = input.dataset.variable;
    const value = input.value.trim() || `[${key}]`;
    map[key] = value;
  }
  return map;
}

function generateFromSelected() {
  if (!state.selected) {
    refs.generatedOutput.value = "Please select a template first.";
    return;
  }
  let output = state.selected.template;
  const vars = currentVariableMap();
  for (const key of Object.keys(vars)) {
    const value = vars[key];
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(new RegExp(`\\[${escaped}\\]`, "g"), value);
  }
  refs.generatedOutput.value = `${tonePrefix(refs.toneInput.value)}${output}`;
}

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

function readAiConfigForm() {
  return {
    baseUrl: refs.aiBaseUrl.value.trim(),
    model: refs.aiModel.value.trim(),
    apiKey: refs.aiApiKey.value.trim(),
    temperature: Number(refs.aiTemp.value)
  };
}

function configIsUsable(config) {
  return Boolean(config?.baseUrl && config?.model && config?.apiKey);
}

function setAiStatus(text) {
  refs.aiStatus.textContent = text;
}

function loadAiConfig() {
  try {
    const raw = localStorage.getItem(AI_CONFIG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeAiConfig(config) {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
}

function clearAiConfig() {
  localStorage.removeItem(AI_CONFIG_KEY);
  state.ai = null;
  refs.aiBaseUrl.value = "";
  refs.aiModel.value = "";
  refs.aiApiKey.value = "";
  refs.aiTemp.value = "0.3";
  setAiStatus("AI config cleared. Using template mode.");
}

function applyAiConfigToForm(config) {
  refs.aiBaseUrl.value = config?.baseUrl || "";
  refs.aiModel.value = config?.model || "";
  refs.aiApiKey.value = config?.apiKey || "";
  refs.aiTemp.value = String(config?.temperature ?? 0.3);
}

async function generateWithAi() {
  if (!state.selected) {
    refs.generatedOutput.value = "Please select a template first.";
    return;
  }

  const config = readAiConfigForm();
  if (!configIsUsable(config)) {
    generateFromSelected();
    setAiStatus("Missing AI config. Fallback to template mode.");
    return;
  }

  const tone = refs.toneInput.value;
  const variableMap = currentVariableMap();
  const userContext = JSON.stringify(
    {
      tone,
      variables: variableMap,
      pageTitle: state.selected.pageTitle,
      sectionTitle: state.selected.sectionTitle,
      scene: state.selected.scene,
      sourcePath: state.selected.sourcePath
    },
    null,
    2
  );

  const systemPrompt =
    "You are an ecommerce customer service writer. Produce a ready-to-send reply based on the selected template and variables. Keep facts conservative, avoid over-promising, and keep wording natural.";

  const userPrompt = `Selected template:\n${state.selected.template}\n\nContext:\n${userContext}\n\nReturn only the final reply text.`;

  refs.aiGenerateBtn.disabled = true;
  setAiStatus("Calling AI model...");
  try {
    const endpoint = `${normalizeBaseUrl(config.baseUrl)}/chat/completions`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        temperature: Number.isFinite(config.temperature) ? config.temperature : 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText.slice(0, 300)}`);
    }

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content?.trim();
    if (!message) {
      throw new Error("No model output returned.");
    }
    refs.generatedOutput.value = message;
    setAiStatus(`AI mode success via ${config.model}.`);
  } catch (err) {
    generateFromSelected();
    setAiStatus(`AI mode failed, fallback used: ${String(err.message || err)}`);
  } finally {
    refs.aiGenerateBtn.disabled = false;
  }
}

function selectTemplate(item) {
  state.selected = item;
  refs.selectedTemplateTitle.value = `${item.pageTitle} / ${item.sectionTitle}`;
  renderVariableInputs(item.variables);
  refs.generatedOutput.value = item.template;
}

function buildCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = item.sectionTitle;
  card.appendChild(title);

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${item.group} | ${item.platform} | ${item.industry} | ${item.sourcePath}`;
  card.appendChild(meta);

  if (item.scene) {
    const scene = document.createElement("p");
    scene.textContent = `Scene: ${item.scene}`;
    card.appendChild(scene);
  }

  const pre = document.createElement("pre");
  pre.textContent = item.template.slice(0, 240) + (item.template.length > 240 ? "..." : "");
  card.appendChild(pre);

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Use in generator";
  button.addEventListener("click", () => selectTemplate(item));
  card.appendChild(button);

  return card;
}

function getFilteredItems() {
  const q = refs.searchInput.value.trim();
  const group = refs.groupFilter.value;
  const platform = refs.platformFilter.value;
  const industry = refs.industryFilter.value;

  return state.data.items.filter((item) => {
    if (group && item.group !== group) return false;
    if (platform && item.platform !== platform) return false;
    if (industry && item.industry !== industry) return false;
    if (!q) return true;
    const searchText = `${item.pageTitle}\n${item.sectionTitle}\n${item.scene}\n${item.template}\n${item.sourcePath}`;
    return textContains(searchText, q);
  });
}

function renderList() {
  const list = getFilteredItems();
  refs.templateList.innerHTML = "";
  for (const item of list.slice(0, 150)) {
    refs.templateList.appendChild(buildCard(item));
  }
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No templates found.";
    refs.templateList.appendChild(empty);
  }
}

function wireEvents() {
  [refs.searchInput, refs.groupFilter, refs.platformFilter, refs.industryFilter].forEach((el) => {
    el.addEventListener("input", renderList);
    el.addEventListener("change", renderList);
  });

  refs.generateBtn.addEventListener("click", generateFromSelected);
  refs.aiGenerateBtn.addEventListener("click", generateWithAi);
  refs.saveAiConfigBtn.addEventListener("click", () => {
    const config = readAiConfigForm();
    if (!configIsUsable(config)) {
      setAiStatus("Save failed: Base URL, Model, and API Key are required.");
      return;
    }
    state.ai = config;
    writeAiConfig(config);
    setAiStatus(`Saved AI config for model ${config.model}.`);
  });
  refs.clearAiConfigBtn.addEventListener("click", clearAiConfig);

  refs.copyBtn.addEventListener("click", async () => {
    const text = refs.generatedOutput.value;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    refs.copyBtn.textContent = "Copied";
    setTimeout(() => {
      refs.copyBtn.textContent = "Copy";
    }, 1200);
  });
}

async function init() {
  const res = await fetch("./data/templates.json");
  state.data = await res.json();
  refs.templateCount.textContent = `${state.data.count} templates indexed`;
  fillSelect(refs.groupFilter, state.data.groups);
  fillSelect(refs.platformFilter, state.data.platforms);
  fillSelect(refs.industryFilter, state.data.industries);
  state.ai = loadAiConfig();
  applyAiConfigToForm(state.ai);
  if (state.ai && configIsUsable(state.ai)) {
    setAiStatus(`Loaded saved AI config for model ${state.ai.model}.`);
  } else {
    setAiStatus("No AI config saved. Using template mode.");
  }
  wireEvents();
  renderList();
}

init().catch((err) => {
  refs.templateCount.textContent = "Failed to load templates";
  refs.templateList.innerHTML = `<pre>${String(err)}</pre>`;
});
