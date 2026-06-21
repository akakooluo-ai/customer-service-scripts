# 贡献指南 | Contributing Guide

感谢您对本项目的关注！我们欢迎任何形式的贡献。

Thank you for your interest in contributing to this project!

## 如何贡献 | How to Contribute

### 1. 提交新话术 | Submit New Scripts

如果您有优质的客服话术想要分享：

1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/new-scripts`
3. 添加话术文件（遵循下方格式规范）
4. 提交更改：`git commit -m 'Add new scripts for XXX'`
5. 推送分支：`git push origin feature/new-scripts`
6. 创建 Pull Request

### 2. 改进现有话术 | Improve Existing Scripts

如果您发现现有话术可以改进：

1. 在 Issues 中描述问题或建议
2. 或直接提交 PR 修改

### 3. 报告问题 | Report Issues

如果您发现错误或有建议：

1. 在 Issues 中创建新 Issue
2. 描述问题或建议
3. 如有可能，提供解决方案

## 话术格式规范 | Script Format

请遵循以下格式提交话术：

```markdown
## [序号]. [话术标题]

**适用场景：** [描述何时使用这个话术]

\`\`\`
[话术内容]
使用 [变量] 标记可替换部分
\`\`\`

---
```

### 变量命名规范 | Variable Naming

- `[Product Name]` - 产品名称
- `[Price]` - 价格
- `[Order Number]` - 订单号
- `[Tracking Number]` - 物流单号
- `[Date]` - 日期
- `[Customer Name]` - 客户姓名
- `[Size]` - 尺码/规格
- `[Color]` - 颜色
- `[Quantity]` - 数量
- `[Amount]` - 金额

## 话术质量标准 | Quality Standards

提交的话术应满足以下标准：

### 1. 专业性
- ✅ 使用专业术语，符合行业规范
- ✅ 语言准确，避免歧义
- ✅ 符合平台规则和政策

### 2. 友好性
- ✅ 语气友好、礼貌
- ✅ 表达清晰、易懂
- ✅ 体现服务意识

### 3. 实用性
- ✅ 覆盖真实场景
- ✅ 可直接使用或稍作修改
- ✅ 包含变量占位符

### 4. 完整性
- ✅ 包含必要信息
- ✅ 提供解决方案
- ✅ 引导下一步行动

## 目录结构 | Directory Structure

```
customer-service-scripts/
├── platforms/          # 按平台分类
│   ├── amazon/
│   ├── shopee/
│   ├── ebay/
│   └── ...
├── industries/         # 按行业分类
│   ├── fashion.md
│   ├── electronics.md
│   └── ...
└── general/            # 通用话术
    ├── presales.md
    ├── sales.md
    └── aftersales.md
```

## 语言要求 | Language Requirements

- 跨境电商平台话术：英文
- 国内平台话术：中文
- 行业话术：根据目标市场选择语言

## 行为准则 | Code of Conduct

- 尊重所有贡献者
- 提供建设性反馈
- 保持专业和友好

## 联系我们 | Contact

如有任何问题，请通过以下方式联系：

- 创建 Issue
- 访问 [快语AI官网](https://www.talkq.vip)

---

感谢您的贡献！🙏

Thank you for contributing!
