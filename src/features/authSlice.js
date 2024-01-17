import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { API_URL } from "../constants";

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
    return await axios.get(API_URL + '/auth/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export const loginRequest = createAsyncThunk('auth/login', async ({username, password}) => {
    const response = await axios.post(API_URL + '/auth/login', {username, password})
    return response.data
})

export const currentUserRequest = createAsyncThunk('auth/me', async({token}) => {
    const response = await getCurrentUser(token);
    if (response.status !== 200) {
        throw new Error("Error getting current user");
    }
    return response.data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            state.id = null;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.role = 'ROLE_ANONYMOUS';
        }
    },
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
                state.isLoggedIn = false;
                state.id = null;
                state.email = null;
                state.firstName = null;
                state.lastName = null;
                state.role = 'ROLE_ANONYMOUS';
            })
    }
})

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectFirstName = state => state.auth.firstName;
export const selectRole = state => state.auth.role;

export const { logout } = authSlice.actions;