FROM node:14-alpine AS development

# Set NODE_ENV
ENV NODE_ENV development

# Add a work directory
WORKDIR /var/www/html/app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy app files
COPY . .
# Expose port

EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
