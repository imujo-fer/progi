FROM node:18 AS frontend
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml tsconfig.json vite.config.mjs ./
COPY frontend ./frontend
RUN pnpm install
RUN pnpm run build
RUN echo "Build Frontend Done"
RUN ls frontend

# Stage 2: Build Spring Boot App
FROM openjdk:21-jdk AS backend
WORKDIR /app
COPY pom.xml .
COPY src src
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 3: Combine Frontend and Backend
FROM openjdk:21-jdk
WORKDIR /app
VOLUME /tmp

# Copy Spring Boot JAR
COPY --from=backend /app/target/*.jar app.jar

# Copy Frontend Build to Static Folder
COPY --from=frontend /app/frontend/dist /target/classes/static

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
EXPOSE 8082
