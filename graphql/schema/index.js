const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  userId: ID!
  email: String!
  name: String!
  token: String!
  role: String!
  publicId: String
}
type Admin {
  userId: ID!
  name: String!
  token: String!
  role: String!
  email: String!
  publicId: String!
}
type Pro{
  proffesorId: String
}
input UserInput {
  email: String!
  password: String!
  name: String!
}
type Proffesor{
  userId: ID!
  name: String!
  email: String!
  token: String!
  role: String!
  registerCourses: [String]
  publicId: String!
}
input ProffesorInput {
  email: String!
  password: String!
  name: String!
}
input RegisterInput{
  courseId: ID!
  studentId: ID!
}
type Proffesors{
  userId: ID!
  name: String!
  email: String!
  registerCourses: [String]
  publicId: String!
}
type Students{
  studentId: ID!
  name: String!
  role: String!
  email: String!
  registerCourses: [String]
  image: String!
  publicId: String!
}
type Student {
  userId: ID!
  email: String!
  name: String!
  token: String!
  role: String!
  publicId: String!
  registerCourses: [String]
}
type CourseRemove{
  courseId: ID!
}
type Course {
  courseId: ID!
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
  registerStudents: [String]
  publicId: String!
}
type CourseWithChat {
  courseId: ID!
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
  registerStudents: [String]
  publicId: String!
  courseChat: [CourseChat]
}
type CourseChat{
  sender: ID!
  name:String!
  message:String!
  time:String!
  publicId:String!
}



type Registerd{
  studentId: ID!
}
type CourseId{
  _id: ID!
}
type Courses {
  courseId: ID!
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
  registerStudents: [String]
}


type StudentsWithCourseName{
    name: String!
    email: String!
    role: String!
    publicId: String!
    registerCourses: [S]
  }
  type S{
    id:ID!
    name:String!
  }


type C {
  courseId: ID!
  name: String!
  proffesorId: ID!
}
input StudentInput {
  email: String!
  password: String!
  name: String!
  publicId: String!
}
input CourseInput {
  name: String!
  points: Int!
  description: String!
  proffesorId: ID!
  publicId: String!
}
input CourseUpdateInput {
  courseId: ID!
  name: String!
  points: Int!
  description: String!
  publicId: String!
}
type RootQuery {
  loginAdmin(email:String!, password:String!): User
  loginProffesor(email:String!, password:String!): Proffesor
  loginStudent(email:String!, password:String!): Student
  proffesorsList(name: String!): [Proffesors]
  getStudentsWithCoursesName(name: String!):[StudentsWithCourseName]
  getStudents(name: String!):[Students]
  getProffesorCourses(proffesorId: ID!): [Course]
  getProffesor(proffesorId: ID!): Proffesor
  getCourses(studentId: ID!): [Course]
  getCourse(courseId: ID!): CourseWithChat
  getStudent(studentId: ID!):  Student
  getStudentCourses(studentId: ID!): [Course]
  getAdmin(adminId: ID!): Admin
  getProffesorRegisterCourses(name: String!): [C]
}
type RootMutation {
    createAdmin(userInput: UserInput): User
    createStudent(studentInput: StudentInput): Student
    createProffesor(proffesorInput: ProffesorInput): Proffesor
    createCourse(courseInput: CourseInput): CourseId
    updateCourse(courseUpdateInput: CourseUpdateInput): CourseId
    registerStudentInCourses(courseId: ID!, studentId: ID!): [Course]
    registerCourseInStudent(studentId: ID!, courseId: ID!): [Students]
    createCourseInProffesor(proffesorId: ID!, courseId: ID!):  Pro
    removeCourse(courseId: ID!, proffesorId: ID!): [Course]
    updateStudent(studentId: ID!, name: String!, publicId: String!): Student
    updateProffesor(proffesorId: ID!, name: String!, image: String!, publicId: String!): Proffesor
    updateAdmin(adminId: ID!, name: String!, publicId: String!): Admin
  }
  
schema {
    query: RootQuery
    mutation: RootMutation
}
`);