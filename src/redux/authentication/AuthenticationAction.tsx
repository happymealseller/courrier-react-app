export type AuthenticationActionPayload = {
    jwt: string,
    username: string,
    role: string
}

export type AuthenticationAction = { 
    type: string, 
    payload: AuthenticationActionPayload
}
