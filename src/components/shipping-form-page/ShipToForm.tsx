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
            <label className="font-bold">Full Name or Company Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toCompanyName} 
                onChange={e => updateFields({ toCompanyName: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Contact Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toContactName} 
                onChange={e => updateFields({ toContactName: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Address</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toAddress}
                onChange={e => updateFields({ toAddress: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Recipient Email</label>
            <input 
                autoFocus 
                required 
                type="email" 
                value={toEmail} 
                onChange={e => updateFields({ toEmail: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Recipient Phone</label>
            <input 
                autoFocus 
                required 
                type="contact" 
                value={toPhone} 
                onChange={e => updateFields({ toPhone: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
}