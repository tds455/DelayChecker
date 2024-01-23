# Use the official Nginx image
FROM nginx:latest

# Copy static content (e.g., your website files) to the default Nginx web root
COPY ./html /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Define user for Dockerfile
USER root

# Define the default command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]