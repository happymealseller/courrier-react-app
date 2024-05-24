import { Navigate, Outlet } from "react-router-dom"
import { AuthenticationUrl } from "../../utilities/enums/Url"
import { useSelector } from "react-redux";
import { RootState } from "../../App";

export function ProtectedRoutes() {
    const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)
    return ( 
        isLoggedIn ?
            <Outlet />
        :
            <Navigate to={AuthenticationUrl.LOGIN}/>
    )
}