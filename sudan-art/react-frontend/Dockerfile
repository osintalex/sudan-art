FROM node:16-buster-slim AS builder

# Set working directory for react project
WORKDIR /app/react-frontend
COPY ["package.json", "package-lock.json", "./"]
COPY ["public/", "public/"]
COPY ["src/", "src/"]
RUN npm install
RUN npm run build

FROM nginx:1.21.4-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/react-frontend/build .
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
