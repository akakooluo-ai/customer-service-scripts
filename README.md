# 电商客服话术大全 | E-commerce Customer Service Scripts

> 🛒 专业的电商客服话术模板库，覆盖 Amazon、淘宝、京东、Shopee 等 11 大平台，以及服装、美妆、母婴等 30 个行业。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/akakooluo-ai/customer-service-scripts/pulls)
[![Powered by TalkQ](https://img.shields.io/badge/Powered%20by-TalkQ-orange)](https://www.talkq.vip)

**Keywords:** 电商客服话术、淘宝客服话术、京东客服模板、Amazon客服话术、Shopee客服模板、客服快捷回复、Customer Service Scripts、E-commerce Templates、AI Customer Service Prompts、Chatbot Response Templates

## 📖 项目简介

这是一个开源的电商客服话术模板库，由 [快语 TalkQ](https://www.talkq.vip) 团队整理维护。本项目是快语官网 [话术模板库](https://www.talkq.vip/templates/) 的开源版本。

### 新定位（免费层入口）

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
├── industries/                   # 按行业分类（fashion / electronics）
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
4. 访问 Pages 地址即可使用在线模板搜索和 Prompt Generator

本项目已内置：

- 免费知识库入口页（`docs/index.html`）
- 在线生成器（变量填充 + 语气风格 + 一键复制）
- 自动数据构建（`npm run build:site`）

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

| 平台 | 售前 | 售中 | 售后 |
|-----|:---:|:---:|:---:|
| [Amazon](platforms/amazon/) | [✅](platforms/amazon/presales.md) | [✅](platforms/amazon/sales.md) | [✅](platforms/amazon/aftersales.md) |
| [Shopee](platforms/shopee/) | [✅](platforms/shopee/presales.md) | [✅](platforms/shopee/sales.md) | [✅](platforms/shopee/aftersales.md) |
| [TikTok Shop](platforms/tiktok-shop/) | [✅](platforms/tiktok-shop/presales.md) | [✅](platforms/tiktok-shop/sales.md) | [✅](platforms/tiktok-shop/aftersales.md) |
| [eBay](platforms/ebay/) | [✅](platforms/ebay/presales.md) | [✅](platforms/ebay/sales.md) | [✅](platforms/ebay/aftersales.md) |
| [Shopify](platforms/shopify/) | [✅](platforms/shopify/presales.md) | [✅](platforms/shopify/sales.md) | [✅](platforms/shopify/aftersales.md) |
| [AliExpress](platforms/aliexpress/) | [✅](platforms/aliexpress/presales.md) | [✅](platforms/aliexpress/sales.md) | [✅](platforms/aliexpress/aftersales.md) |
| [Lazada](platforms/lazada/) | [✅](platforms/lazada/presales.md) | [✅](platforms/lazada/sales.md) | [✅](platforms/lazada/aftersales.md) |
| [Wish](platforms/wish/) | [✅](platforms/wish/presales.md) | [✅](platforms/wish/sales.md) | [✅](platforms/wish/aftersales.md) |
| [Temu](platforms/temu/) | [✅](platforms/temu/presales.md) | [✅](platforms/temu/sales.md) | [✅](platforms/temu/aftersales.md) |
| [淘宝/天猫](platforms/taobao/) | [✅](platforms/taobao/presales.md) | [✅](platforms/taobao/sales.md) | [✅](platforms/taobao/aftersales.md) |
| [京东](platforms/jd/) | [✅](platforms/jd/presales.md) | [✅](platforms/jd/sales.md) | [✅](platforms/jd/aftersales.md) |

> 欢迎贡献更多平台话术！

## 🏭 覆盖行业

<table>
<tr>
<td>

**👗 服饰鞋包**
| 行业 | 数量 | 链接 |
|-----|:---:|:---:|
| 服装行业 | 15 | [查看](industries/fashion.md) |
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
| 美妆护肤 | 15 | [查看](industries/beauty.md) |
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
| 电子产品 | 15 | [查看](industries/electronics.md) |
| 家居用品 | 15 | [查看](industries/home.md) |
| 户外运动 | 15 | [查看](industries/outdoor.md) |

*更多行业持续更新中...*

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
