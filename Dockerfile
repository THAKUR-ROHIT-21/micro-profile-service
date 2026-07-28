FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

RUN chown -R node:node /app

USER node

EXPOSE 8000

CMD ["npm", "start"]