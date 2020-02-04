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
    let requestBody = {
        query: `
              query {
                login(email: "${user.email}", password: "${user.password}") {
                  userId
                  name
                  token
                  tokenExpiration
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
                  }
                }
              `
        };
    }
    try {
        var { data } = await axios({
            method: "POST",
            url: "http://localhost:8000/graphql-university",
            data: requestBody
        });
        if (isLogin) {
            localStorage.setItem('credentials', JSON.stringify(data.data.login))
            // dispatch(credentials(data.data.login))
        } else {
            localStorage.setItem('credentials', JSON.stringify(data.data.createUser))
        }




    } catch (error) {
        console.error(error);
    }




}


