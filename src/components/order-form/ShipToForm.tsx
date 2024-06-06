import { FormWrapper } from "./FormWrapper";
import { ShipToFormProps } from "../../utilities/type-aliases/order-form/ShipToFormProps";

export function ShipToForm({ toAddress, toFullName, toEmail, toPhoneNo, updateFields }: ShipToFormProps) {
    return (
        <FormWrapper title="Ship To">
            {/*
            <label className="font-bold">Full Name or Company Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toCompanyName} 
                onChange={e => updateFields({ toCompanyName: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            */}
            <label className="font-bold">Contact Name</label>
            <input
                autoFocus
                required
                type="text"
                value={toFullName}
                onChange={e => updateFields({ toFullName: e.target.value })}
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
                pattern="^[89]\d{7}$"
                title="Please enter an 8-digit number starting with 8 or 9."
                value={toPhoneNo}
                onChange={e => updateFields({ toPhone: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
}