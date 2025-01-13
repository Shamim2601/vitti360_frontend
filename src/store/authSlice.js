import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from '../services/auth_service';

const initialState = {
    status : false,
    userData: null
}

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data, { rejectWithValue }) => {
        try {
            const response = await authService.updateProfile(data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
    },
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;