import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const user = JSON.parse(localStorage.getItem('user')) || null;
const token = localStorage.getItem('token') || '';
const initialState = {
    user,
    token,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const authLogin = createAsyncThunk('auth/login', async (data, thunkApi) => {
    try {

        const response = await axios.post('/auth/local', {
            identifier: data.email,
            password: data.password,
        });
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
       
        console.log(error?.response?.data?.error, 'authLogin error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})

export const authRegister = createAsyncThunk('auth/register', async (data, thunkApi) => {
    try {

        const response = await axios.post('/auth/local/register', {
            username: uuidv4(),
            email: data.email,
            password: data.password,
            token: data.token
        });
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
       
        console.log(error?.response?.data?.error, 'registerUser error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})


const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(authLogin.pending, (state, action) => {

            state.isLoading = true
        })
        .addCase(authLogin.fulfilled, (state, action) => {
            
            const {jwt, user} = action.payload;
            state.user = user
            state.token = jwt
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message = 'Login successful!'

        })
        .addCase(authLogin.rejected, (state, action) => {

            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(authRegister.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(authRegister.fulfilled, (state, action) => {

            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message = 'Registration successful!'
        })
        .addCase(authRegister.rejected, (state, action) => {
            
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
        
    }
})


export default authSlice.reducer;