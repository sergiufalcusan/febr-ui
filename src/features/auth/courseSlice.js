import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    all: [],
    error: null,
    updateToggle: false
};

const axiosConfig = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

export const getAllCourses = createAsyncThunk('course/getAll', async () => {
    const response = await axios.get('http://localhost:8080/api/v1/course/all', axiosConfig)
    return response.data
})

export const createNewCourse = createAsyncThunk('teacher/new', async ({name, description, schedule}) => {
    const response = await axios.post('http://localhost:8080/api/v1/teacher/course/create', {name, description, schedule}, axiosConfig)

    return response.data
})

export const enrollStudentRequest = createAsyncThunk('teacher/enroll', async ({courseId, studentId}) => {
    const response = await axios.post('http://localhost:8080/api/v1/teacher/course/enroll', {studentId, courseId}, axiosConfig)

    return response.data
})

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
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
    }
})

export const selectAllCourses = state => state.course.all;
export const selectUpdateToggle = state => state.teacher.updateToggle;