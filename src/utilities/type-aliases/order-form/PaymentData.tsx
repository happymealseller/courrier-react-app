type PaymentData = {
    price: number
}

export type PaymentDataProps = PaymentData & {
    updateFields: (fields: Partial<PaymentData>) => void
}