import { LocalStorageData } from "../app/LocalStorageData"

export type CourierDashboardProps = {
    sendDataToApp: (data: LocalStorageData) => void
}