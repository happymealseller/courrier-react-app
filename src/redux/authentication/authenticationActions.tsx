import { LOGIN, LOGOUT } from "./authenticationTypes"

export type AuthenticationAction = { 
    type: string, 
    jwt: string,
    username: string,
    role: string
}

export const login = (jwt: string, username: string, role: string): AuthenticationAction => {
    return {
        type: LOGIN,
        jwt: jwt,
        username: username,
        role: role
    }
}

export const logout = (jwt: string = "", username: string = "", role: string = ""): AuthenticationAction => {
    return {
        type: LOGOUT,
        jwt: jwt,
        username: username,
        role: role
    }
}