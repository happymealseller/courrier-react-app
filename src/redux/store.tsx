import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authenticationSlice";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer
    }
})