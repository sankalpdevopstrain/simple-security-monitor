FROM node:alpine

WORKDIR /app

# Copy full app FIRST (important for CI stability)
COPY app/ .

# Install dependencies inside app
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
