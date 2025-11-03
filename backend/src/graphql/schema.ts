import { buildSchema } from "graphql";

// GraphQL Schema to get data from Rick & Morty API

const schema = buildSchema(
    `
        enum Status {
            Alive
            Dead
            unknown
        }

        enum Gender {
            Male
            Female
            Genderless
            unknown
        }

        type Comment {
            user: String!
            comment: String!
        }

        type Character {
            id: Int!
            name: String!
            status: String!
            species: String!
            gender: Gender!
            origin: String!
            image: String!
            isFavorite: Boolean
            comments: [Comment]
        }    

        input Filters {
            name: String
            status: String
            species: String
            gender: Gender
            origin: String
            sort: String
        }

        type Query {
            getAllCharacters(filters: Filters, limit: Int, offset: Int): [Character!]!
            getFavorites(filters: Filters, limit: Int, offset: Int): [Character!]!
            getCharacterById(id: Int!): Character
            handleFavorite(id: Int!): Character
            createComment(characterId: Int!, user: String, comment: String): Comment
        }
    `
)

export {
    schema
}