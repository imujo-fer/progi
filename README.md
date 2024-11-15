# Business Trip 
This project is a result of team collaboration for a course project in "Software Engineering" at the Faculty of Electrical Engineering and Computing, University of Zagreb. The goal of the project was to develop a comprehensive software solution for tracking and managing business travel, including planning, cost recording, and approval management, with a strong focus on user-friendly navigation and streamlined administration for both users and system administrators.

## Project Description
In today’s business environment, many companies and organizations face challenges in tracking and managing employees’ business trips. This project addresses the lack of a centralized system that enables easy oversight of trips, expenses, and documentation, while also facilitating communication between employees, management, and finance departments. Our motivation was to create a solution that offers transparency, reduces administrative burden, and speeds up approval and expense processing. Through this project, we aimed to build a tool that enhances work efficiency and accuracy in managing business travel. 

## Functional Requests

## Key Requests

## Technology

## Installation

### 1. Setup database

Create the following file `src/main/resources/application-local.yaml` and add the following snippet into it (replacing the database info):
```yaml
spring:
  application:
    name: api
  datasource:
    url: db_url (eg. jdbc:postgresql://localhost:5432/[DATABASE_NAME])
    username: db_username
    password: db_password (optional)
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
server:
  port: 8082
```
### 2. Install frontend packages

```
cd frontend
nvm use
pnpm i
```

## Team Members
Adriano Faletar 
Polina Rykova
Marija Klenkar
Patrik Landeka 
Vilim Skorić
Vjekoslav Gračaković
Ivo Mujo

## Contributions
Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md













