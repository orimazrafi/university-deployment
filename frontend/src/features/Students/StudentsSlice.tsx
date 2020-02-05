import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { Student } from './../../interfaces';
const student = createSlice({
    name: "student",
    initialState: {
        students:
            []
    },
    reducers: {
        getProfessors: (state, action) => {
            state.students = action.payload
        }
    }
})

export const {
    getProfessors
} = student.actions;
export default student.reducer

export const reduxStudentAuth = (user: Student, isLogin: boolean
) => async () => {
    let isAuth = false;
    let requestBody = {
        query: `
              query {
                loginStudent(email: "${user.email}", password: "${user.password}") {
                  userId
                  name
                  token
                  role
                }
              }
            `
    };
    if (!isLogin) {
        requestBody = {
            query: `
            mutation {
                createStudent(studentInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                  userId
                  name
                  token
                  role
                }
              }
              `
        };
    }
    try {
        console.log('dd')
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        console.log(data)
        isAuth = true
        if (data.errors) return new Error(data.errors[0].message)

        if (isLogin) {
            localStorage.setItem('credentials', JSON.stringify(data.data.loginStudent))
        } else {
            localStorage.setItem('credentials', JSON.stringify(data.data.createStudent))

        }


    } catch (error) {
        console.error('error', error);
    }
    return isAuth
}

export const reduxGetProfessors = (
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
        query: `
            query {
                proffesorsList(name: "ori mazrafi") {
                    name
                    email
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
        if (!data.data.proffesorsList) throw new Error('there are no user')
        dispatch(getProfessors(data.data.proffesorsList))
    } catch (error) {
        console.error('error', error);
    }
    return isAuth
}


