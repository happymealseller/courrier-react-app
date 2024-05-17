import React, { useState, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStorageData } from '../../App';

export type CourierDashboardProps = {
    sendDataToApp: (data: LocalStorageData) => void
}

export function CourierDashboard({sendDataToApp}: CourierDashboardProps) {
  const [courierId, setCourierId] = useState("");
  const [orderId, setOrderId] = useState("");
  const order_headers = [
    "order_id",
    "sender_name",
    "receipient_name",
    "delivery_address",
    "status",
    "delivery_date",
  ];

  const people = [
    {
      order_id: "1",
      sender_name: "Creola Katherine Johnson",
      receipient_name: "Creola Johnson",
      delivery_address: "22 Jump Street",
      delivery_date: "2022-01-01",
      status: "Delivered",
    },
    {
      order_id: "2",
      sender_name: "Mario José Molina-Pasquel Henríquez",
      receipient_name: "Creola Johnson",
      delivery_address: "2 Suntec Street",
      delivery_date: "2023-01-01",
      status: "Pending",
    },
    {
      order_id: "3",
      sender_name: "Mohammad Abdus Salam",
      receipient_name: "Creola Johnson",
      delivery_address: "11 Suntec Street",
      delivery_date: "2024-01-01",
      status: "Returned",
    },
    {
      order_id: "4",
      sender_name: "Mohammad Abdus Salam",
      receipient_name: "Percy Lavon Julian",
      delivery_address: "11 Suntec Street",
      delivery_date: "2024-02-01",
      status: "Assigned",
    },
  ]; // to update with actual data from db, filter out for only undelivered items

    const navigate = useNavigate();
    const location = useLocation();
    const { jwt, accountType, username } = location.state || {};
    useEffect(() => {
        sendDataToApp({ jwt, accountType, username });
    }, []);
    

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

  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold  underline underline-offset-1">
        Courier Dashboard
      </h1>
      <br></br>
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">
        Welcome User
      </h2>
      <br></br>
      <form onClick={handleClick}>
        <table className="table-auto w-full">
          <thead>
            <tr className="border border-black px-5 py-2">
              {order_headers.map((header) => (
                <th key={header} className="border border-black px-5 py-2">
                  {header}
                </th>
              ))}
              <th className="border border-black px-5 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((item, index) => (
              <tr key={index} className="bg-white">
                {Object.entries(item).map(([key, value], idx) => (
                  <td
                    key={idx}
                    className="border border-black px-5 py-2 border-solid"
                    style={{ textAlign: "center" }}
                  >
                    {value}
                  </td>
                ))}
                {/* Button in the last column, to fix issue with last column header borders next time */}
                <td 
                  className="border px-5 py-2 border-black"
                  style={{ textAlign: "center" }}
                >
                  <div style={{ padding: "10px 15px", alignItems: "center" }}>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 gap-y-6">
          <button
            type="button"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold px-8 py-3 text-center m-2 "
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
