import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import inviteUserReducer from "./invites/inviteUserSlice";
import messengerSliceReducer from "./messenger/messengerSlice";
import userSliceReducer from "./user/userSlice";




const store = configureStore({
    reducer: {
        auth: authReducer,
        invitesUser: inviteUserReducer,
        users: userSliceReducer,
        messenger: messengerSliceReducer
    }
})


export default store;
