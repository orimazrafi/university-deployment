import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import axios from 'axios';
import { graphqlconfiguration } from "../../helpers";

const proffesor = createSlice({
    name: "proffesor",
    initialState: {
        proffesors: [],
        proffesorCourses: [],
        proffesor: {},

    },
    reducers: {
        getProfessors: (state, action) => {
            state.proffesors = action.payload
        },
        setProfessor: (state, action) => {
            state.proffesor = action.payload
        },
        setProffesorRegisterCourses: (state, action) => {
            state.proffesorCourses = action.payload
        },


    }
})
export const {
    getProfessors,
    setProfessor,
    setProffesorRegisterCourses
} = proffesor.actions;
export default proffesor.reducer

export const reduxGetProfessors = (
) => async (dispatch: AppDispatch) => {
    let isAuth = false;
    let requestBody = {
        query: `
            query {
                proffesorsList(name: "ori mazrafi") {
                    userId
                    name
                    email
                    registerCourses
                    publicId
            }
          }
              `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.proffesorsList) throw new Error('there are no user')
        dispatch(getProfessors(data.data.proffesorsList))
    } catch (error) {
        console.error(error.message);
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
                    registerCourses
                    email
                    publicId
            }
          }
              `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getProffesor) throw new Error('there are no user')
        dispatch(setProfessor(data.data.getProffesor))
    } catch (error) {
        console.error('error', error);
    }
    return isAuth
}
export const reduxGetProfessorAndCourses = (
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
            query {
                getProffesorRegisterCourses(name: "ori mazrafi") {
                    courseId
                    name
                    proffesorId
            }
          }
              `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.getProffesorRegisterCourses) throw new Error('there are no user')
        dispatch(setProffesorRegisterCourses(data.data.getProffesorRegisterCourses))
    } catch (ex) {

        console.error(ex.message);
    }
}


export const reduxUpdateProffesor = (userObj: any

) => async (dispatch: AppDispatch) => {
    console.log(userObj.imageName)
    let isAuth = false;
    let requestBody = {
        query: `
                    mutation {
                        updateProffesor( proffesorId: "${userObj.userId}", name: "${userObj.name}",
                         image: "${userObj.imageName}", publicId: "${userObj.publicId}") {
                            userId
                            name
                            email
                            registerCourses
                            publicId
                        }
                      }
                    `
    };
    try {
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );


        await dispatch(setProfessor(data.data.updateProffesor))
    } catch (error) {
        console.error('ernjknror', error);
    }
    return isAuth
}




