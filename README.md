# Business Trip 
https://progi-production.up.railway.app/
This project is a result of team collaboration for a course project in "Software Engineering" at the Faculty of Electrical Engineering and Computing, University of Zagreb. The goal of the project was to develop a comprehensive software solution for tracking and managing business travel, including planning, cost recording, and approval management, with a strong focus on user-friendly navigation and streamlined administration for both users and system administrators.

## Project Description
In today’s business environment, many companies and organizations face challenges in tracking and managing employees’ business trips. This project addresses the lack of a centralized system that enables easy oversight of trips, expenses, and documentation, while also facilitating communication between employees, management, and finance departments. Our motivation was to create a solution that offers transparency, reduces administrative burden, and speeds up approval and expense processing. Through this project, we aimed to build a tool that enhances work efficiency and accuracy in managing business travel. 

## Functional Requests

The app includes several functionalities designed to manage and streamline business trip processes. High-priority features include role-based logins (F-001), allowing employees to submit and manage business trip requests (F-004, F-005) and handle expense reports (F-006). Department heads can review, approve, and manage requests within their department (F-009) and view statistics on trips and expenses (F-010). Accountants are responsible for reviewing and approving expense reports, as well as managing pending payments (F-012, F-013, F-014). Directors oversee the approval of payments and gain access to company-wide data on trips and expenses (F-016, F-017, F-019).

Medium-priority features include currency conversion to euros (F-003), viewing business trip destinations on a map (F-008), and generating PDF reports for requests and statistics (F-007, F-011, F-015, F-018). Notifications of status updates related to requests and approvals are sent to users (F-002). Admins are able to modify company parameters, such as address or pricing (F-020).

## Key Requests

The key requests for the app include role-based logins (F-001), business trip request management (F-004, F-005), and expense report handling (F-006). Employees must be able to generate PDF reports for their requests (F-007). Department heads should manage requests, approve trips, and view departmental statistics (F-009, F-010). Accountants need the ability to handle expense reports and manage payments (F-012, F-013, F-014). Directors must approve payments and oversee company-wide trip data (F-016, F-017, F-019). Lastly, admins should be able to modify company parameters (F-020).

## Technology

The app is built using a multi-layered client-server architecture based on the Model-View-Controller (MVC) design pattern. The backend is developed with Spring Boot and Java, supporting HTTP communication, while the frontend uses React and TypeScript for a dynamic user experience. Data is stored in a PostgreSQL relational database for efficient management.

Core technologies include HTTP/HTTPS for secure communication and RESTful APIs for frontend-backend interaction. Docker is used for deployment, and the team utilizes Visual Studio Code and IntelliJ IDEA to streamline development. This tech stack ensures scalability and maintainability.

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
## Domain
The application is deployed and available publically at the domain: https://progi-production.up.railway.app

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













