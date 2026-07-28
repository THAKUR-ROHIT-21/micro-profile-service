FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=8001


EXPOSE 8001

USER node

CMD ["npm", "start"]