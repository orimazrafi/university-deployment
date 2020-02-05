const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config')
const Student = require('../../models/student');

module.exports = {
    createStudent: async args => {
        try {
            console.log(args)
            const existingStudent = await Student.findOne({ email: args.studentInput.email });
            if (existingStudent) {
                return new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.studentInput.password, 12);
            const student = new Student({
                email: args.studentInput.email,
                password: hashedPassword,
                name: args.studentInput.name,
                role: "student"
            });
            const result = await student.save();
            const token = jwt.sign(
                { email: args.studentInput.email },
                config.get('jwtPrivateKey'),
                { expiresIn: '1h' })
            return { userId: result.id, name: result.name, token, role: result.role };
        } catch (err) {
            throw err;
        }
    },
    loginStudent: async ({ email, password }) => {
        console.log('we are here!', email, password)
        const student = await Student.findOne({ email });
        console.log(student)
        if (!student) throw new Error("student email doesn't exist");
        const isEqual = await bcrypt.compare(password, student.password);
        if (!isEqual) throw new Error("student password doesn't exist");
        const token = jwt.sign(
            { email: student.email },
            config.get('jwtPrivateKey'),
            { expiresIn: '1h' })
        return { userId: student.id, token, name: student.name, role: student.role }
    },
    studentsList: async ({ name }) => {
        let filteredStudents = []
        try {

            const students = await Student.find();
            if (students.length === 0) {

                throw new Error('There are no students yet!')
            }
            filteredStudents = students.map(p => ({ name: p.name, email: p.email }))
        } catch (ex) {
            console.log(ex.message)
        }
        return filteredStudents
    }
};