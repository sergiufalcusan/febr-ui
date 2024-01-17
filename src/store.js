import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./features/authSlice";
import { courseSlice } from "./features/courseSlice";
import { studentSlice } from "./features/studentSlice";
import { teacherSlice } from "./features/teacherSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        teacher: teacherSlice.reducer,
        student: studentSlice.reducer,
        course: courseSlice.reducer,
    }
});