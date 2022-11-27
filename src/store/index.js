import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import inviteUserReducer from "./invites/inviteUserSlice";
import userSliceReducer from "./user/userSlice";




const store = configureStore({
    reducer: {
        auth: authReducer,
        invitesUser: inviteUserReducer,
        users: userSliceReducer
    }
})


export default store;
