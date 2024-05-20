import { Navigate, Outlet } from "react-router-dom"
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey"

export function ProtectedRoutes() {
    const jwt: string = localStorage.getItem(LocalStorageKey.Jwt) || ""
    return ( 
        jwt ?
            <Outlet />
        :
            <Navigate to="/login"/>
    )
}