import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { CourierUrl } from "../../utilities/enums/Url";
import { useNavigate } from "react-router-dom";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { config } from "../../utilities/constants/config";
import { axiosInstance } from "../security/axiosInstance";
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

export function AdminDashboard() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.authentication.username);
  const [allowUpdate, setAllowUpdate] = useState(false);

  const order_headers = [
    "Tracking ID",
    "Sender Name",
    "Recipient Name",
    "Date of Delivery",
    "Delivery Address",
    "Order Status",
  ];

  const displayKeys = [
    "orderId",
    "fromFullName",
    "toFullName",
    "deliveryDate",
    "toAddress",
    "currentStatus",
  ];

	useEffect(() => {
		config.headers[RequestHeaderKey.Username] = username
	}, [])

    // Change API after its done
  useEffect(() => {
    axiosInstance
      .get("/courier/orders", config) 
      .then((res) => filterData(res.data.orderHistoryList, displayKeys))
      .then((data: OrderHistoryItem[]) => setOrders(data))
      .catch((err) => console.log(err));
  }, [setOrders]); // to filter only for undelivered items next time


  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Admin Dashboard</h1>
      <br />
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">Welcome Admin!</h2>
      <br />
      <table className="table-auto w-full" style={{ height: '200px' }}> 
        <thead>
          <tr className="border border-black px-5 py-2">
            {order_headers.map((header, idx) => (
              <th key={idx} className="border border-black px-5 py-2" style={{ width: '165px' }}>{header}</th>
            ))}
            <th className="border border-black px-5 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={index} className="bg-white border border-black px-5 py-2 border-solid">
              {Object.entries(item).map(([key, value], idx) => (
                <td key={idx} className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                  {value}
                </td>
              ))}
              {/* Button in the last column, to fix issue with last column header borders next time */}
              <td
                className="border px-5 py-2 border-black"
                style={{ textAlign: "center" }}
              >
                <div style={{ padding: "10px", alignItems: "center" }}>
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2.5" //, marginRight:"10px"
                    onClick={() => {
                      navigate(CourierUrl.VIEW_ORDER, { state: { allowUpdate: false }})
                    }}
                  >
                    View
                  </button>
                </div>
                  <div>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2" style={{ width: '130px' }}
                      onClick={() => {
                        navigate(CourierUrl.UPDATE_ORDER, { state: { allowUpdate: true }})
                      }}
                    >
                      Update
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
          className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold px-8 py-3 text-center m-2"
          onClick={handleClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}
