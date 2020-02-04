
import {
    configureStore,
} from "@reduxjs/toolkit";
import userSlice from "../features/Users/UserSlice";
import thunk from "redux-thunk";
const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: [thunk]
})
export default store
export type AppDispatch = typeof store.dispatch