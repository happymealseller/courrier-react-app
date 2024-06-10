import { FormWrapper } from "./FormWrapper";
import { ShipFromFormProps } from "../../utilities/type-aliases/order-form/ShipFromFormProps";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";

export function ShipFromForm({ fromAddress, fromFullName, fromEmail, fromPhoneNo, updateFields }: ShipFromFormProps) {

    const [address, setAddress] = useState(fromAddress.address);
    const [city, setCity] = useState(fromAddress.city);
    const [country, setCountry] = useState(fromAddress.country);

    const getAddressFromPostalCode = (event: FormEvent, postalCode: string) => {
        const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

        axios.get(url)
            .then(response => {
                if (response.data.found > 0) {
                    setAddress(response.data.results[0]["ADDRESS"])
                    setCountry("SINGAPORE")
                    setCity("SINGAPORE")
                } else {
                    alert("No address found for this postal code.")
                }
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    useEffect(() => {
        updateFields({ fromAddress: { ...fromAddress, address: address, city: city, country: country }})
    }, [address, city, country])


    return (
        <FormWrapper title="Ship From (Sender)">
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
                onChange={e => setAddress(e.target.value)}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
                <label className="font-bold">Postal Code</label>
            <div>
                <input 
                    autoFocus
                    required
                    type="number" 
                    pattern="^\d{0,6}$"
                    title="Please enter 6 digits"
                    value={fromAddress.postalCode}
                    onChange={e => updateFields({ fromAddress: { ...fromAddress, postalCode: e.target.value }})}
                    className="border-2 px-2 rounded-md bg-gray-200"
                />
                <button
                    type="button"
                    className="bg-slate-500 rounded-md w-1/2 text-sm text-white ml-1 p-1"
                    onClick={(e) => getAddressFromPostalCode(e, fromAddress.postalCode || "")} // handleAddressRetrieval(e, fromAddress.postalCode || "")
                >
                    Retrieve address
                </button>
            </div>
            <label className="font-bold">City</label>
            <input 
                autoFocus
                required
                type="text" 
                value={fromAddress.city}
                onChange={e => setCity(e.target.value)}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Country</label>
            <input 
                autoFocus
                required
                type="text" 
                value={fromAddress.country}
                onChange={e => setCountry(e.target.value)}
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
                onChange={e => updateFields({ fromPhoneNo: e.target.value })}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
    
}