# Setup

## 1. Setup database

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
## 2. Install frontend packages

```
cd frontend
nvm use
pnpm i
```
