FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# Proxy API requests to backend via nginx config or rely on ALB path-based routing
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
