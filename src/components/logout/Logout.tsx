import { useEffect, useRef } from "react";
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey";
import { ParcelBoxIcon } from "../icons/ParcelBoxIcon";
import { LocalStorageData } from "../../App";
import { AccountType } from "../../utilities/enums/AccountType";

type LogoutProps = {
    sendDataToApp: (isCourier: boolean, data: LocalStorageData) => void
}

export function Logout({ sendDataToApp }: LogoutProps) {
    const username = useRef(localStorage.getItem(LocalStorageKey.Username));

    useEffect(() => {
        sendDataToApp(
            localStorage.getItem(LocalStorageKey.AccountType) === AccountType.Courier,
            {
                jwt: "",
                accountType: "",
                username: ""
            }
        )
        localStorage.clear()
    }, [])
    return (
        <div className="flex flex-col justify-center items-center">
            <br />
            <ParcelBoxIcon />
            <br />
            <h3 className="text-2xl font-medium text-slate-500">You have successfully logged out, {username.current}</h3>
        </div>
    )
}