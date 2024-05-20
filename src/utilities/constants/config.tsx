import { LocalStorageKey } from "../enums/LocalStorageKey";

export const config = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "username": localStorage.getItem(LocalStorageKey.Username) || ""
    }
}