import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { graphqlconfiguration } from "../../helpers";

const student = createSlice({
    name: "student",
    initialState: {
        students: [],
        student: {},
        studentCourses: []
    },
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload
        },
        setStudent: (state, action) => {
            state.student = action.payload
        },
        setStudentCourses: (state, action) => {
            state.studentCourses = action.payload
        },

    }
})

export const {

    setStudent,
    setStudents,
    setStudentCourses

} = student.actions;
export default student.reducer



export const reduxGetStudentsWithCousesName = (
) => async (dispatch: AppDispatch) => {
    let isSuccess = false;
    let requestBody = {
        query: `
                query {
                    getStudentsWithCoursesName(name: "ori mazrafi") {
                        name
                        email
                        role
                        publicId
                        registerCourses{
                            id
                            name
                        }
                }
              }
                  `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getStudentsWithCoursesName) return new Error(data.errors[0].message)
        dispatch(setStudents(data.data.getStudentsWithCoursesName))
    } catch (error) {
        return new Error(error.message)
    }
    isSuccess = true
    return isSuccess
}
export const reduxGetStudents = (
) => async (dispatch: AppDispatch) => {
    let isSuccess = false;
    let requestBody = {
        query: `
                query {
                    getStudents(name: "ori mazrafi") {
                        name
                        email
                        role
                        registerCourses
                        publicId
                }
              }
                  `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getStudents) return new Error(data.errors[0].message)
        dispatch(setStudents(data.data.getStudents))
    } catch (error) {
        return new Error(error.message)
    }
    isSuccess = true
    return isSuccess
}

export const reduxSetStudent = (studentId: string
) => async (dispatch: AppDispatch) => {
    console.log(studentId)
    let requestBody = {
        query: `
                query {
                    getStudent(studentId: "${studentId}") {
                        userId
                        name
                        email 
                        role 
                        publicId
                }
              }
                  `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getStudent) return console.error(data.errors[0].message)
        dispatch(setStudent(data.data.getStudent))
    } catch (error) {
        return console.error(error.message)

    }
}

export const reduxGetStudentCourses = (studentId: string
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
                query {
                    getStudentCourses(studentId: "${studentId}") {
                        courseId
                        name
                        points
                        description
                        proffesorId
                        registerStudents
                        publicId
                }
              }
                  `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getStudentCourses) return console.error(data.errors[0].message)
        await dispatch(setStudentCourses(data.data.getStudentCourses))
    } catch (error) {
        return console.error(error.message)
    }
}



export const reduxRegisterCourseInStudent = (studentId: string, courseId: string

) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
                mutation {
                    registerCourseInStudent( studentId: "${studentId}", courseId:  "${courseId}") {
                        studentId
                        publicId
                        name
                        role 
                        registerCourses
                    }
                  }
                `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.registerCourseInStudent) return console.error(data.errors[0].message)
        await dispatch(setStudents(data.data.registerCourseInStudent))
    } catch (error) {
        return console.error(error.message)

    }
}
export const reduxUpdateStudent = (userObj: any
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
                mutation {
                    updateStudent( studentId: "${userObj.userId}", name: "${userObj.name}",
                      publicId: "${userObj.publicId}") {
                        userId
                        name
                        role 
                        registerCourses
                        publicId
                    }
                  }
                `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );

        if (!data.data.updateStudent) return console.error(data.errors[0].message)
        await dispatch(setStudent(data.data.updateStudent))
    } catch (error) {
        return console.error(error.message)
    }
}







