import { Navigate, Outlet } from "react-router-dom"
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey"
import { AuthenticationUrl } from "../../utilities/enums/Url"

export function ProtectedRoutes() {
    const jwt: string = localStorage.getItem(LocalStorageKey.Jwt) || ""
    return ( 
        jwt ?
            <Outlet />
        :
            <Navigate to={AuthenticationUrl.LOGIN}/>
    )
}