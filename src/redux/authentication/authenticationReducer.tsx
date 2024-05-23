import { AuthenticationAction } from "./authenticationActions"
import { LOGIN, LOGOUT } from "./authenticationTypes"

type AuthenticationState = {
    isLogin: boolean,
    jwt: string,
    username: string,
    role: string
}

const initialState = {
    isLogin: false,
    jwt: "",
    username: "",
    role: ""
}

export const authenticationReducer = (state: AuthenticationState = initialState, action: AuthenticationAction) => {
    switch (action.type) {
        case LOGIN:
            return {
                isLogin: true,
            }
            
        case LOGOUT:
            return {
                isLogin: false,
                jwt: ""
            }
            
        default:
            return state
    }
}