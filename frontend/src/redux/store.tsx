
import {
    configureStore,
} from "@reduxjs/toolkit";
import userSlice from "../features/Users/UserSlice";
import proffesorSlice from "../features/Proffesors/ProffesorSlice";
import courseSlice from "../features/Courses/CourseSlice";
import thunk from "redux-thunk";
const store = configureStore({
    reducer: {
        user: userSlice,
        proffesor: proffesorSlice,
        course: courseSlice
    },
    middleware: [thunk]
})
export default store
export type AppDispatch = typeof store.dispatch