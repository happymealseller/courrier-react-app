import { createSlice } from "@reduxjs/toolkit"
import { AuthenticationAction } from "./AuthenticationAction"

export type AuthenticationState = {
    isLoggedIn: boolean,
    jwt: string,
    username: string,
    role: string
}

const initialState: AuthenticationState = {
    isLoggedIn: false,
    jwt: "",
    username: "",
    role: ""
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        login: (state: AuthenticationState, action: AuthenticationAction) => { 
            const { jwt, username, role } = action.payload;
            state.isLoggedIn = true
            state.jwt = jwt;
            state.username = username;
            state.role = role;

        },
        logout: (state: AuthenticationState) => {
            state.isLoggedIn = false
            state.jwt = "";
            state.username = "";
            state.role = "";
        }
    }
})

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;