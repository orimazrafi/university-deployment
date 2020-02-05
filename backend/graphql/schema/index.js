const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
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

type Proffesor{
  userId: ID!
  name: String!
  token: String!
  role: String!
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

type Student {
  userId: ID!
  name: String!
  token: String!
  role: String!
}




input StudentInput {
  email: String!
  password: String!
  name: String!
}


type RootQuery {
  loginUser(email:String!, password:String!): User
  loginProffesor(email:String!, password:String!): Proffesor
  loginStudent(email:String!, password:String!): Student
  proffesorsList(name: String!): [Proffesors]

}
type RootMutation {
    createUser(userInput: UserInput): User
    createStudent(studentInput: StudentInput): Student
    createProffesor(proffesorInput: ProffesorInput): Proffesor
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);