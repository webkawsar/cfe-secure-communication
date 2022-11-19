import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const inviteUser = createAsyncThunk('auth/invite', async (data, thunkApi) => {
    try {
        
        const response = await axios.post('/invites', {
            data
        });
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
       
        console.log(error?.response, 'inviteUser error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})

export const getInvitesUser = createAsyncThunk('invite/getAll', async (data, thunkApi) => {
    try {

        const response = await axios.get('/invites');
        const responseData = response.data;
        return responseData;
        
    } catch (error) {
       
        console.log(error?.response, 'getInviteUser error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})

const inviteUserSlice = createSlice({
    name: 'getInvitesUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getInvitesUser.pending, (state, action) => {

            state.isLoading = true
        })
        .addCase(getInvitesUser.fulfilled, (state, action) => {
            
            const {data} = action.payload;
            state.users = data
            state.isError = false
            state.isSuccess = true
            state.isLoading = false

        })
        .addCase(getInvitesUser.rejected, (state, action) => {

            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
        .addCase(inviteUser.pending, (state, action) => {
            
            state.isLoading = true
        })
        .addCase(inviteUser.fulfilled, (state, action) => {
            
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.message = 'The user has been email sent successfully '
        })
        .addCase(inviteUser.rejected, (state, action) => {
            
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
       
    }
})


export default inviteUserSlice.reducer;