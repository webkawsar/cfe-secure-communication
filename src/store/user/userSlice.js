import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivateInstance from "../../axios";



const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    users: [],
}

export const registeredUser = createAsyncThunk('auth/users', async (data, thunkApi) => {
    try {
        
        const response = await axiosPrivateInstance().get('/users');
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
       
        console.log(error?.response, 'registeredUser error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})



const userSlice = createSlice({
    name: 'auth/users',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {

        builder.addCase(registeredUser.pending, (state, action) => {
            
            state.isLoading = true
        })
        .addCase(registeredUser.fulfilled, (state, action) => {

           state.users = action.payload;            
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message = 'Registered Users!'
        })
        .addCase(registeredUser.rejected, (state, action) => {
            
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
            state.users = []
        })
        
       
    }
})

export default userSlice.reducer;