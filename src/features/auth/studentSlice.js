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

export const getAllStudents = createAsyncThunk('student/getAll', async () => {
    const response = await axios.get('http://localhost:8080/api/v1/student/all', axiosConfig)
    return response.data
})

export const createNewStudent = createAsyncThunk('student/new', async ({firstName, lastName, email, password}) => {
    const response = await axios.post('http://localhost:8080/api/v1/teacher/users/student/new', {firstName, lastName, email, password}, axiosConfig)
    return response.data
})

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.all = action.payload;
            })
            .addCase(getAllStudents.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(createNewStudent.fulfilled, (state) => {
                state.updateToggle = !state.updateToggle;
            })
            .addCase(createNewStudent.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export const selectAllStudents = state => state.student.all;
export const selectUpdateToggle = state => state.student.updateToggle;