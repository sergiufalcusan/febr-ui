import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoggedIn: false,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    role: 'ROLE_ANONYMOUS',
    error: null,
};

const getCurrentUser = async (token) => {
    return await axios.get('http://localhost:8080/api/auth/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

const token = localStorage.getItem("token");
if (!!token) {
    initialState.isLoggedIn = true

    const res = await getCurrentUser(token);
    if (res.status === 200) {
        initialState.id = res.data.id;
        initialState.email = res.data.email;
        initialState.firstName = res.data.firstName;
        initialState.lastName = res.data.lastName;
        initialState.role = res.data.role;
    }

}

export const loginRequest = createAsyncThunk('auth/login', async ({username, password}) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', {username, password})
    return response.data
})

export const currentUserRequest = createAsyncThunk('auth/me', async({token}) => {
    const response = await getCurrentUser(token);
    return response.data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginRequest.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token)
                state.isLoggedIn = true;
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(currentUserRequest.fulfilled,  (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.role = action.payload.role;
            })
            .addCase(currentUserRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectFirstName = state => state.auth.firstName;
export const selectRole = state => state.auth.role;