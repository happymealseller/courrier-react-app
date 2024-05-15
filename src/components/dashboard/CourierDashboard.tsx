import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function CourierDashboard() {
    const [orderId, setOrderId] = useState("");

    const people = [
        {name: 'Creola Katherine Johnson', order_id: "1", date: "2022-01-01", status: "Delivered"},
        {name: 'Mario José Molina-Pasquel Henríquez', order_id: "2", date: "2023-01-01", status: "Delivered"},
        {name: 'Mohammad Abdus Salam', order_id: "3", date: "2024-01-01", status: "Delivered"},
        {name: 'Percy Lavon Julian', order_id: "4", date: "2025-01-01", status: "Delivered"},
        {name: 'Subrahmanyan Chandrasekhar', order_id: "5", date: "2026-01-01", status: "Delivered"}
      ];  // to update with actual data from db

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

  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold">Courier Dashboard</h1>
      <br></br>
      <form onClick={handleClick}>
      <table className="table-auto">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Sender Name</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {people.map((item) => {
          return (
            <tr>
              <td>  {item.order_id}  </td>
              <td>  {item.name}  </td>
              <td>  {item.date}  </td>
              <td>  {item.status}  </td>
            </tr>
          );
        })}
      </tbody>
      </table>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="button"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
