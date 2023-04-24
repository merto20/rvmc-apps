FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /build
COPY . .
RUN npm i && npm run build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
ARG APP=travel-easy
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${APP}/.next/static ./dist/apps/${APP}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${APP}/public ./apps/${APP}/public

USER nextjs

EXPOSE 3000

ENV APP_PATH=apps/${APP}/server.js
ENV PORT 3000

CMD node $APP_PATH