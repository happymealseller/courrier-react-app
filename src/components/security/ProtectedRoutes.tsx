import { Navigate, Outlet } from "react-router-dom"
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey"
import { AuthenticationUrl } from "../../utilities/enums/Url"
import { useRef } from "react";

export function ProtectedRoutes() {
    const jwt = useRef(localStorage.getItem(LocalStorageKey.Jwt));
    return ( 
        jwt.current ?
            <Outlet />
        :
            <Navigate to={AuthenticationUrl.LOGIN}/>
    )
}