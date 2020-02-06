import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { Proffesor } from './../../interfaces';
const proffesor = createSlice({
    name: "proffesor",
    initialState: {
        proffesors: [],
        user: {}
    },
    reducers: {
        getProfessors: (state, action) => {
            state.proffesors = action.payload
        },
        setProfessor: (state, action) => {
            state.user = action.payload
        },

    }
})

export const {
    getProfessors,
    setProfessor
} = proffesor.actions;
export default proffesor.reducer

export const reduxProfessorAuth = (user: Proffesor, isLogin: boolean
) => async () => {
    let isAuth = false;
    let requestBody = {
        query: `
              query {
                loginProffesor(email: "${user.email}", password: "${user.password}") {
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
                createProffesor(proffesorInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
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
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        isAuth = true
        if (isLogin) {
            localStorage.setItem('credentials', JSON.stringify(data.data.loginProffesor))
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
export const reduxSetProfessor = (proffesorId: string
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
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
    try {
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        console.log(data)

        if (!data.data.getProffesor) throw new Error('there are no user')
        dispatch(setProfessor(data.data.getProffesor))
    } catch (error) {
        console.error('error', error);
    }
    return isAuth
}


