# 📚 Book Review API

A simple Book Review service built with **NestJS**, **TypeORM**, **MySQL**, and **Redis**.  
This project supports book creation, review management, caching via Redis, and includes Swagger API docs and basic testing.

---

## 🚀 Features

- 📘 Add and list books
- ✍️ Add and fetch reviews by book
- 🧠 Redis caching with fallback
- 🛠 TypeORM migrations
- 🧪 Unit and integration tests
- 📜 Swagger/OpenAPI documentation

---

## 📦 Tech Stack

| Layer           | Technology                |
|----------------|----------------------------|
| Backend         | [NestJS](https://nestjs.com) (TypeScript) |
| ORM             | [TypeORM](https://typeorm.io) |
| Database        | MySQL                     |
| Cache           | Redis via `cache-manager` |
| Testing         | Jest + Supertest          |
| API Docs        | Swagger (OpenAPI)         |

---

## ⚙️ Prerequisites

- Node.js 18+
- MySQL (running)
- Redis (running)
- `npm` or `yarn` installed globally

---

## 📁 Project Structure

```
📁 book-review/
├── 📂 src/
│   ├── 📂 books/
│   │   ├── 📂 dto/
│   │   │   └── create-book.dto.ts
│   │   ├── 📂 entities/
│   │   │   └── book.entity.ts
│   │   ├── books.controller.ts
│   │   ├── books.module.ts
│   │   └── books.service.ts
│   │
│   ├── 📂 reviews/
│   │   ├── 📂 dto/
│   │   │   └── create-review.dto.ts
│   │   ├── 📂 entities/
│   │   │   └── review.entity.ts
│   │   ├── reviews.controller.ts
│   │   ├── reviews.module.ts
│   │   └── reviews.service.ts
│   │
│   ├── 📂 migrations/
│   │   └── <timestamp>-Init.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── data-source.ts
│
├── 📂 test/                  # Unit and integration test files
│   └── ...

├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
├── README.md
```


🛠 How to Run the Project
1. Install Dependencies
npm install

2. Run Redis & MySQL
Ensure Redis and MySQL are running locally:

Redis on localhost:6379

MySQL on localhost:3306 with DB book_review

3. Run Migrations
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts

4. Start the Server
npm run start:dev

App will be live at: http://localhost:3000
Swagger docs: http://localhost:3000/api
