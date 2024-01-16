import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./features/auth/authSlice";
import { courseSlice } from "./features/auth/courseSlice";
import { studentSlice } from "./features/auth/studentSlice";
import { teacherSlice } from "./features/auth/teacherSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        teacher: teacherSlice.reducer,
        student: studentSlice.reducer,
        course: courseSlice.reducer,
    }
});