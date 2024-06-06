import { FormWrapper } from "./FormWrapper";
import { ShipFromFormProps } from "../../utilities/type-aliases/order-form/ShipFromFormProps";

export function ShipFromForm({ fromAddress, fromFullName, fromEmail, fromPhone, updateFields }: ShipFromFormProps) {
    return (
        <FormWrapper title="Ship From">
            {/*
            <label className="font-bold">Full Name or Company Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromCompanyName} 
                onChange={e => updateFields({ fromCompanyName: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200" 
            />
            */}
            <label className="font-bold">Full Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromFullName}
                onChange={e => updateFields({ fromFullName: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Address</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromAddress.address}
                onChange={e => updateFields({ fromAddress: { ...fromAddress, address: e.target.value }})}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Postal Code</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromAddress.postalCode}
                onChange={e => updateFields({ fromAddress: { ...fromAddress, postalCode: e.target.value }})}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">City</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromAddress.city}
                onChange={e => updateFields({ fromAddress: { ...fromAddress, city: e.target.value }})}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Country</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={fromAddress.country}
                onChange={e => updateFields({ fromAddress: { ...fromAddress, country: e.target.value }})}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Email</label>
            <input 
                autoFocus 
                required 
                type="email" 
                value={fromEmail}
                onChange={e => updateFields({ fromEmail: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Phone</label>
            <input 
                autoFocus 
                required 
                type="text" 
                pattern="^[89]\d{7}$"
                title="Please enter an 8-digit number starting with 8 or 9."
                value={fromPhone} 
                onChange={e => updateFields({ fromPhone: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
    
}