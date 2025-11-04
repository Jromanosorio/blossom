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
  2. FRONTEND `http://localhost:{PORT}` PORT by default = 5173

---

## Rutas de la API

#### Available filters (optionals)

```
name: String,
status: Status (Alive, Dead, Unknown)'
species: String,
gender: Gender (Female, Male, Genderless, Unknown),
sort: (ASC, DESC), 
```

#### **POST** `/graphql`

Get all characters data

**Body requerido (JSON):**

```json
{
  "query": "query($filter: Filters){ getAllCharacters(filters: $filter) { id name status species gender origin image isFavorite } }",
  "variables": {
    "filter": { "status": "Alive", "species": "Human" }
  }
}
```

#### **POST** `/graphql`

Get favorite characters data

**Body requerido (JSON):**

```json
{
  "query": "query($filter: Filters){ getFavorites(filters: $filter) { id name status species gender origin image isFavorite } }",
  "variables": {
    "filter": { }
  }
}
```

#### **POST** `/graphql`

Get character by ID

**Body requerido (JSON):**

```json
{
  "query": "query($id: Int!){ getCharacterById(id: $id) { id name status species gender origin image isFavorite comments { user comment } } }",
  "variables": {
    "id": 1
  }
}
```

#### **POST** `/graphql`

Send comment by characterID

**Body requerido (JSON):**

```json
{
  "query": "query($characterId: Int!, $user: String!, $comment: String!) {createComment(characterId: $characterId, user: $user, comment: $comment) { user comment } }",
  "variables": {
    "characterId": 1,
    "user": "username",
    "comment": "this is a comment"
  }
}
```


#### **POST** `/graphql`

Handle character favorite by characterID

**Body requerido (JSON):**

```json
{
  "query": "query($id: Int!) { handleFavorite(id: $id) { id name status species gender origin image isFavorite } }",
  "variables": {
    "id": 1,
  }
}
```
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
