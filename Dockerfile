# ============================================================
# BangNiCMS 官方站 — Multi-stage Dockerfile
# ------------------------------------------------------------
# Stage 1: 用 Node 22 + pnpm 构建 Astro 静态站产物到 /app/dist
# Stage 2: 拷贝产物到 Caddy 镜像 · 一个容器同时含 dist + Caddyfile
#
# 设计目的：
#   - Portainer Repository 模式可直接 build · 无需先在本地 build dist
#   - 内容更新：git push → Portainer 内 "Pull and redeploy" 即重新 build
#   - 镜像内置 dist · 不需要 ./dist 卷挂载（避免 Portainer Stack 路径困扰）
# ============================================================

# ─── Stage 1: Build ────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# pnpm 9.15.0 与 package.json#packageManager 对齐
RUN npm install -g pnpm@9.15.0

# 先拷依赖清单 · 利用 Docker layer cache（源码改动不重装依赖）
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 再拷源码
COPY . .

# 生产构建（astro check + astro build）· 产物到 /app/dist
RUN pnpm build

# ─── Stage 2: Caddy ─────────────────────────────────────────
FROM caddy:2-alpine

# 把构建产物嵌入 Caddy 镜像
COPY --from=builder /app/dist /srv/dist

# Caddy 配置
COPY Caddyfile /etc/caddy/Caddyfile

# 健康检查（compose 层也配 · 这里保留为 image 内置兜底）
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:2019/config/ || exit 1
