FROM openjdk:8-jre-alpine
WORKDIR app
EXPOSE 8080
COPY ./build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
CMD ["java","-jar","app.jar"]