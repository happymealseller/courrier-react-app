import { AuthenticationAction } from "./authenticationActions"
import { LOGIN, LOGOUT } from "./authenticationTypes"

type Authenti

const initialState = {
    isLogin: false,
    jwt: "",
    username: "",
    role: ""
}

export const authenticationReducer = (state = initialState, action: AuthenticationAction) => {
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