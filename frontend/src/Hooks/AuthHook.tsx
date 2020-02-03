import axios from "axios";
import { User } from "../interfaces";

export const AuthHook = async (user: User, login: boolean) => {
    let requestBody = {
        query: `
          query {
            login(email: "${user.email}", password: "${user.password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
    };
    if (!login) {
        requestBody = {
            query: `
            mutation {
              createUser(userInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                _id
                email
              }
            }
          `
        };
    }


    fetch('http://localhost:8000/graphql-university', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
        }
        return res.json()


    }).then(resData => {
        console.log(resData)
        // if (resData.data.login.token) {
        //     this.context.login(
        //         resData.data.login.token,
        //         resData.data.login.userId,
        //         resData.data.login.tokenExpiration)
        // }
    })
        .catch(err => {
            console.log(err)
        }
        )

}