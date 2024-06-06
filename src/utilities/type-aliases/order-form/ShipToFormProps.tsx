import { Address } from "./FormData"

type ShipToData = {
    // toCompanyName: string,
    toAddress: Partial<Address>,
    toFullName: string,
    toEmail: string,
    toPhone: string
}

export type ShipToFormProps = ShipToData & {
    updateFields: (fields: Partial<ShipToData>) => void
}