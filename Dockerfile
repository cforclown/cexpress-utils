FROM node:16-slim

# Set the Current Working Directory inside the container
WORKDIR /app

COPY package*.json /app/
COPY tsconfig.json /app/

RUN npm install\
    && npm install -g tsc

COPY . .

RUN npm run build

# Expose port 9090 to the outside world
EXPOSE 8080

# Command to run the executable
CMD [ "node", "./build/index.js" ]
