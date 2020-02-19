
import {
    configureStore,
} from "@reduxjs/toolkit";
import adminSlice from "../features/Admin/AdminSlice";
import proffesorSlice from "../features/Proffesors/ProffesorSlice";
import courseSlice from "../features/Courses/CourseSlice";
import studentSlice from "../features/Students/StudentsSlice";
import thunk from "redux-thunk";
const store = configureStore({
    reducer: {
        admin: adminSlice,
        proffesor: proffesorSlice,
        student: studentSlice,
        course: courseSlice
    },
    middleware: [thunk]
})
export default store
export type AppDispatch = typeof store.dispatch