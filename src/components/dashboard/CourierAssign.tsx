import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function CourierAssign() {
    const [courierId, setCourierId] = useState("");
    const [orderId, setOrderId] = useState("");

    const navigate = useNavigate();

    //overall function need to update
    // function handleSubmit(e: FormEvent) {
    //     e.preventDefault()
    //     const orderInformation = { courierId, orderId };
    //     const url = "http://localhost:8081/courier";  //update this url
    //     const options = {
    //         "method": "POST",
    //         "headers": {
    //             "Content-Type": "application/json"
    //         },
    //         "body": JSON.stringify(orderInformation)
    //     }
    //     fetch(url, options)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log("registered successfully", data);
    //         navigate('/');
    //     })
    //     .catch(error => console.log("error", error))
    // }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("Courier assigned to order successfully!")
        navigate('/');
    }

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-2xl font-semibold">Assign Courier to Order</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-base font-normal" >Courier ID:</label>
                </div>
                <input 
                    type="text"
                    value={courierId}
                    style={{border: '1px solid black', padding: '5px'}} 
                    id="courier-id" 
                    name="courier-id" 
                    placeholder="Courier ID" 
                    required 
                    onChange={e => setCourierId(e.target.value)}
                >
                </input>
                <div>
                    <label className="text-base font-normal">Order ID:</label>
                </div>
                <input 
                    type="text"
                    value={orderId}
                    style={{border: '1px solid black', padding: '5px'}} 
                    id="order-id" 
                    name="order-id" 
                    placeholder="Order ID" 
                    required 
                    onChange={e => setOrderId(e.target.value)}
                >
                </input>
                {/* <div>
                    <label className="text-base font-normal">Order Status:</label>
                </div>
                <input 
                    type="text"
                    value="order-status"
                    style={{border: '1px solid black', padding: '5px'}} 
                    id="order-status" 
                    name="order-status" 
                    placeholder="Order Status" 
                    required 
                >
                </input> */}
                <div className="mt-8 flex flex-col gap-y-4">
                    <button 
                        type="submit"
                        className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold"
                    >
                        Update Order
                    </button>
                </div>
            </form>
        </div>
    )
}