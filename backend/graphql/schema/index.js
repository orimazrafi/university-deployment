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


input UserInput {
  email: String!
  password: String!
  name: String!
}
type RootQuery {
    login(email:String!, password:String!): AuthData
}
type RootMutation {
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);