FROM node:20 as node
LABEL authors="Mikail Cayoglu"

# Set the working directory in the container
WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Build the application with production values
RUN npm run build-prod

FROM nginx:alpine
COPY --from=node /app/dist/mikail-cayoglu /usr/share/nginx/html

# expose port of nginx webserver
EXPOSE 80
