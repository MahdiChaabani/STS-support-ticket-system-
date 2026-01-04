# Build stage
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace

# copy Gradle wrapper and project files
COPY gradlew gradlew
COPY gradle gradle
COPY settings.gradle settings.gradle
COPY build.gradle build.gradle
# (optional) pom.xml is not used for this Gradle project; skip copying

# copy source
COPY src src

RUN chmod +x ./gradlew || true

# build the fat jar
RUN ./gradlew bootJar -x test --no-daemon

# Runtime stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# copy jar
COPY --from=build /workspace/build/libs/*.jar ./app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "./app.jar"]
