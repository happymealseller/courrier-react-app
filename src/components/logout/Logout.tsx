import { ParcelBoxIcon } from "../icons/ParcelBoxIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authentication/authenticationSlice";
import { RootState } from "../../App";
import { useEffect } from "react";

export function Logout() {
    const username = useSelector((state: RootState) => state.authentication.username);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <br />
            <ParcelBoxIcon />
            <br />
            <h3 className="text-2xl font-medium text-slate-500">You have successfully logged out, {username}</h3>
        </div>
    )
}