import { useState, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../security/axiosInstance";
import { LocalStorageKey } from "../../utilities/enums/LocalStorageKey";
import { SenderDashboardProps } from "../../pages/SenderDashboardPage";

export function SenderDashboard({ sendDataToApp }: SenderDashboardProps) {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { jwt, accountType, username } = location.state || {};
  useEffect(() => {
    sendDataToApp({ jwt, accountType, username });
  }, []);

  const order_headers = [
    "order_id",
    "receipient_name",
    "order_date",
    "delivery_date",
    "delivery_address",
    "status",
  ];

  const displayKeys = [
    "orderId",
    "toFullName",
    "orderDate",
    "deliveryDate",
    "toAddress",
    "orderStatus",
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      username: localStorage.getItem(LocalStorageKey.Username),
    },
  };

  useEffect(() => {
    axiosInstance
      .get("/customer/orders", config)
      .then((res) => setPeople(res.data.orderHistoryList))
      .catch((err) => console.log(err));
  }, [setPeople]);

  function handleClick(e: FormEvent) {
    e.preventDefault();
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
            <th className="px-5 py-2 border-none">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((item, index) => (
            <tr
              key={index}
              className="bg-white border border-black px-5 py-2 border-solid"
            >
              {displayKeys.map((key, idx) => (
                <td
                  key={idx}
                  className="border border-black px-5 py-2 border-solid"
                  style={{ textAlign: "center" }}
                >
                  {item[key]}
                </td>
              ))}
              <td
                className="px-5 py-2 border-none"
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
