FROM registry.hyperlogy.com/node:14-slim as builder
WORKDIR /chat_web

COPY package.json ./
RUN npm install
RUN npm ci


FROM registry.hyperlogy.com/node:14-slim
WORKDIR /chat_web

COPY --from=builder /chat_web/node_modules node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:prod"]