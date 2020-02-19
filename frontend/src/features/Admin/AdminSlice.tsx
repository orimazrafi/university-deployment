import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { AppDispatch } from "../../redux/store";
import { UserObjectImage } from "../../interfaces";
import { graphqlconfiguration } from "../../helpers";

const admin = createSlice({
    name: "admin",
    initialState: {
        admin: {
            userId: "",
            name: "",
            role: "",
            email: "",
            publicId: ""
        }
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;

        },
        updateAdmin: (state, action) => {
            state.admin = action.payload;
        },
    }
})

export const {
    setAdmin
} = admin.actions;
export default admin.reducer


export const reduxSetAdmin = (adminId: string
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
                query {
                    getAdmin(adminId: "${adminId}") {
                        userId
                        name
                        token 
                        role 
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
        if (!data.data.getAdmin) throw new Error(data.errors[0].message)
        dispatch(setAdmin(data.data.getAdmin))
    } catch (ex) {
        console.error(ex.message);
    }
}
export const reduxUpdateAdmin = (userObj: UserObjectImage
) => async (dispatch: AppDispatch) => {
    let requestBody = {
        query: `
                    mutation {
                        updateAdmin( adminId: "${userObj.userId}", name: "${userObj.name}",
                          publicId: "${userObj.publicId}") {
                            userId
                            name
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
        if (!data.data.updateAdmin) return console.error(data.errors[0].message)
        await dispatch(setAdmin(data.data.updateAdmin))
    } catch (ex) {
        return console.error(ex.message)
    }
}




