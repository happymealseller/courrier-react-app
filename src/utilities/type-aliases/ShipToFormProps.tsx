type ShipToData = {
    toCompanyName: string,
    toAddress: string,
    toContactName: string,
    toEmail: string,
    toPhone: string
}

export type ShipToFormProps = ShipToData & {
    updateFields: (fields: Partial<ShipToData>) => void
}