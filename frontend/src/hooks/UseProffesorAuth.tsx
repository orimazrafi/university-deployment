import axios from 'axios';
import { ProffesorAuth } from "../interfaces";
import { admin, proffesor, graphqlconfiguration } from "../helpers";
export const UseProffesorAuth = async (user: ProffesorAuth, isLogin: boolean, currentlyUser = admin) => {
    let isAuth = false;
    let requestBody = {
        query: `
                      query {
                        loginProffesor(email: "${user.email}", password: "${user.password}") {
                          userId
                          name
                          token
                          role
                          publicId
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
                          publicId
                        }
                      }
                      `
        };
    }
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );

        if (isLogin) {
            if (!data.data.loginProffesor) throw new Error(data.errors[0].message)
            if (currentlyUser === proffesor) {
                localStorage.setItem('credentials', JSON.stringify(data.data.loginProffesor))
            } else {
                await data.data.loginProffesor
            }
        } else {
            if (!data.data.createProffesor) throw new Error(data.errors[0].message)
            if (currentlyUser === proffesor) {
                localStorage.setItem('credentials', JSON.stringify(data.data.createProffesor))
            }
        }
        isAuth = true


    } catch (error) {
        throw new Error(error.message)
    }
    return isAuth
}
