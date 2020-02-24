const bcrypt = require('bcryptjs');

const Student = require('../../models/student');
const Course = require('../../models/course');

let token;
let user;
module.exports = {
    createStudent: async ({ studentInput }) => {
        try {
            const existingStudent = await Student.findOne({ email: studentInput.email });
            if (existingStudent) return new Error('User exists already.');
            if (studentInput.password.length < 1) return new Error('Password must be at least 1 character long.')
            const hashedPassword = await bcrypt.hash(studentInput.password, 12);
            const student = new Student({
                publicId: studentInput.publicId,
                email: studentInput.email,
                password: hashedPassword,
                name: studentInput.name,
                role: "Student",
                registerCourses: []
            });
            user = await student.save();
            token = student.generateAuthToken()
        } catch (err) {
            throw err;
        }
        const student = user.generateStudentToReturn(user, token)
        return student
    },
    loginStudent: async ({ email, password }) => {
        try {
            user = await Student.findOne({ email });
            if (!user) throw new Error("student email doesn't exist");
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) throw new Error("student password doesn't exist");
            token = user.generateAuthToken()
        } catch (ex) {
            throw new Error(ex.message)
        }
        const student = user.generateStudentToReturn(user, token)
        return student
    },
    studentsList: async ({ name }) => {
        let filteredStudents = []
        try {
            const students = await Student.find();
            if (students.length === 0) {
                return new Error('There are no students yet!')
            }
            filteredStudents = students.map(p => ({ name: p.name, email: p.email }))
        } catch (ex) {
            return new Error(ex.message)
        }
        return filteredStudents
    },
    getStudent: async ({ studentId }) => {
        console.log('studentId', studentId)
        try {
            user = await Student.findById(studentId);
            if (!user) throw new Error('there is no student with that id.')
            token = user.generateAuthToken()

        } catch (ex) {
            return new Error(ex.message)
        }
        const student = user.generateStudentToReturn(user, token)

        return student
    },
    getStudents: async ({ name }) => {
        let filteredStudents = []
        try {
            const students = await Student.find();
            if (students.length === 0) {
                throw new Error('There are no students yet!')
            }
            filteredStudents = students.map(student => ({
                name: student.name,
                email: student.email,
                role: student.role,
                registerCourses:
                    student.registerCourses,
                publicId: student.publicId
            }))
        } catch (ex) {
            return new Error(ex.message)
        }
        return filteredStudents
    },

    getStudentsWithCoursesName: async ({ name }) => {
        let studentsWithCoursesName = []
        try {
            const students = await Student.find();
            if (students.length === 0) {
                throw new Error('There are no students yet!')
            }


            const courses = await Course.find()
            studentsWithCoursesName = students.map(student => ({
                name: student.name,
                email: student.email,
                role: student.role,
                publicId: student.publicId,
                registerCourses:
                    student.registerCourses.map(course => {
                        const index = courses.findIndex(c => {
                            return c._id.toString() === course
                        })
                        if (index !== -1) {
                            return { id: course, name: courses[index].name }
                        }
                    }
                    )
            }))


        } catch (ex) {
            return new Error(ex.message)
        }
        return studentsWithCoursesName
    },
    getStudentCourses: async ({ studentId }) => {
        let courses = []
        try {
            courses = await Course.find();
            if (!courses) return new Error('something went wrong.')
            let filteredCourses = courses.filter(course =>
                (course.registerStudents.indexOf(studentId) > -1))
            if (courses.length === 0) {
                return new Error('there are no courses for this student.')
            }

            courses = filteredCourses.map(course => (
                {
                    courseId: course._id,
                    name: course.name,
                    points: course.points,
                    description: course.description,
                    proffesorId: course.proffesorId,
                    registerStudents: course.registerStudents,
                    publicId: course.publicId
                }
            ))
        } catch (ex) {
            return new Error(ex.message)
        }
        return courses
    },
    registerCourseInStudent: async ({ studentId, courseId }) => {
        let newStudents = []
        try {

            await Student.findByIdAndUpdate(
                { _id: studentId },
                { $push: { registerCourses: courseId } }, { new: true }
            )
            let students = await Student.find()
            newStudents = students.map(student => ({
                studentId: student._id,
                email: student.email,
                name: student.name,
                role: student.role,
                publicId: student.publicId,
                registerCourses: student.registerCourses,
            }))

        } catch (ex) {
            return new Error(ex.message)
        }

        return newStudents
    },
    updateStudent: async ({ studentId, name, publicId }) => {
        let updatedStudent = {}
        try {
            let savedStudent = await Student.findByIdAndUpdate(
                { _id: studentId },
                {
                    $set: {
                        name,
                        publicId,
                    }
                }, { new: true }
            )
            await savedStudent.save()
            updatedStudent = {
                userId: studentId,
                name,
                email: savedStudent.email,
                role: savedStudent.role,
                registerCourses: savedStudent.registerCourses,
                publicId,
            }
        } catch (ex) {
            return new Error(ex.message)
        }

        return updatedStudent
    },
};