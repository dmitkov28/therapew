FROM node:lts-alpine as build

ARG VITE_OPENAI_API_KEY

WORKDIR /app 

COPY . . 

RUN npm i 

RUN npm run build

FROM nginx:1.21.1-alpine 

COPY --from=build /app/dist /usr/share/nginx/html 

ENV VITE_API_KEY=$VITE_OPENAI_API_KEY

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
