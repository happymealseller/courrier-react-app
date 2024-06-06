import { useState, FormEvent, useEffect } from "react";
import { axiosInstance } from "../security/axiosInstance";
import { format } from "date-fns";
import { CustomerUrl } from "../../utilities/enums/Url";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utilities/constants/config";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { OrderHistoryItem } from "./OrderHistoryItem";

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

export function SenderDashboard() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [allowUpdate, setAllowUpdate] = useState(false);


  const order_headers = [
    "Tracking ID",
    "Receipient Name",
    "Date of Order",
    "Date of Deilvery",
    "Delivery Address",
    "Order Status",
  ];

  const displayKeys = [
    "orderId",
    "toFullName",
    "orderDate",
    "deliveryDate",
    "toAddress",
    "currentStatus",
  ];


  const username = useSelector((state: RootState) => state.authentication.username)

  useEffect(() => {
    config.headers[RequestHeaderKey.Username] = username
  }, [])

  useEffect(() => {
    axiosInstance
      .get("/customer/orders", config)
      .then((res) => filterData(res.data.orderHistoryList, displayKeys))
      .then((data: OrderHistoryItem[]) => setOrders(data))
      .catch((err) => console.log(err));
  }, [setOrders]);

  function handleClick(e: FormEvent) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-3xl font-semibold underline underline-offset-1 mb-4">
        Courier Dashboard
      </h1>
      <h2 className="text-xl font-semibold text-bright-red mb-6">
        Welcome {username}!
      </h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-300">
            {order_headers.map((header, idx) => (
              <th key={idx} className="px-5 py-3 text-left border-b-2 border-gray-300">
                {header}
              </th>
            ))}
            <th className="px-5 py-3 text-left border-none">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              {Object.entries(item).map(([key, value], idx) => (
                <td key={idx} className="px-5 py-3 text-center">
                  {value}
                </td>
              ))}
              <td className="px-5 py-3 text-center border-none">
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => navigate(CustomerUrl.VIEW_ORDER, { state: { allowUpdate: false } })}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => navigate(CustomerUrl.UPDATE_ORDER, { state: { allowUpdate: true } })}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="py-3 px-8 bg-slate-500 text-white text-lg font-bold rounded-xl transition-transform transform active:scale-95 hover:scale-105"
          onClick={handleClick}
        >
          Back
        </button>
      </div>
    </div>

  );
}
