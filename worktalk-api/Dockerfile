FROM registry.hyperlogy.com/node:14-slim as builder
WORKDIR /chat_app


# RUN apt-get update && apt-get install -y build-essential python
# COPY package.json package-lock.json ./
COPY package.json ./
RUN npm install 
RUN npm ci


FROM registry.hyperlogy.com/node:14-slim
WORKDIR /chat_app

COPY --from=builder /chat_app/node_modules node_modules
COPY . .

EXPOSE 3001

CMD ["npm", "run", "serve:prod"]