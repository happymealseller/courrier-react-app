import { FormWrapper } from "./FormWrapper";

type ShipToData = {
    toCompanyName: string,
    toAddress: string,
    toContactName: string,
    toEmail: string,
    toPhone: string
}

type ShipToFormProps = ShipToData & {
    updateFields: (fields: Partial<ShipToData>) => void
}

export function ShipToForm({ toCompanyName, toAddress, toContactName, toEmail, toPhone, updateFields }: ShipToFormProps) {
    return (
        <FormWrapper title="Ship To">
            <label>Full Name or Company Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toCompanyName} 
                onChange={e => updateFields({ toCompanyName: e.target.value })} 
            />
            <label>Contact Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toContactName} 
                onChange={e => updateFields({ toContactName: e.target.value })} 
            />
            <label>Address</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toAddress}
                onChange={e => updateFields({ toAddress: e.target.value })} 
            />
            <label>Recipient Email</label>
            <input 
                autoFocus 
                required 
                type="email" 
                value={toEmail} 
                onChange={e => updateFields({ toEmail: e.target.value })} 
            />
            <label>Recipient Phone</label>
            <input 
                autoFocus 
                required 
                type="contact" 
                value={toPhone} 
                onChange={e => updateFields({ toPhone: e.target.value })} 
            />
        </FormWrapper>
    )
}