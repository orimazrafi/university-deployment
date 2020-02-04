import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { Proffesor } from './../../interfaces';
const proffesor = createSlice({
    name: "proffesor",
    initialState: {
        userId: null,
        token: "",
        name: "",
        email: ""

    },
    reducers: {
        credentials: (state, action) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },


    }
})

export const {
    credentials,
} = proffesor.actions;
export default proffesor.reducer

export const reduxProfessoerAuth = (user: Proffesor, isLogin: boolean
) => async (dispatch: AppDispatch) => {
    console.log(user, isLogin, 's')
    let isAuth = false;


    let requestBody = {
        query: `
                mutation {
                  createProffesor(proffesorInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                    userId
                    name
                    token
                  }
                }
              `
    };
    // }
    try {
        let { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        if (data.errors) throw new Error(data.errors[0].message);


        // console.log('data', data['errors'])
        // if (data.data.login === null || data.data.createProffesor === null) 
        // console.log('data', data)
        isAuth = true
        // if (isLogin) {
        //     localStorage.setItem('credentials', JSON.stringify(data.data.login))
        // } else {
        //     localStorage.setItem('credentials', JSON.stringify(data.data.createUser))
        // }

    } catch (error) {
        console.error('error', error);
    }
    return isAuth
}


