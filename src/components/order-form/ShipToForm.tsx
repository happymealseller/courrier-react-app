import { FormWrapper } from "./FormWrapper";
import { ShipToFormProps } from "../../utilities/type-aliases/order-form/ShipToFormProps";
import { axiosInstance } from "../security/axiosInstance";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export function ShipToForm({ toAddress, toFullName, toEmail, toPhone, updateFields }: ShipToFormProps) {
    const [address, setAddress] = useState(toAddress.address);
    const [city, setCity] = useState(toAddress.city);
    const [country, setCountry] = useState(toAddress.country);

    const handleAddressRetrieval = (event: FormEvent, postalCode: string) => {
        const url = `http://localhost:3001/${postalCode}`
        axios.get(url).then(response => {
            setAddress(response.data.address);
            setCountry(response.data.country);
            setCity(response.data.city);
        })
    }

    useEffect(() => {
        updateFields({ toAddress: { ...toAddress, address: address, city: city, country: country }})
    }, [address, city, country])

    return (
        <FormWrapper title="Ship To (Receipient)">
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
                value={toPhone} 
                onChange={e => updateFields({ toPhone: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
}