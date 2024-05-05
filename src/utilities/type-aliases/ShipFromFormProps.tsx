type ShipFromData = {
    fromCompanyName: string,
    fromAddress: string,
    fromContactName: string,
    fromEmail: string,
    fromPhone: string
}

export type ShipFromFormProps = ShipFromData & {
    updateFields: (fields: Partial<ShipFromData>) => void
}