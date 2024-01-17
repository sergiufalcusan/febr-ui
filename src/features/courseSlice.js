import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { teacherSlice } from "./teacherSlice";
import { API_URL } from "../constants";

const initialState = {
    all: [],
    error: null,
    updateToggle: false,
    selected: {
        updateToggle: false,
        course: null,
        students: [],
    }
};

const axiosConfig = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

export const getAllCourses = createAsyncThunk('course/getAll', async ({role}) => {
    if (role === 'ROLE_TEACHER') {
        const response = await axios.get(API_URL + '/v1/teacher/course/all', axiosConfig)
        return response.data
    } else {
        const response = await axios.get(API_URL + '/v1/student/course/all', axiosConfig)
        return response.data
    }
})

export const createNewCourse = createAsyncThunk('teacher/new', async ({name, description, schedule}) => {
    const response = await axios.post(API_URL + '/v1/teacher/course/create', {name, description, schedule}, axiosConfig)
    return response.data
})

export const getCourseById = createAsyncThunk('course/getById', async ({id}) => {
    const response = await axios.get(`${API_URL}/v1/teacher/course/${id}`, axiosConfig)
    return response.data
});

export const getEnrolledStudents = createAsyncThunk('course/getEnrolledStudents', async ({id}) => {
    const response = await axios.get(`${API_URL}/v1/teacher/course/${id}/students`, axiosConfig)
    return response.data
});

export const enrollStudentRequest = createAsyncThunk('teacher/enroll', async ({courseId, studentId}) => {
    const response = await axios.post(API_URL + '/v1/teacher/course/enroll', {studentId, courseId}, axiosConfig)
    return response.data
})

export const unenrollStudentRequest = createAsyncThunk('teacher/unenroll', async ({courseId, studentId}) => {
    const response = await axios.post(API_URL + '/v1/teacher/course/unenroll', {studentId, courseId}, axiosConfig)
    return response.data
});

export const removeCourseRequest = createAsyncThunk('teacher/removeCourse', async ({id}) => {
    const response = await axios.delete(`${API_URL}/v1/teacher/course/${id}`, axiosConfig)
    return response.data
});

export const updateCourseRequest = createAsyncThunk('teacher/updateCourse', async ({id, name, description, schedule}) => {
    const response = await axios.put(`${API_URL}/v1/teacher/course/${id}`, {name, description, schedule}, axiosConfig)
    return response.data
});

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        logout: (state) => {
            state.all = [];
            state.error = null;
            state.updateToggle = false;
            state.selected = {
                updateToggle: false,
                course: null,
                students: [],
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.all = action.payload;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(createNewCourse.fulfilled, (state, action) => {
                state.updateToggle = !state.updateToggle;
            })
            .addCase(createNewCourse.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(getCourseById.fulfilled, (state, action) => {
                state.selected.course = action.payload;
            })
            .addCase(getCourseById.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(getEnrolledStudents.fulfilled, (state, action) => {
                state.selected.students = action.payload;
            })
            .addCase(getEnrolledStudents.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(enrollStudentRequest.fulfilled, (state, action) => {
                state.updateToggle = !state.updateToggle;
            })
            .addCase(enrollStudentRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(unenrollStudentRequest.fulfilled, (state, action) => {
                state.selected.updateToggle = !state.selected.updateToggle;
            })
            .addCase(unenrollStudentRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export const selectAllCourses = state => state.course.all;
export const selectUpdateToggle = state => state.teacher.updateToggle;
export const selectSelectedCourse = state => state.course.selected;

export const { logout } = teacherSlice.actions