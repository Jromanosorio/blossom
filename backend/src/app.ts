import { Request, Response } from "express";
import { testConnection } from "./database/config";
import { schema } from "./graphql/schema";
import { root } from "./graphql/resolver";
import { createHandler } from "graphql-http/lib/use/express"
import { Logger } from "./middleware/logger";
import { connectRedis } from "./redis/redis";

const dotenv = require('dotenv');
dotenv.config()

const cors = require('cors')
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(Logger)

testConnection()
connectRedis()

app.all('/graphql', createHandler({
  schema: schema,
  rootValue: root,
}));

app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'pong' });
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Rick and Morty GraphQL API',
    version: '1.0.0',
    endpoints: {
      graphql: '/graphql',
      graphiql: '/graphql (GET request with browser)'
    },
    documentation: {
      queries: [
        'getAllCharacters(filters: Filters, limit: Int, offset: Int)',
        'getCharacterById(id: Int!)',
        'createComment(characterId: Int!, user: String!, comment: String!)'
      ],
      filters: [
        'name: String',
        'status: Status (Alive, Dead, unknown)',
        'species: String',
        'gender: Gender (Female, Male, Genderless, unknown)',
        'origin: String'
      ]
    },
    examples: {
      allCharacters: `query {
        getAllCharacters(limit: 10) {
          id
          name
          status
          species
          gender
        }
      }`,
      filteredCharacters: `query {
        getAllCharacters(filter: { status: Alive, species: "Human" }) {
          id
          name
          origin
        }
      }`,
      singleCharacter: `query {
        getCharacterById(id: 1) {
          name
          status
          species
          image
        }
      }`,
      createComment: `query {
        createComment(characterId: 1) {
          user
          comment
        }
      }`,
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Usage available at http://localhost:${PORT}/`);
});