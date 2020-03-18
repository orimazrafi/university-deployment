import axios from 'axios';
import { AdminAuth } from './../interfaces';
import { graphqlconfiguration } from '../helpers';
export const UseAdminAuth = async (user: AdminAuth, isLogin: boolean) => {
    let isAuth = false;
    let requestBody = {
        query: `
                      query {
                        loginAdmin(email: "${user.email}", password: "${user.password}") {
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
                        createAdmin(userInput: {email: "${user.email}", password: "${user.password}", name: "${user.name}"}) {
                            userId
                            email
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
            if (!data.data.loginAdmin) return console.error(data.errors[0].message)
            localStorage.setItem('credentials', JSON.stringify(data.data.loginAdmin))
        } else {
            if (!data.data.createAdmin) return console.error(data.errors[0].message)
            localStorage.setItem('credentials', JSON.stringify(data.data.createAdmin))
        }
        isAuth = true


    } catch (ex) {
        throw console.error(ex.message)
    }
    return isAuth
}
