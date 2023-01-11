# Frontend builder stage
FROM node as builder_frontend
COPY . /magda-frontend
WORKDIR /magda-frontend
RUN npm install
RUN npm run build

FROM nginx:latest
ARG VERSION="SNAPSHOT"
ARG GIT_COMMIT="unknown"
# See https://github.com/opencontainers/image-spec/blob/main/annotations.md
LABEL org.opencontainers.image.title="MAGDA Frontend"
LABEL org.opencontainers.image.description="MAGDA application frontend"
LABEL org.opencontainers.image.source="https://bitbucket.org/biobankokhu/magda"
LABEL org.opencontainers.image.version=${VERSION}
LABEL org.opencontainers.image.revision=${GIT_COMMIT}

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder_frontend /magda-frontend/dist/magda-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80
