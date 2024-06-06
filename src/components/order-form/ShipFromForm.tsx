import { FormWrapper } from "./FormWrapper";
import { ShipFromFormProps } from "../../utilities/type-aliases/order-form/ShipFromFormProps";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export function ShipFromForm({ fromAddress, fromFullName, fromEmail, fromPhone, updateFields }: ShipFromFormProps) {

    const [address, setAddress] = useState(fromAddress.address);
    const [city, setCity] = useState(fromAddress.city);
    const [country, setCountry] = useState(fromAddress.country);


    const handleAddressRetrieval = (event: FormEvent, postalCode: string) => {
        const url = `http://localhost:3001/${postalCode}`
        axios.get(url).then(response => {
            console.log(response)
            setAddress(response.data.address)
            setCountry(response.data.country)
            setCity(response.data.city)
        })
        
    }

    useEffect(() => {
        updateFields({ fromAddress: { ...fromAddress, address: address, city: city, country: country }})
    }, [address, city, country])


    return (
        <FormWrapper title="Ship From (Sender)">
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
                value={fromPhone} 
                onChange={e => updateFields({ fromPhone: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
    
}