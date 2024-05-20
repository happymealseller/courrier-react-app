import { useLocation } from "react-router-dom";
import { LocalStorageData } from "../App";
import { useEffect } from "react";
import { SenderDashboard } from "../components/dashboard/SenderDashboard";

export type SenderDashboardProps = {
    sendDataToApp: (data: LocalStorageData) => void
}

export function SenderDashboardPage({sendDataToApp}: SenderDashboardProps) {
    const location = useLocation();
    const { jwt, accountType, username } = location.state || {};

    useEffect(() => {
        sendDataToApp({ jwt, accountType, username });
    }, []);

    return (<>
        {/* <p>🚧 sender dashboard: building in progress 🚧</p> */}
        <SenderDashboard sendDataToApp={sendDataToApp}></SenderDashboard>
    </>)
}