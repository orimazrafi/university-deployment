import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { User } from './../../interfaces';
const user = createSlice({
    name: "user",
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
} = user.actions;
export default user.reducer

export const reduxAuth = (user: User, isLogin: boolean
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
        query: `
              query {
                loginUser(email: "${user.email}", password: "${user.password}") {
                  userId
                  name
                  token
                  tokenExpiration
                  role
                }
              }
            `
    };
    if (!isLogin) {
        requestBody = {
            query: `
                mutation {
                  createUser(userInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                    userId
                    name
                    token
                    tokenExpiration
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
        if (data.errors) return new Error(data.errors[0].message)
        isAuth = true
        if (isLogin) {
            localStorage.setItem('credentials', JSON.stringify(data.data.loginUser))
        } else {
            localStorage.setItem('credentials', JSON.stringify(data.data.createUser))
        }

    } catch (error) {
        console.error(error);
    }
    return isAuth
}


