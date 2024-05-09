type ShipToData = {
    // toCompanyName: string,
    toAddress: string,
    toFullName: string,
    toEmail: string,
    toPhone: string
}

export type ShipToFormProps = ShipToData & {
    updateFields: (fields: Partial<ShipToData>) => void
}