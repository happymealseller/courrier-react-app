import { FormWrapper } from "./FormWrapper";
import { ShipToFormProps } from "../../utilities/type-aliases/order-form/ShipToFormProps";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export function ShipToForm({ toAddress, toFullName, toEmail, toPhoneNo, updateFields }: ShipToFormProps) {
    const [address, setAddress] = useState(toAddress.address);
    const [city, setCity] = useState(toAddress.city);
    const [country, setCountry] = useState(toAddress.country);

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
        updateFields({ toAddress: { ...toAddress, address: address, city: city, country: country }})
    }, [address, city, country])

    return (
        <FormWrapper title="Ship To (Receipient)">
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
                value={toAddress.address}
                onChange={e => setAddress(e.target.value)}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Postal Code</label>
            <div>
                <input 
                    autoFocus 
                    required 
                    type="text" 
                    pattern="^\d{0,6}$"
                    title="Please enter 6 digits"
                    value={toAddress.postalCode}
                    onChange={e => updateFields({ toAddress: { ...toAddress, postalCode: e.target.value }})}
                    className="border-2 px-2 rounded-md bg-gray-200"
                />
                <button
                    type="button"
                    className="bg-slate-500 rounded-md w-1/2 text-sm text-white ml-1 p-1"
                    onClick={(e) => getAddressFromPostalCode(e, toAddress.postalCode || "")}
                >
                    Retrieve address
                </button>
            </div>
            <label className="font-bold">City</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toAddress.city}
                onChange={e => setCity(e.target.value)}
                className="border-2 px-2 rounded-md bg-gray-200"
            />
            <label className="font-bold">Country</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={toAddress.country}
                onChange={e => setCountry(e.target.value)}
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
                onChange={e => updateFields({ toPhoneNo: e.target.value })} 
                className="border-2 px-2 rounded-md bg-gray-200"
            />
        </FormWrapper>
    )
}