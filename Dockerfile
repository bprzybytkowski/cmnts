FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
CMD npm run prod
