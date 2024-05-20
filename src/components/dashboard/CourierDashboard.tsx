import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../security/axiosInstance";
import { format } from "date-fns";
import { CourierDashboardProps } from "../../utilities/type-aliases/dashboard/CourierDashboardProps";

const filterData = (data: any[], keys: any[]) => {
  return data.map((item) => {
    const filteredItem: any = {}; // Add type annotation here
    keys.forEach((key) => {
      filteredItem[key] = key.includes("Date")
        ? format(new Date(item[key]), "yyyy-MM-dd")
        : item[key];
    });
    return filteredItem as OrderHistoryItem;
  });
};

export function CourierDashboard({ sendDataToApp }: CourierDashboardProps) {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { jwt, accountType, username } = location.state || {};
  useEffect(() => {
    sendDataToApp({ jwt, accountType, username });
  }, []);

  const order_headers = [
    "order_id",
    "sender_name",
    "receipient_name",
    "delivery_address",
    "delivery_date",
    "status",
  ];

  const displayKeys = [
    "orderId",
    "fromFullName",
    "toFullName",
    "toAddress",
    "deliveryDate",
    "orderStatus",
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      jwt: localStorage.getItem("jwt"),
      username: localStorage.getItem("username"),
    },
  };

  useEffect(() => {
    axiosInstance
      .get("/courier/orders", config) //  url to change also
      .then((res) => filterData(res.data.orderHistoryList, displayKeys))
      .then((data: OrderHistoryItem[]) => setOrders(data))
      .catch((err) => console.log(err));
  }, [setOrders]); // to filter only for undelivered items next time

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
      <table className="table-auto w-full">
        <thead>
          <tr className="border border-black px-5 py-2">
            {order_headers.map((header, idx) => (
              <th key={idx} className="border border-black px-5 py-2">
                {header}
              </th>
            ))}
            <th className="border border-black px-5 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr
              key={index}
              className="bg-white border border-black px-5 py-2 border-solid"
            >
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
                    onClick={handleClick}
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
          onClick={handleClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}
