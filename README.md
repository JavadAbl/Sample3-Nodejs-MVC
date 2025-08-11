# Sample3-Nodejs-MVC

An **admin dashboard** built with **Node.js** following an MVC-like architecture and object-oriented principles.  
The dashboard allows admins to **create products**, **generate invoices (factors)**, and **view reports** in a clean and structured way.

## Features

- **MVC-like Architecture** – Organized code with separation of concerns.
- **Product Management** – Create, edit, and manage products.
- **Invoice (Factor) Generation** – Easily create and manage invoices.
- **Reporting** – View and analyze data through reports.
- **Authentication & Authorization** – Secure login with JWT.
- **Form File Uploads** – Handle file uploads with Busboy.
- **Password Security** – Password hashing using bcryptjs.
- **Request Validation** – Validate incoming requests with express-validator.
- **Structured Logging** – Winston-based logging for better debugging and monitoring.

## Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – HTTP server
- **express-handlebars** – View engine
- **Prisma** – ORM for database operations
- **Winston** – Logging
- **jsonwebtoken** – Authentication
- **express-validator** – Request validation
- **Busboy** – File upload handling
- **bcryptjs** – Password hashing

## Project Structure

Sample3-Nodejs-MVC

├── src/

│ ├── controllers/ # Controllers handle requests and responses

│ ├── models/ # Database models (via Prisma)

│ ├── views/ # Handlebars templates

│ ├── infrastructure/ # Data logic

│ ├── dto/ # dto models

│ ├── routes/ # Express routes

│ ├── middlewares/ # Custom middleware

│ ├── services/ # Business logic

│ ├── validators/ # dto validators

│ └── app.js # App entry point

├── prisma/ # Prisma schema and migrations

├── public/ # Static files

└── package.json


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JavadAbl/Sample3-Nodejs-MVC

Install dependencies:

    npm install

Set up your .env file:

    DATABASE_URL="file:app.db"
    ACCESS_TOKEN_SECRET=ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET=REFRESH_TOKEN_SECRET

Run database migrations:

    npx prisma migrate dev

Run Prisma Generate:

    npx prisma generate

Run database Seed:

    npx prisma db seed


Start the application:

    npm run dev

Usage

Open your browser and go to http://localhost:3000
