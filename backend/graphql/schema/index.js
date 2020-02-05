const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  userId: ID!
  name: String!
  token: String!
  role: String!
}

type AuthData{
  userId: ID!
  name: String!
  token: String!
  tokenExpiration: Int!
  role: String!
}



type Proffesor{
  userId: ID!
  name: String!
  token: String!
  role: String!
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
type Proffesors{
  name: String!
  email: String!
}




type RootQuery {
  loginUser(email:String!, password:String!): AuthData
  proffesorsList(name: String!): [Proffesors]

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