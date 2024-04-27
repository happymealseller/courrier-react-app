import { FormWrapper } from "./FormWrapper";

type ShipFromData = {
    fromCompanyName: string,
    fromAddress: string,
    fromContactName: string,
    fromEmail: string,
    fromPhone: string
}

type ShipFromFormProps = ShipFromData & {
    updateFields: (fields: Partial<ShipFromData>) => void
}

export function ShipFromForm({ fromCompanyName, fromAddress, fromContactName, fromEmail, fromPhone, updateFields }: ShipFromFormProps) {
    return (
        <FormWrapper title="Ship From">
            <label>Full Name or Company Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromCompanyName} 
                onChange={e => updateFields({ fromCompanyName: e.target.value })} 
            />
            <label>Contact Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromContactName}
                onChange={e => updateFields({ fromContactName: e.target.value })}
            />
            <label>Address</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromAddress}
                onChange={e => updateFields({ fromAddress: e.target.value })}
            />
            <label>Email</label>
            <input 
                autoFocus 
                required 
                type="email" 
                value={fromEmail}
                onChange={e => updateFields({ fromEmail: e.target.value })}
            />
            <label>Phone</label>
            <input 
                autoFocus 
                required 
                type="contact" 
                value={fromPhone} 
                onChange={e => updateFields({ fromPhone: e.target.value })}
            />
        </FormWrapper>
    )
    
}