import React, { useState, FormEvent } from 'react';
import { AccountType } from '../../utilities/enums/AccountType';
import axios from 'axios';
import { ResponseStatus } from '../../utilities/enums/ResponseStatus';
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
    const [accountType, setAccountType] = useState(AccountType.Sender);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");

    const [isSenderView, setIsSenderView] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsSenderView(event.target.value === AccountType.Sender);
        setAccountType(event.target.value === AccountType.Courier ? AccountType.Courier : AccountType.Sender);
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const senderRegistrationInformation = { fullName, username, email, password, phoneNo };
        const courierRegistrationInformation = { fullName, username, password, vehicleCapacity };
        const registrationInformation = accountType === AccountType.Sender ? senderRegistrationInformation : courierRegistrationInformation;
        const url = "http://localhost:8081/register" + (accountType === AccountType.Sender ? "" : "Courier");
        /*
        const options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(registrationInformation)
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log("registered successfully", data);
            navigate('/');
        })
        .catch(error => console.log("error", error))
        */
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        }
        axios.post(url, JSON.stringify(registrationInformation), config)
            .then(response => {
                if (response.data.status === ResponseStatus.Success) {
                    alert("Registered Successfully!")
                    switch (accountType) {
                        case AccountType.Sender:
                            navigate("/dashboard/sender");
                            break;
                        case AccountType.Courier:
                            navigate("/dashboard/courier");
                            break;
                        default:
                            navigate("/login");
                    }                    
                } else if (response.data.status === ResponseStatus.Failure) {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    }

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold">FDMx</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Please enter your registration details.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-base font-normal" >Account Type:</label>
                </div>
                <select 
                    id="accounttype" 
                    name="accounttype" 
                    className="border border-black rounded-sm p-1 mt-1 bg-transparent" 
                    required 
                    value={accountType}
                    onChange={handleAccountTypeChange}
                >
                    <option value={AccountType.Sender}>Sender</option>
                    <option value={AccountType.Courier}>Courier</option>
                </select>
                <div>
                    <label className="text-base font-normal">Full Name:</label>
                </div>
                <input 
                    type="text"
                    value={fullName}
                    style={{border: '1px solid black', padding: '5px'}} 
                    id="full-name" 
                    name="full-name" 
                    placeholder="Full Name" 
                    required 
                    onChange={e => setFullName(e.target.value)}
                >
                </input>
                <div>
                    <label className="text-base font-normal">Username:</label>
                </div>
                <input 
                    type="text"
                    value={username}
                    style={{border: '1px solid black', padding: '5px'}} 
                    id="username" 
                    name="username" 
                    placeholder="Userame" 
                    required 
                    onChange={e => setUsername(e.target.value)}
                >
                </input>
                { isSenderView && (
                    <>
                        <div>
                            <label className="text-base font-normal">Email:</label>
                        </div>
                        <input
                            type="email" 
                            value={email}
                            style={{ border: '1px solid black', padding: '5px' }}
                            id="useremail" 
                            name="useremail" 
                            placeholder="Email" 
                            required
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                    </>
                )}
                <div>
                    <label className="text-base font-normal">Password:</label>
                </div>
                <input 
                    type="password" 
                    value={password}
                    style={{ border: '1px solid black', padding: '5px' }}
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain minimum 8 characters, at least 1 number, 1 uppercase and 1 lowercase letter" 
                    required
                    onChange={e => setPassword(e.target.value)}
                ></input>
                { isSenderView && (
                    <>
                        <div>
                            <label className="text-base font-normal">Phone Number:</label>
                        </div>
                        <input 
                            type="tel" 
                            value={phoneNo}
                            style={{ border: '1px solid black', padding: '5px' }}
                            id="phone-number" 
                            name="phone-number" 
                            placeholder="Phone Number" 
                            required
                            onChange={e => setPhoneNo(e.target.value)}
                        ></input>
                    </>
                )}
                { !isSenderView && (
                    <>
                        <div> 
                            <label className="text-base font-normal">Vehicle Capacity (kg):</label> 
                        </div>
                        <input 
                            type="text" 
                            value={vehicleCapacity}
                            style={{border: '1px solid black', padding: '5px'}} 
                            id="capacity" 
                            name="capacity" 
                            placeholder="0"
                            onChange={e => setVehicleCapacity(e.target.value)}
                        ></input>
                    </>
                )}
                { error && (
                    <p className="text-red-500">{error}</p>
                )}
                <div className="mt-8 flex flex-col gap-y-4">
                    <button 
                        type="submit"
                        className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
