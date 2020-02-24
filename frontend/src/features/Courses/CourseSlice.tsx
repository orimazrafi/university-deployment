import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { AppDispatch } from "../../redux/store";
import { graphqlconfiguration } from "../../helpers";
const course = createSlice({
    name: "course",
    initialState: {
        proffesorCourses: [],
        courses: [],
        course: {},
        loading: false
    },
    reducers: {
        setProffesorCourses: (state, action) => {
            state.proffesorCourses = action.payload
        },
        setCourses: (state, action) => {
            state.courses = action.payload
        },
        setCourse: (state, action) => {
            state.course = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {
    setProffesorCourses,
    setCourses,
    setCourse,
    setLoading
} = course.actions;
export default course.reducer



export const reduxGetProffesorCourses = (proffesorId: string
) => async (dispatch: AppDispatch) => {

    let requestBody = {
        query: `
            query {
                getProffesorCourses(proffesorId: "${proffesorId}") {
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
        await dispatch(setProffesorCourses(data.data.getProffesorCourses))

    } catch (ex) {
        console.error(ex.message);
    }
}
export const reduxGetCourse = (courseId: string
) => async (dispatch: AppDispatch) => {
    // console.log("courseId", courseId)
    let course;
    let requestBody = {
        query: `
            query {
                getCourse(courseId: "${courseId}") {
                    name
                    points 
                    courseId
                    description 
                    publicId
                    proffesorId 
                    registerStudents
                    courseChat {
                        sender
                        name
                        message
                        time
                        publicId
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
        // console.log(data)
        if (!data.data.getCourse) return console.error(data.errors[0].message)
        course = await data.data.getCourse
        await dispatch(setCourse(data.data.getCourse))

    } catch (ex) {
        console.error(ex.message);
    }
    return course
}
export const reduxGetCourses = (studentId: string
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
            query {
                getCourses(studentId: "${studentId}") {
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
        if (!data.data.getCourses) return console.error(data.errors[0].message)
        await dispatch(setCourses(data.data.getCourses))

    } catch (ex) {
        console.error(ex.message);
    }
}
export const reduxRegisterStudentInCourse = (courseId: string, studentId: string
) => async (dispatch: AppDispatch) => {
    await dispatch(setLoading(true))

    let requestBody = {
        query: `
            mutation {
                registerStudentInCourses(courseId:  "${courseId}", studentId: "${studentId}") {
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
        if (!data.data.registerStudentInCourses) return console.error(data.errors[0].message)

        await dispatch(setCourses(data.data.registerStudentInCourses))
        setTimeout(async () => {
            await dispatch(setLoading(false))
        }, 2000)

    } catch (ex) {
        return console.error(ex.message);
    }
}
export const reduxRemoveCourse = (courseId: string,
    proffesorId: string
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
            mutation {
                removeCourse(courseId:  "${courseId}", proffesorId: "${proffesorId}") {
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
        if (!data.data.removeCourse) return console.error(data.errors[0].message)
        await dispatch(setProffesorCourses(data.data.removeCourse))

    } catch (ex) {
        console.error(ex.message);
    }
}


