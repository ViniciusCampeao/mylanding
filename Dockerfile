# ── build ──────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Copia manifestos. O bun.lock é removido de propósito: ele aponta para o
# registro privado do Lovable (dá 403 fora da infra deles). Sem ele, o npm
# resolve tudo pelo registro público (registry.npmjs.org).
COPY package.json package-lock.json ./
RUN rm -f bun.lock && npm install

COPY . .
RUN rm -f bun.lock

# Força o Nitro a gerar um servidor Node real (listener HTTP na PORT).
# Sem isso, o preset padrão é "cloudflare-module" (Worker), que NÃO roda com
# `node index.mjs` — ele espera o runtime do wrangler.
ENV NITRO_PRESET=node-server
RUN npm run build

# ── runner ─────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
