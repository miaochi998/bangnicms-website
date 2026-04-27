# BangNiCMS 官方宣传站项目（bangnicms-website）

> 此项目是 [BangNiCMS](https://github.com/miaochi998/BangNiCMS) 的官方宣传站 + 文档站 + 扩展市场。
>
> **核心原则**：
> 1. **完全独立于 BangNiCMS 主仓源码**，本项目目录绝不修改 BangNiCMS 主仓任何代码
> 2. **吃自己的狗粮**（dogfooding）：本站本身就是用 BangNiCMS 搭建的
> 3. **通过插件 + 主题机制扩展**，不通过 fork 主仓代码

---

## 项目定位

承担 3 件事，对应 3 个公开页面：

| 角色 | URL | 内容 |
|---|---|---|
| **宣传站** | `/`（首页） | 介绍 BangNiCMS 功能、价值、使用场景、用户案例，吸引用户使用 |
| **文档站** | `/docs/*` | 部署文档、用户手册、主题/插件/模型使用文档（面向**非技术用户**，详细到能完全照做） |
| **扩展市场** | `/market/*` | 官方主题/插件/模型展示与下载，提供公开 API 给所有 BangNiCMS 实例消费 |

---

## 与 BangNiCMS 主仓的关系

```
┌──────────────────────────────────────────┐
│ BangNiCMS 主仓（独立维护，持续迭代）        │
│ 发版到：ghcr.io/miaochi998/bangnicms-*    │
└──────────────────┬───────────────────────┘
                   │ 拉镜像部署
                   ▼
┌──────────────────────────────────────────┐
│ 本项目 bangnicms-website                  │
│ - docker-compose.yml（拉主仓 GHCR 镜像）  │
│ - themes/official-site/（官网主题）       │
│ - plugins/registry-api/（Registry 插件） │
│ - plugins/docs-enhanced/（文档增强插件） │
│ - extensions-source/（要上架的扩展源码） │
└──────────────────────────────────────────┘
```

---

## 进展状态

- ✅ 2026-04-27：项目立项，实施方案文档撰写中
- ⏳ 详细方案见 `docs/implementation-plan-v1.md`

## 文档索引

- [`docs/implementation-plan-v1.md`](./docs/implementation-plan-v1.md) — **主实施方案**（必读）
