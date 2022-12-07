import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivateInstance from "../../axios";



const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const sendMessage = createAsyncThunk('messenger/create', async (data, thunkApi) => {
    try {
        const {text, receiver} = data;
        const response = await axiosPrivateInstance().post('/messages', {
            text,
            receiver
        });
        
        return response.data;
        
    } catch (error) {
       
        console.log(error?.response, 'sendMessage error')
        return thunkApi.rejectWithValue(error?.response?.data?.error?.message);
    }
})

const messengerSlice = createSlice({
    name: 'messenger/create',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {

        builder.addCase(sendMessage.pending, (state, action) => {
            
            state.isLoading = true
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
       
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(sendMessage.rejected, (state, action) => {
            
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload
        })
        
    }
})

export default messengerSlice.reducer;