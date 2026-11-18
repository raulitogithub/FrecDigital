FROM node:20-slim AS builder
WORKDIR /app

# pnpm vía Corepack, en la versión fijada en "packageManager" de package.json
RUN corepack enable

# --frozen-lockfile: instala exactamente las versiones de pnpm-lock.yaml
# (falla si el lockfile no coincide con package.json, en vez de actualizar nada)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Identificador de la versión (el commit), pasado por /opt/frecdigital/deploy.sh.
# Next.js lo usa para detectar que el navegador tiene una página de una versión
# anterior y recargarla al navegar, en vez de fallar. Vacío = sin identificador.
ARG NEXT_DEPLOYMENT_ID=""
ENV NEXT_DEPLOYMENT_ID=${NEXT_DEPLOYMENT_ID}
RUN pnpm run build

FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
