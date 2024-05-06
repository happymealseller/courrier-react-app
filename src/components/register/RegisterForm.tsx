import React, { useState } from 'react';

export function RegisterForm() {
    function handleSubmit() {
        alert("send info to POST register api")
    }

    const [show, setShow] = useState(false)

    const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the show state based on the selected account type
        setShow(event.target.value === 'courier');
      };

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
        <h1 className="text-5xl font-semibold">FDMx</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">Please enter your registration details.</p>

        <form onSubmit={handleSubmit}>
            <div><label className="text-base font-normal" >Account Type:</label></div>
            <select id="accounttype" name="accounttype" className="border border-black rounded-sm p-1 mt-1 bg-transparent" 
            required 
            onChange={handleAccountTypeChange}>
                <option value="sender" selected>Sender</option>
                <option value="courier" >Courier</option>
            </select>

            <div><label className="text-base font-normal">Full Name:</label></div>
                <input type="text" style={{border: '1px solid black', padding: '5px'}} 
                id="full-name" name="full-name" placeholder="Full Name" required ></input>
            
            { !show && (
                <>
                <div>
                    <label className="text-base font-normal">Email:</label>
                </div>
                <input type="email" style={{ border: '1px solid black', padding: '5px' }}
                        id="useremail" name="useremail" placeholder="Email" required></input>
                <div>
                    <label className="text-base font-normal">Password:</label>
                </div>
                <input type="password" style={{ border: '1px solid black', padding: '5px' }}
                        id="password" name="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain minimum 8 characters, at least 1 number, 1 uppercase and 1 lowercase letter" required></input>
                <div>
                    <label className="text-base font-normal">Phone Number:</label>
                </div>
                <input type="tel" style={{ border: '1px solid black', padding: '5px' }}
                        id="phone-number" name="phone-number" placeholder="Phone Number" required></input>
                </>
            )
            }


            {/* for sender only */}
            
            { show && (
                <>                <div> 
                <label className="text-base font-normal">Vehicle Capacity (kg):</label> 
                </div>
                <input type="text" style={{border: '1px solid black', padding: '5px'}} id="capacity" name="capacity" placeholder="0"></input>
                </>
            ) 
            } {/* for courier only */}
            
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
