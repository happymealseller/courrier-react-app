import { FormWrapper } from "./FormWrapper";
import { ShipFromFormProps } from "../../utilities/type-aliases/order-form/ShipFromFormProps";

export function ShipFromForm({ fromAddress, fromFullName, fromEmail, fromPhoneNo, updateFields }: ShipFromFormProps) {
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
                value={fromAddress}
                onChange={e => updateFields({ fromAddress: e.target.value })}
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
                value={fromPhoneNo}
                onChange={e => updateFields({ fromPhone: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )

}