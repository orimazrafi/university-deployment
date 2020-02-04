const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  userId: ID!
  name: String!
  token: String!
}

type AuthData{
  userId: ID!
  name: String!
  token: String!
  tokenExpiration: Int!
}
type Proffesor{
  userId: ID!
  name: String!
  token: String!
}

input UserInput {
  email: String!
  password: String!
  name: String!
}
input ProffesorInput {
  email: String!
  password: String!
  name: String!
}
type RootQuery {
  loginUser(email:String!, password:String!): AuthData
}
type RootMutation {
    createUser(userInput: UserInput): User
    createProffesor(proffesorInput: ProffesorInput): Proffesor
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);