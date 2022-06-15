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
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=builder --chown=nginx:nginx /app/react-frontend/build .
RUN chmod -R 755 . && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
EXPOSE 80 443
USER nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
