import axios from 'axios';
import { StudentAuth } from "../interfaces";
import { graphqlconfiguration } from '../helpers';
export const UseStudentAuth = async (user: StudentAuth, isLogin: boolean, image: any) => {
    let isAuth = false;
    let requestBody = {
        query: `
                  query {
                    loginStudent(email: "${user.email}", password: "${user.password}") {
                      email
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
                    createStudent(studentInput: 
                        {email: "${user.email}", 
                        password: "${user.password}", 
                        name: "${user.name}" , 
                        publicId: "${image.publicId}"}) {
    
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
            if (!data.data.loginStudent) throw new Error(data.errors[0].message)
            localStorage.setItem('credentials', JSON.stringify(data.data.loginStudent))

        } else {
            if (!data.data.createStudent) throw new Error(data.errors[0].message)
            localStorage.setItem('credentials', JSON.stringify(data.data.createStudent))

        }

        isAuth = true

    } catch (error) {
        throw new Error(error.message)
    }
    return isAuth
}