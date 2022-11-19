import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import inviteUserReducer from "./data/inviteUserSlice";




const store = configureStore({
    reducer: {
        auth: authReducer,
        invitesUser: inviteUserReducer
    }
})


export default store;
