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
    "Recipient Name",
    "Date of Order",
    "Date of Delivery",
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

  interface TableCellProps {
    key: number;
    value: any;
    isAddress: boolean;
  }
  
  const TableCell: React.FC<TableCellProps> = ({ key, value, isAddress }) => {
    const displayValue = isAddress
      ? `${value.address.toString()}, ${value.postalCode.toString()}`
      : value.toString();
  
    return (
      <td
        key={key}
        className="border border-black px-5 py-2 border-solid"
        style={{ textAlign: "center" }}
      >
        {displayValue}
      </td>
    );
  };


  
  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold  underline underline-offset-1">
        Customer Dashboard
      </h1>
      <br></br>
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">
        Welcome {username}!
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
          {orders.map((item, index) => (
            <tr key={index} className="bg-white border border-black px-5 py-2 border-solid">
              {Object.entries(item).map(([key, value], idx) => (
                <TableCell
                  key={idx}
                  value={value}
                  isAddress={key === "toAddress" || key === "fromAddress"}
                />
              ))}

              <td
                className="px-5 py-2 border-none"
                style={{ textAlign: "center" }}
              >
                <div style={{ padding: "10px", alignItems: "center"}}>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2.5"
                    onClick={() => {
                      navigate(CustomerUrl.VIEW_ORDER, { state: { allowUpdate: false, orderId: item.orderId }})
                    }}

                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => {
                      navigate(CustomerUrl.UPDATE_ORDER, { state: { allowUpdate: true, orderId: item.orderId }})
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
          className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-500 text-white text-lg font-bold px-8 py-3 text-center m-2 "
          onClick={handleClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}
