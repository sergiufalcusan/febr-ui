import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { teacherSlice } from "./teacherSlice";
import { API_URL } from "../constants";

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
    const response = await axios.get(API_URL + '/v1/users/students', axiosConfig)
    return response.data
})

export const createNewStudent = createAsyncThunk('student/new', async ({firstName, lastName, email, password}) => {
    const response = await axios.post(API_URL + '/v1/teacher/users/student/new', {firstName, lastName, email, password}, axiosConfig)
    return response.data
})

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        logout: (state) => {
            state.all = [];
            state.error = null;
            state.updateToggle = false;
        }
    },
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

export const { logout } = teacherSlice.actions