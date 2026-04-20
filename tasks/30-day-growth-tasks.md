# 30-Day Growth Tasks (GitHub Repo -> TalkQ Funnel)

## Goal

- Keep GitHub active every week
- Increase SEO coverage for high-intent and long-tail queries
- Drive users from free templates to TalkQ automation

## KPI (30 days)

- New templates added: 40-80
- README updates: 4
- Pages redeploys: 4+
- New indexed keyword pages/sections: 12+

## Progress log (dated)

| Date | What shipped |
|------|----------------|
| 2026-04-20 (Mon) | **Week 4 (repo, mostly complete):** README added **Top 20 Templates This Month (2026-04)** roundup; `general/presales.md` +10 high-conversion templates (`## 11`–`20`) covering urgency, coupon recovery, threshold upsell, first-order conversion, cart recovery, and bundle upsell; audited duplicate templates (no same-file duplicate blocks found; repeated cross-industry blocks kept intentionally for category landing coverage); normalized placeholder names in `general/presales.md`, `general/sales.md`, and `general/aftersales.md`; `npm run build:site` → `docs/data/templates.json` (`1370` total); README monthly changelog + counts updated. **Still manual:** validate Pages after push; decide whether to mirror the roundup into GitHub Discussions. |
| 2026-04-11 (Sat) | **Week 2 (repo):** `platforms/shopify/aftersales.md` +10 templates (§21–30); `platforms/amazon/aftersales.md` +10 (§21–30); `docs/index.html` already had Top Shopify / Top Amazon use-case cards; `npm run build:site` → `docs/data/templates.json`; README — before/after snippet, template counts, changelog. **Still manual:** open a GitHub Discussion for long-tail keywords; smoke-test GitHub Pages after push. |
| 2026-04-11 (Sat) | **Week 3 (repo):** `industries/beauty.md` +4 (`## 16`–`19`); `industries/electronics.md` +3 (`## 16`–`18`); `industries/fashion.md` +3 (`## 16`–`18`); `general/aftersales.md` +5 bilingual complaint/apology (`## 11`–`15`); README — Template Mode vs AI Mode **Quick comparison** bullets + counts; `docs/index.html` — footer TalkQ CTA; `npm run build:site`. **Still manual:** Discussion poll (draft below). |

## Week 1 (Foundation + Core Keywords)

- [ ] Add 10 templates in `general/` focused on refund, delay, complaint
- [ ] Add 5 templates in `platforms/shopify/aftersales.md`
- [ ] Add 5 templates in `platforms/amazon/aftersales.md`
- [ ] Update README changelog section with this week's additions
- [ ] Publish one repo Discussion: "How to use AI customer service prompts"
- [ ] Add one TalkQ upgrade CTA in README near generator section

Keywords:
- `ai customer service prompts`
- `customer service reply examples`
- `refund handling templates`

## Week 2 (Platform Long-tail Expansion)

_Week 2 repo work executed **2026-04-11** (calendar week alignment: treat as Week 2 delivery batch)._

- [x] Add 10 templates for Shopify scenarios (shipping delay, WISMO, returns)
- [x] Add 10 templates for Amazon scenarios (A-to-z, FBA delay, exchange)
- [x] Add 1 new section to `docs/index.html` listing top Shopify and Amazon use cases
- [x] Refresh `docs/data/templates.json` with `npm run build:site`
- [x] Post one short use-case in repo README with before/after examples

Keywords:
- `chatbot templates for shopify`
- `amazon customer service scripts`
- `ecommerce complaint response examples`

## Week 3 (Industry Coverage + Conversion Hook)

_Week 3 repo work executed **2026-04-11**._

- [x] Add 10 templates in high-volume industries (`beauty`, `electronics`, `fashion`)
- [x] Add 5 bilingual templates (EN + CN) for complaint/apology scenarios
- [x] Add one "Template Mode vs AI Mode" comparison block in README
- [x] Add one TalkQ CTA inside docs footer or SEO section
- [ ] Publish one GitHub Discussion with template voting poll _(copy **Discussion draft (Week 3)** below into GitHub → Discussions → New)_

Keywords:
- `ecommerce support scripts`
- `chatbot response templates`
- `ai customer service prompts free`

### Discussion draft (Week 3) — template voting poll

Title: **Which template cluster should we expand next? (Week 3 poll)**

Body (paste & adjust):

> We're prioritizing the next batch of free ecommerce support scripts. Vote with a reaction or comment:
>
> 1. **Refund + chargeback de-escalation** (cross-platform)
> 2. **Beauty / skincare** allergy & shade workflows
> 3. **Electronics** warranty + firmware edge cases
> 4. **Fashion** sizing + preorder delays
> 5. **Bilingual** EN/ZH complaint replies (more industries)
>
> Optional: drop a one-line scenario you need (no customer PII). Maintainer will map votes to `industries/*` and `general/` PRs.

## Week 4 (Optimization + Packaging)

- [x] Add 10 high-conversion templates: urgency, coupon recovery, refund retention
- [x] Audit old templates: remove duplicates and improve variable placeholders
- [x] Add monthly changelog entry in README
- [ ] Validate GitHub Pages deployment status and fix broken links
- [x] Publish "Top 20 templates this month" list in README or Discussions

Keywords:
- `customer support prompt generator`
- `shopify chatbot reply templates`
- `refund response examples ecommerce`

## Weekly Execution Checklist

- [ ] Monday: choose keyword cluster + define 10-20 templates to add
- [ ] Tuesday: write templates and normalize placeholder format `[Variable]`
- [ ] Wednesday: update README/changelog and push
- [ ] Thursday: verify Pages deployment + test generator
- [ ] Friday: publish one Discussion or social/community post
- [ ] Saturday: review stars/forks/traffic and record notes
- [ ] Sunday: plan next week's keyword cluster

## Task Naming Convention (for commits)

- `feat(templates): add shopify refund and delay scripts`
- `docs(readme): update weekly changelog and CTA`
- `feat(site): improve generator UX and byok guidance`
- `chore(data): rebuild templates index`
