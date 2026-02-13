const state = {
  data: null,
  selected: null
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
  copyBtn: byId("copyBtn")
};

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

function generateFromSelected() {
  if (!state.selected) {
    refs.generatedOutput.value = "Please select a template first.";
    return;
  }
  let output = state.selected.template;
  const varInputs = refs.variablesArea.querySelectorAll("input[data-variable]");
  for (const input of varInputs) {
    const key = input.dataset.variable;
    const value = input.value.trim() || `[${key}]`;
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(new RegExp(`\\[${escaped}\\]`, "g"), value);
  }
  refs.generatedOutput.value = `${tonePrefix(refs.toneInput.value)}${output}`;
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
  wireEvents();
  renderList();
}

init().catch((err) => {
  refs.templateCount.textContent = "Failed to load templates";
  refs.templateList.innerHTML = `<pre>${String(err)}</pre>`;
});
