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

export const getAllTeachers = createAsyncThunk('teacher/getAll', async () => {
    const response = await axios.get('http://localhost:8080/api/v1/teacher/all', axiosConfig)
    return response.data
})

export const createNewTeacher = createAsyncThunk('teacher/new', async ({firstName, lastName, email, password}) => {
    const response = await axios.post('http://localhost:8080/api/v1/admin/users/teacher/new', {firstName, lastName, email, password}, axiosConfig)

    return response.data
})

export const teacherSlice = createSlice({
    name: 'teacher',
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
            .addCase(getAllTeachers.fulfilled, (state, action) => {
                state.all = action.payload;
            })
            .addCase(getAllTeachers.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(createNewTeacher.fulfilled, (state, action) => {
                state.updateToggle = !state.updateToggle;
            })
            .addCase(createNewTeacher.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export const selectAllTeachers = state => state.teacher.all;
export const selectUpdateToggle = state => state.teacher.updateToggle;

export const { logout } = teacherSlice.actions