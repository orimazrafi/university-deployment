import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { Proffesor } from './../../interfaces';
const proffesor = createSlice({
    name: "proffesor",
    initialState: {
        proffesors:
            []


    },
    reducers: {
        credentials: (state, action) => {

        },
        getProfessors: (state, action) => {
            state.proffesors = action.payload

        }


    }
})

export const {
    credentials,
    getProfessors
} = proffesor.actions;
export default proffesor.reducer

export const reduxProfessorAuth = (user: Proffesor, isLogin: boolean
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
        query: `
                mutation {
                  createProffesor(proffesorInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                    userId
                    name
                    token
                    role
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
        if (data.errors) throw new Error(data.errors[0].message);
        isAuth = true
        console.log(data, isLogin)
        // if (isLogin) {
        //     localStorage.setItem('credentials', JSON.stringify(data.data.loginProffesor))
        // } else {
        localStorage.setItem('credentials', JSON.stringify(data.data.createProffesor))
        // }
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


