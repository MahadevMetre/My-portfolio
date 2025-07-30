FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your project files to Nginx directory
COPY . /usr/share/nginx/html

# Expose internal port (Docker mapping will handle 8081)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
