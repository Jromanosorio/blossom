# FullStack Application - Rick & Morty API - BLOSSOM

## Installation and Configuration

### 1. Clone repository

```bash
git clone https://github.com/Jromanosorio/blossom
cd blossom
```
You will find 2 folders inside blossom (backend and frontend)

### 2. Install dependencies

Inside blossom folder

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 3. .env FILE

 -  **3.1** Change `.env.example` file name inside backend folder to `.env`.  
 -  **3.2** Replace .env variables value for your own keys

### 4. Database config

Inside backend folder run next commands

```bash
npm run migrate
npm run seed
```
This will create database tables and create some data in Characters table

### 5. Running project locally

Inside backend folder

```bash
npm run dev
```

Inside frontend folder

```bash
npm run dev
```

#### Now can access to project 
  1. API `http://localhost:{PORT}` PORT by default = 3000
  2. MAKE GRAPHQL POST API CALLS `http://localhost:{PORT}/graphql` PORT by default = 3000
  3. FRONTEND `http://localhost:{PORT}` PORT by default = 5173

---

## ⚙️ Tools

### Backend

* Node.js
* Express
* TypeScript
* Graphql
* Sequelize (MySQL)
* Redis (upstash/redis)
* Rick & Morty public API
* nodemon (development)

### Frontend

* React
* TypeScript
* Vite
* react-icons
* react-spinners
* TailwindCSS
* Axios
  
---

## Notes

* `.env` file **IS NOT upload to repository** `.env.example` file replace it.
* Remember install dependencies inside each folder (backend and frontend)
* Currently working docs using Swagger
---

## ✨ Autor

**Javier Roman Osorio**
📧 [[jandres.roman.08@gmail.com](mailto:jandres.roman.08@gmail.com)]
