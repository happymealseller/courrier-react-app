import { FormWrapper } from "./FormWrapper"

type PaymentData = {
    nameOnCard: string,
    cardNumber: string,
    expiryDate: string,
    securityCode: string
}

type PaymentFormProps = PaymentData & {
    updateFields: (fields: Partial<PaymentData>) => void
}

export function PaymentForm({ nameOnCard, cardNumber, expiryDate, securityCode, updateFields }: PaymentFormProps) {
    return (
        <FormWrapper title="Payment">
            <label className="font-bold">Name on card</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={nameOnCard} 
                onChange={e => updateFields({ nameOnCard: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200" 
            />
            <label className="font-bold">Card number</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={cardNumber} 
                onChange={e => updateFields({ cardNumber: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200" 
            />
            <label className="font-bold">Expiry date</label>
            <input 
                autoFocus 
                required 
                type="month" 
                value={expiryDate} 
                onChange={e => updateFields({ expiryDate: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200" 
            />
            <label className="font-bold">Security code</label>
            <input 
                autoFocus 
                required 
                type="password" 
                value={securityCode} 
                onChange={e => updateFields({ securityCode: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200" 
            />
        </FormWrapper>
    )
}