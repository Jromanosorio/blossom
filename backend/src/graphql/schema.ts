import { buildSchema } from "graphql";

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

        type Character {
            id: Int!
            name: String!
            status: String!
            species: String!
            type: String
            gender: Gender!
            origin: String!
            image: String!
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
            getCharacterById(id: Int!): Character
        }
    `
)

export {
    schema
}