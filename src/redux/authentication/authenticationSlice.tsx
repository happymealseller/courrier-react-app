import { createSlice } from "@reduxjs/toolkit"
import { AuthenticationAction } from "./AuthenticationAction"

export type AuthenticationState = {
    isLoggedIn: boolean,
    jwt: string,
    username: string,
    role: string
}
const initialToken = localStorage.getItem('jwtToken') || ''
const initialUsername = localStorage.getItem('username') || ''
const initialRole = localStorage.getItem('role') || ''
const initialIsLoggedIn = initialToken && initialUsername && initialRole ? true : false

const initialState: AuthenticationState = {
    isLoggedIn: initialIsLoggedIn,
    jwt: initialToken,
    username: initialUsername,
    role: initialRole,
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
            localStorage.setItem('jwtToken', jwt);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
        },
        logout: (state: AuthenticationState) => {
            state.isLoggedIn = false
            state.jwt = "";
            state.username = "";
            state.role = "";
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
        }
    }
})



export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;