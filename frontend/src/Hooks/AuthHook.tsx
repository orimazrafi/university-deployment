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
              createUser(userInput: {email: "${user.email}", password: "${user.password}"}) {
                _id
                email
              }
            }
          `
        };
    }
    const res: any = await axios.post('http://localhost:8000/graphql', requestBody);

    return { res }
}