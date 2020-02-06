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
type Course {
  courseId: ID!
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
}


type Courses {
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
}





input StudentInput {
  email: String!
  password: String!
  name: String!
}

input CourseInput {
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
}


type RootQuery {
  loginUser(email:String!, password:String!): User
  loginProffesor(email:String!, password:String!): Proffesor
  loginStudent(email:String!, password:String!): Student
  proffesorsList(name: String!): [Proffesors]
  getCourses(proffesorId: ID!): [Courses]
  getProffesor(proffesorId: ID!): Proffesor
}
type RootMutation {
    createUser(userInput: UserInput): User
    createStudent(studentInput: StudentInput): Student
    createProffesor(proffesorInput: ProffesorInput): Proffesor
    createCourse(courseInput: CourseInput): Course
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);