
import { LocalStorageData } from "../app/LocalStorageData";

export type LogoutProps = {
    sendDataToApp: (isCourier: boolean, data: LocalStorageData) => void
}