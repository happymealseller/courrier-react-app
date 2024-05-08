type ShipFromData = {
    fromCompanyName: string,
    fromAddress: string,
    fromFullName: string,
    fromEmail: string,
    fromPhone: string
}

export type ShipFromFormProps = ShipFromData & {
    updateFields: (fields: Partial<ShipFromData>) => void
}