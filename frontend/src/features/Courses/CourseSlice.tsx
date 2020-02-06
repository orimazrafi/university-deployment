import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Course } from './../../interfaces';
import { AppDispatch } from "../../redux/store";
const course = createSlice({
    name: "course",
    initialState: {
        courses: []
    },
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload
        }
    }
})

export const {
    setCourses
} = course.actions;
export default course.reducer

export const reduxCreateCourse = (course: Course
) => async () => {
    course.points = Number(course.points)
    try {

        let requestBody = {
            query: `
            mutation {
                createCourse(courseInput: {name: "${course.name}", points: ${course.points}, description: "${course.description}", proffesorId: "${course.proffesorId}"}) {
                 courseId
                  name
                  points
                  description
                  proffesorId
                }
              }
            `
        };
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        console.log(data)

    } catch (error) {
        console.error('esarror', error);
    }
    // return isAuth
}

export const reduxGetCourses = (proffesorId: string
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
        query: `
            query {
                getCourses(proffesorId: "${proffesorId}") {
                    name
                    points 
                    description 
                    proffesorId 
            }
          }
              `
    };
    try {
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });

        await dispatch(setCourses(data.data.getCourses))
        requestBody = {
            query: `
                query {
                    getProffesor(proffesorId: "${proffesorId}") {
                        userId
                        name
                        token
                        role
                     
                }
              }
                  `
        };



    } catch (error) {
        console.error('ernjknror', error);
    }
    return isAuth
}


