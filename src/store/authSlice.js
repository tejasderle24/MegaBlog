import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const initialState = {
    status: false,
    userData: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        Login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        Logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }

});

export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;