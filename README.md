# 电商客服话术大全 | E-commerce Customer Service Scripts

> 🛒 专业的电商客服话术模板库，覆盖 Amazon、淘宝、京东、Shopee 等 11 大平台，以及服装、美妆、母婴、食品饮品等 34 个行业，已索引 1,465 条模板。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/akakooluo-ai/customer-service-scripts/pulls)
[![Powered by TalkQ](https://img.shields.io/badge/Powered%20by-TalkQ-orange)](https://www.talkq.vip)

## 🌐 在线入口（Free Knowledge Base）

- 立即使用（GitHub Pages）：[https://akakooluo-ai.github.io/customer-service-scripts/](https://akakooluo-ai.github.io/customer-service-scripts/) 
  Search 1,465+ customer service templates online, fill variables, and generate ready-to-send replies.
- 升级自动化（TalkQ）：[https://www.talkq.vip](https://www.talkq.vip)
  Move from manual copy-and-send to AI reply automation, team collaboration, and workflow routing.

> 使用模板和生成器先快速上手；需要自动回复、团队协作和工作流时，升级到 TalkQ。

**Keywords:** 电商客服话术、淘宝客服话术、京东客服模板、Amazon客服话术、Shopee客服模板、客服快捷回复、Customer Service Scripts、E-commerce Templates、AI Customer Service Prompts、Chatbot Response Templates

## 📖 项目简介

这是一个开源的电商客服话术模板库，由 [快语 TalkQ](https://www.talkq.vip) 团队整理维护。本项目是快语官网 [话术模板库](https://www.talkq.vip/templates/) 的开源版本。

### 定位（免费层入口）

- GitHub Repo = 免费 AI 客服知识库入口（可检索、可复制、可生成）
- TalkQ 官网 = 自动化回复、团队协作、AI 智能工作流（升级层）

> 这是标准 SaaS 漏斗：先提供可直接使用的免费价值，再承接到工具化能力。

**为什么需要这个项目？**

- 电商客服需要处理多平台、多场景、多语言的客户咨询
- 专业的话术模板可以提升响应速度 60%，转化率提升 35%
- 统一的话术库可以保证服务质量一致性

**适用人群：**

- 电商卖家和客服团队（淘宝、京东、拼多多等）
- 跨境电商卖家（Amazon、Shopee、eBay 等）
- 独立站运营者
- 电商客服培训师

> 💡 **提示**：本项目提供话术文本内容，如需更高效的话术管理体验，推荐配合 [快语客服工具](https://www.talkq.vip) 使用，支持一键导入、双击发送、AI智能生成等功能。

## 📂 目录结构

```
customer-service-scripts/
├── platforms/                    # 按平台分类（11个平台，每个含 presales/sales/aftersales）
│   ├── amazon/
│   ├── shopee/
│   ├── ebay/
│   ├── shopify/
│   ├── aliexpress/
│   ├── lazada/
│   ├── wish/
│   ├── temu/
│   ├── taobao/
│   ├── jd/
│   └── tiktok-shop/
├── industries/                   # 按行业分类（34个行业模板）
├── general/                      # 通用话术（presales / sales / aftersales）
├── docs/                         # GitHub Pages 站点（免费知识库 + 在线生成器）
├── scripts/build-kb.mjs          # 从 markdown 构建 docs/data/templates.json
├── CONTRIBUTING.md               # 贡献指南
└── LICENSE                       # MIT许可证
```

## 🚀 快速开始

### 方式一：直接复制使用

浏览对应的 `.md` 文件，复制需要的话术到你的客服工具中。

### 方式二：配合快捷回复工具使用

推荐配合 [快语](https://www.talkq.vip) 等客服快捷回复工具使用，可以实现话术分组管理、一键发送、团队共享等功能。

### 方式三：部署成 GitHub 在线知识库（无需独立建站）

1. 保持仓库中的 `docs/` 与 `.github/workflows/deploy-pages.yml`
2. 在仓库设置中启用 GitHub Pages（Source: GitHub Actions）
3. Push 到 `main` 或 `master` 分支后自动发布
4. 访问 Pages 地址即可使用在线模板搜索和客服话术生成器（Customer Service Response Generator）

本项目已内置：

- 免费知识库入口页（`docs/index.html`）
- 在线生成器（变量填充 + 语气风格 + 一键复制）
- BYOK AI 模式（用户自己填写 Base URL / Model / API Key，本地保存，不经过项目方服务器）
- 自动数据构建（`npm run build:site`）

## Monthly Changelog

### 2026-04

- Renamed the online generator to `Customer Service Response Generator`
- Added GitHub Pages live entry links and a 30-day growth task list
- Confirmed `main` as the primary branch for GitHub Pages deployment
- Improved the build pipeline so both `##` and `###` template headings are indexed into `docs/data/templates.json`
- Added 10 Shopify and 10 Amazon after-sales templates (split shipments, Locker, MCF, pre-ship cancel, chargeback de-escalation, etc.) and rebuilt `docs/data/templates.json`
- **2026-04-11:** Week 2 growth batch merged into repo (see **Progress log** table in [tasks/30-day-growth-tasks.md](tasks/30-day-growth-tasks.md))
- **2026-04-11:** Week 3 — added industry templates (beauty +4, electronics +3, fashion +3), bilingual complaint/apology blocks in `general/aftersales.md` (+5), README comparison note, TalkQ CTA in `docs/index.html` footer

30天持续更新任务清单：

- [tasks/30-day-growth-tasks.md](tasks/30-day-growth-tasks.md)

### 2026-04-20

- Added a new `Top 20 templates this month` roundup in README for Week 4 packaging work
- Curated high-intent templates across `general/`, `platforms/`, and `industries/` to improve discoverability
- Added 10 new high-conversion presales templates in `general/presales.md` and rebuilt `docs/data/templates.json` to `1,370` indexed templates
- Audited older templates and normalized placeholder names in `general/` to improve variable quality for the online generator

### 2026-05-12

- Added `npm run lint:templates` to audit placeholder quality before publishing
- Normalized placeholder casing and long labels across existing templates to improve generator input fields
- Added 65 industry templates and completed `beauty`, `electronics`, `fashion`, `home`, and `outdoor` to 30 templates each
- Rebuilt `docs/data/templates.json` to `1,435` indexed templates
- Added the May growth plan: [tasks/2026-05-tasks.md](tasks/2026-05-tasks.md)

### 2026-06-21

- Added 20 cross-border platform after-sales templates across Temu, TikTok Shop, Shopee, and Lazada
- Added 10 universal in-order sales templates in `general/sales.md`
- Refreshed the monthly Top 20 list around cross-border platform support scenarios
- Rebuilt `docs/data/templates.json` to `1,465` indexed templates
- Added the June growth plan: [tasks/2026-06-tasks.md](tasks/2026-06-tasks.md)

## Template Mode vs AI Mode

| Mode | Best For | Input Needed | Output Style | Risk Level |
|-----|-----|-----|-----|-----|
| Template Mode | Fast copy-and-send replies | Pick a template and fill `[Variable]` fields | Stable, policy-safe, close to the source template | Low |
| AI Mode (BYOK) | Personalized rewrites and tone adjustment | Base URL, model, API key, selected template, variables | More natural and adaptive wording | Medium |

Template Mode is the fastest way to ship a reply. When a team needs more natural phrasing, multilingual adjustments, or context-aware rewrites, the built-in AI Mode can generate a refined response locally in the browser.

**Quick comparison:** use **Template Mode** for regulated wording, refunds with fixed policy text, and anything you must audit later. Use **AI Mode** when you already picked a template but need a softer apology, a different language register, or a shorter SMS-style rewrite — still starting from the same `[Variable]` contract so facts stay consistent.

Want batch automation, team collaboration, and workflow routing instead of one-by-one generation? Upgrade to [TalkQ](https://www.talkq.vip).

### Use-case snapshot: shipping delay (before / after)

**Before (vague):** “Your package is delayed. Please wait.”

**After (template-driven):** Open `platforms/shopify/aftersales.md` → *WISMO 延迟安抚*, fill `[Order Number]`, `[Carrier]`, `[New ETA]`, and `[Compensation]` — you get a calm, step-by-step update customers can act on. The same pattern works for Amazon FBA delay scripts under `platforms/amazon/aftersales.md`.

## Top 20 Templates This Month (2026-06)

This month's shortlist focuses on cross-border platform after-sales and in-order conversion: Temu refund friction, TikTok Shop livestream expectation gaps, Shopee delivery protection, Lazada pickup cases, and universal sales recovery scripts.

1. **物流超时安抚**
   Best for Temu packages that are late but still showing carrier scans.
   Source: [platforms/temu/aftersales.md](platforms/temu/aftersales.md)
2. **退货标签无法使用**
   Best for Temu return labels that fail to print, scan, or drop off.
   Source: [platforms/temu/aftersales.md](platforms/temu/aftersales.md)
3. **重复退款申请说明**
   Best for reducing duplicate Temu refund tickets while keeping buyers reassured.
   Source: [platforms/temu/aftersales.md](platforms/temu/aftersales.md)
4. **多件商品部分损坏**
   Best for partial damage in multi-item Temu orders.
   Source: [platforms/temu/aftersales.md](platforms/temu/aftersales.md)
5. **直播展示差异说明**
   Best for TikTok Shop buyers comparing real items with livestream visuals.
   Source: [platforms/tiktok-shop/aftersales.md](platforms/tiktok-shop/aftersales.md)
6. **达人优惠码预期差异**
   Best for creator code discount confusion and campaign eligibility checks.
   Source: [platforms/tiktok-shop/aftersales.md](platforms/tiktok-shop/aftersales.md)
7. **套装缺件处理**
   Best for TikTok Shop bundles missing an accessory or campaign item.
   Source: [platforms/tiktok-shop/aftersales.md](platforms/tiktok-shop/aftersales.md)
8. **爆款缺货取消安抚**
   Best for viral TikTok Shop products that sell out after live campaigns.
   Source: [platforms/tiktok-shop/aftersales.md](platforms/tiktok-shop/aftersales.md)
9. **Shopee Guarantee 延长提醒**
   Best for buyers worried the order protection period will expire before delivery.
   Source: [platforms/shopee/aftersales.md](platforms/shopee/aftersales.md)
10. **货到付款拒收处理**
   Best for Shopee COD refusal, failed delivery, and reorder guidance.
   Source: [platforms/shopee/aftersales.md](platforms/shopee/aftersales.md)
11. **颜色尺码发错处理**
   Best for wrong variation, wrong size, and wrong color after-sales cases.
   Source: [platforms/shopee/aftersales.md](platforms/shopee/aftersales.md)
12. **上门取件失败**
   Best for Shopee return pickup failures and rescheduling guidance.
   Source: [platforms/shopee/aftersales.md](platforms/shopee/aftersales.md)
13. **退货取件失败**
   Best for Lazada return pickup no-shows and unavailable reschedule buttons.
   Source: [platforms/lazada/aftersales.md](platforms/lazada/aftersales.md)
14. **未收到货纠纷举证**
   Best for Lazada proof-of-delivery disputes when tracking says delivered.
   Source: [platforms/lazada/aftersales.md](platforms/lazada/aftersales.md)
15. **分包裹配送说明**
   Best for Lazada split shipments where only part of an order arrived.
   Source: [platforms/lazada/aftersales.md](platforms/lazada/aftersales.md)
16. **质保转接说明**
   Best for Lazada warranty support after the return window ends.
   Source: [platforms/lazada/aftersales.md](platforms/lazada/aftersales.md)
17. **加购配件推荐**
   Best for increasing order value before fulfillment cutoff.
   Source: [general/sales.md](general/sales.md)
18. **优惠券未使用挽回**
   Best for customers who forgot a discount code after placing an order.
   Source: [general/sales.md](general/sales.md)
19. **预售订单安抚**
   Best for preorder reassurance with clear ship and notification dates.
   Source: [general/sales.md](general/sales.md)
20. **配送升级建议**
   Best for customers who need faster delivery before dispatch.
   Source: [general/sales.md](general/sales.md)

Want more? Browse the full platform templates, then move into industry-specific scripts when you need more precise recommendations or objection handling.

## 📋 话术模板预览

### Amazon 售前话术示例

```
【Prime配送说明】
Hello! This item is eligible for Amazon Prime fast shipping. 
If you are a Prime member, you can enjoy free two-day delivery. 
At checkout, please make sure your address supports Prime service.
```

### 服装行业尺码咨询示例

```
【尺码咨询】
Hi! For sizing, please check our size chart in the product images.
Measurements: Bust: [Size] | Waist: [Size] | Hip: [Size]
This item runs [true to size/small/large].
Need help? Send us your measurements and we'll recommend the perfect size!
```

## 📊 覆盖平台

当前已覆盖 `11` 个电商平台，共 `390` 条平台模板。

| 平台 | 售前 | 售中 | 售后 | 合计 |
|-----|:---:|:---:|:---:|:---:|
| [Amazon](platforms/amazon/) | [10](platforms/amazon/presales.md) | [10](platforms/amazon/sales.md) | [30](platforms/amazon/aftersales.md) | 50 |
| [Shopee](platforms/shopee/) | [10](platforms/shopee/presales.md) | [10](platforms/shopee/sales.md) | [15](platforms/shopee/aftersales.md) | 35 |
| [TikTok Shop](platforms/tiktok-shop/) | [10](platforms/tiktok-shop/presales.md) | [10](platforms/tiktok-shop/sales.md) | [15](platforms/tiktok-shop/aftersales.md) | 35 |
| [eBay](platforms/ebay/) | [10](platforms/ebay/presales.md) | [10](platforms/ebay/sales.md) | [10](platforms/ebay/aftersales.md) | 30 |
| [Shopify](platforms/shopify/) | [10](platforms/shopify/presales.md) | [10](platforms/shopify/sales.md) | [30](platforms/shopify/aftersales.md) | 50 |
| [AliExpress](platforms/aliexpress/) | [10](platforms/aliexpress/presales.md) | [10](platforms/aliexpress/sales.md) | [10](platforms/aliexpress/aftersales.md) | 30 |
| [Lazada](platforms/lazada/) | [10](platforms/lazada/presales.md) | [10](platforms/lazada/sales.md) | [15](platforms/lazada/aftersales.md) | 35 |
| [Wish](platforms/wish/) | [10](platforms/wish/presales.md) | [10](platforms/wish/sales.md) | [10](platforms/wish/aftersales.md) | 30 |
| [Temu](platforms/temu/) | [10](platforms/temu/presales.md) | [10](platforms/temu/sales.md) | [15](platforms/temu/aftersales.md) | 35 |
| [淘宝/天猫](platforms/taobao/) | [10](platforms/taobao/presales.md) | [10](platforms/taobao/sales.md) | [10](platforms/taobao/aftersales.md) | 30 |
| [京东](platforms/jd/) | [10](platforms/jd/presales.md) | [10](platforms/jd/sales.md) | [10](platforms/jd/aftersales.md) | 30 |

> 欢迎贡献更多平台话术！

## 🏭 覆盖行业

当前已覆盖 `34` 个行业，共 `1,020` 条行业模板。

<table>
<tr>
<td>

**👗 服饰鞋包**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 服装行业 | 30 | [查看](industries/fashion.md) |
| 女装 | 30 | [查看](industries/womens-clothing.md) |
| 男装 | 30 | [查看](industries/mens-clothing.md) |
| 童装 | 30 | [查看](industries/kids-clothing.md) |
| 内衣 | 30 | [查看](industries/underwear.md) |
| 运动服 | 30 | [查看](industries/sportswear.md) |
| 大码女装 | 30 | [查看](industries/plus-size.md) |
| 女鞋 | 30 | [查看](industries/womens-shoes.md) |
| 男鞋 | 30 | [查看](industries/mens-shoes.md) |
| 童鞋 | 30 | [查看](industries/kids-shoes.md) |
| 箱包 | 30 | [查看](industries/bags.md) |
| 皮具 | 30 | [查看](industries/leather.md) |
| 汉服 | 30 | [查看](industries/traditional-clothing.md) |
| 工装制服 | 30 | [查看](industries/workwear.md) |

</td>
<td>

**💄 美妆护肤**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 美妆护肤 | 30 | [查看](industries/beauty.md) |
| 护肤品 | 30 | [查看](industries/skincare.md) |
| 彩妆 | 30 | [查看](industries/makeup.md) |
| 香水 | 30 | [查看](industries/perfume.md) |
| 美容仪器 | 30 | [查看](industries/beauty-devices.md) |
| 男士护理 | 30 | [查看](industries/mens-grooming.md) |
| 美甲美睫 | 30 | [查看](industries/nail-lash.md) |

**👶 母婴用品**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 奶粉辅食 | 30 | [查看](industries/baby-food.md) |
| 纸尿裤 | 30 | [查看](industries/diapers.md) |
| 童装童鞋 | 30 | [查看](industries/baby-clothing.md) |
| 玩具 | 30 | [查看](industries/toys.md) |
| 孕产用品 | 30 | [查看](industries/maternity.md) |
| 婴儿用品 | 30 | [查看](industries/baby-products.md) |

</td>
<td>

**🏠 家居数码**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 电子产品 | 30 | [查看](industries/electronics.md) |
| 家居用品 | 30 | [查看](industries/home.md) |
| 户外运动 | 30 | [查看](industries/outdoor.md) |

**🍵 食品饮品**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 生鲜食品 | 30 | [查看](industries/fresh-food.md) |
| 休闲零食 | 30 | [查看](industries/snacks.md) |
| 茶叶 | 30 | [查看](industries/tea.md) |
| 酒类 | 30 | [查看](industries/alcohol.md) |

</td>
</tr>
</table>

## 🤝 贡献指南

欢迎提交 PR 贡献更多话术模板！

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/new-scripts`)
3. 提交更改 (`git commit -m 'Add new scripts for XXX'`)
4. 推送到分支 (`git push origin feature/new-scripts`)
5. 创建 Pull Request

### 话术格式规范

```markdown
### 话术标题

**适用场景：** 描述何时使用

**话术内容：**
具体话术内容，使用 [变量] 标记可替换部分

**使用技巧：**
- 技巧1
- 技巧2
```

## 📜 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🔗 相关资源

- **在线话术库**：[https://www.talkq.vip/templates/](https://www.talkq.vip/templates/) - 本项目的在线版本，更多话术模板
- **快语官网**：[https://www.talkq.vip](https://www.talkq.vip) - 客服快捷回复工具
- **使用技巧**：[https://www.talkq.vip/blog/](https://www.talkq.vip/blog/) - 客服效率提升技巧

## 🤖 与 AI Skills 关联（可选增强）

可以把本仓库作为 AI Skill 的知识源，做成“模板检索 + 变量生成”的技能：

1. 在 Skill 中读取 `docs/data/templates.json`
2. 按平台/行业/场景检索最匹配模板
3. 让用户填变量后输出可直接发送的客服回复
4. 需要自动化执行时引导到 TalkQ 完整工作流

这样 GitHub 负责“免费查询”，Skill/产品负责“自动执行”。

仓库内已提供一个可复用的 Skill 示例：

- `skills/customer-service-reply/SKILL.md`

## 🏷️ GitHub Topics 建议

在仓库设置中添加以下 Topics，方便被搜索到：

`ecommerce` `customer-service` `amazon` `shopee` `tiktok-shop` `cross-border` `templates` `scripts` `chinese` `multilingual`

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐ 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=akakooluo-ai/customer-service-scripts&type=Date)](https://star-history.com/#akakooluo-ai/customer-service-scripts&Date)

## 💬 交流与反馈

- 🐛 发现问题？[提交 Issue](https://github.com/akakooluo-ai/customer-service-scripts/issues)
- 💡 有新想法？[发起 Discussion](https://github.com/akakooluo-ai/customer-service-scripts/discussions)
- 📧 联系我们：访问 [快语官网](https://www.talkq.vip)

---

<p align="center">
  <b>由 <a href="https://www.talkq.vip">快语 TalkQ</a> 整理维护</b><br>
  <sub>让客服工作更高效</sub>
</p>

<p align="center">
  <a href="https://www.talkq.vip/templates/">📋 在线模板库</a> •
  <a href="https://www.talkq.vip">🌐 官网</a> •
  <a href="https://www.talkq.vip/blog/">📖 博客</a>
</p>
