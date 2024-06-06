import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../components/security/axiosInstance";

interface senderDetails {
    fromFullName: string
    fromEmail: string
    fromPhone: string
    fromAddress: string
}

interface receipientDeatails {
    toFullName: string
    toEmail: string
    toPhone: string
    toAddress: string
}

interface orderDetails {
    sender: senderDetails
    recipient: receipientDeatails
}

const UpdateShipmentDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();




    const [formData, setFormData] = useState({
        sender: {
            fromFullName: "John Doe",
            fromEmail: "johndoe1@mail.com",
            fromPhone: "98765432",
            fromAddress: "Raffles Place",
        },
        recipient: {
            toFullName: "Jane Doe",
            toEmail: "janedoe@mail.com",
            toPhone: "87654321",
            toAddress: "City Hall",
        }
    });

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);


        axiosInstance.put(endpoint, JSON.stringify(orderDetails), config)
            .then(response => {
                if (response.data.status === ResponseStatus.Success) {
                    navigate(
                        CustomerUrl.NEW_ORDER_SUMMARY,
                        { state: response.data.orderDetails as NewOrderSummary }
                    )
                } else if (response.data.status === ResponseStatus.Failure) {
                    alert(`Error ${response.data.message}`)
                }
            })
    };


    return (
        <>
            <div className="flex justify-center items-center h-full w-full">
                <form onSubmit={handleSubmit} className="w-1/2 p-4">
                    <div className="flex justify-between space-x-4 mb-4">
                        <div className="w-1/2">
                            <h2 className="text-center text-lg font-bold mb-4 bg-orange-500 text-white h-8 rounded-lg">From</h2>
                            {Object.keys(formData.sender).map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor={key}>
                                        {key.replace('from', '')}
                                    </label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        type="text"
                                        name={key}
                                        id={key}
                                        value={formData.sender[key]}
                                        onChange={(e) => handleChange(e, 'sender')}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-center text-lg font-bold mb-4 bg-orange-500 text-white h-8 rounded-lg">To</h2>
                            {Object.keys(formData.recipient).map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor={key}>
                                        {key.replace('to', '')}
                                    </label>
                                    <input
                                        className="w-full p-2 border rounded"
                                        type="text"
                                        name={key}
                                        id={key}
                                        value={formData.recipient[key]}
                                        onChange={(e) => handleChange(e, 'recipient')}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default UpdateShipmentDetails