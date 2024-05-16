import { createSlice } from '@reduxjs/toolkit';

export type State = {
    jwt: string,
    role: string
}

const initialState: State = { 
    jwt: "",
    role: ""
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        storeJwt: state => {
            state.jwt = localStorage.getItem("jwt") as string;
        },
        removeJwt: state => {
            state.jwt = "";
        },
        storeRole: state => {
            state.role = localStorage.getItem("role") as string;
        },
        removeRole: state => {
            state.role = "";
        }
    }
});

export const { storeJwt, removeJwt, storeRole, removeRole } = authenticationSlice.actions;
export default authenticationSlice.reducer;
