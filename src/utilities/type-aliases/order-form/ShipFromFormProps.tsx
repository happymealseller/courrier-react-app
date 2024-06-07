import { Address } from "./FormData"

type ShipFromData = {
    // fromCompanyName: string,
    fromAddress: Partial<Address>,
    fromFullName: string,
    fromEmail: string,
    fromPhoneNo: string
}

export type ShipFromFormProps = ShipFromData & {
    updateFields: (fields: Partial<ShipFromData>) => void
}