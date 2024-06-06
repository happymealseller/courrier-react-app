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

/* Admin should be able to do
- filter by trip status (UNASSIGNED, ASSIGNED, RETRIEVED, COMPLETED), region, trip date, type (PICKUP OR DELIVERY)
- update order status INCLUDING order cancelled and others AND remarks
*/
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

const filterOrdersByStatus = (orders: OrderHistoryItem[], status: string): OrderHistoryItem[] => {
  return status === "All" ? orders : orders.filter(order => order.orderStatus === status);
};

export function AdminDashboard() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.authentication.username);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<OrderHistoryItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

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

  // Dummy data for demonstration
  const dummyOrders: OrderHistoryItem[] = [
    {
      orderId: 1,
      orderStatus: "Completed",
      toFullName: "Bob Smith",
      deliveryDate: "2024-06-01",
      toAddress: "123 Main St, Springfield",
      orderDate: "2024-05-28",
    },
    {
      orderId: 2,
      orderStatus: "Retrieved",
      toFullName: "David Green",
      deliveryDate: "2024-06-05",
      toAddress: "456 Elm St, Springfield",
      orderDate: "2024-06-01",
    },
    {
      orderId: 3,
      orderStatus: "Assigned",
      toFullName: "Frank White",
      deliveryDate: "2024-06-03",
      toAddress: "789 Maple St, Springfield",
      orderDate: "2024-06-01",
    },
  ];

  useEffect(() => {
    setOrders(dummyOrders);
    setFilteredOrders(dummyOrders);
  }, []);

  useEffect(() => {
    setFilteredOrders(filterOrdersByStatus(orders, selectedStatus));
  }, [selectedStatus, orders]);

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value);
  }

	// useEffect(() => {
	// 	config.headers[RequestHeaderKey.Username] = username
	// }, [])

  //   // Change API after its done
  // useEffect(() => {
  //   axiosInstance
  //     .get("/courier/orders", config) 
  //     .then((res) => filterData(res.data.orderHistoryList, displayKeys))
  //     .then((data: OrderHistoryItem[]) => setOrders(data))
  //     .catch((err) => console.log(err));
  // }, [setOrders]); // to filter only for undelivered items next time


  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Admin Dashboard</h1>
      <br />
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">Welcome {username}!</h2>
      <br />
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
        <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange} className="border-2 border-gray-300 p-2 rounded-md">
          <option value="All">All</option>
          <option value="Unassigned">Unassigned</option>
          <option value="Assigned">Assigned</option>
          <option value="Retrieved">Retrieved</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
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
          {filteredOrders.map((item, index) => (
            <tr key={index} className="bg-white border border-black px-5 py-2 border-solid">
              {Object.entries(item).map(([key, value], idx) => (
                <td key={idx} className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                  {value}
                </td>
              ))}
              <td
                className="border px-5 py-2 border-black"
                style={{ textAlign: "center" }}
              >
                <div style={{ padding: "10px", alignItems: "center" }}>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2.5"
                    onClick={() => {
                      navigate("/view-order", { state: { allowUpdate: false } });
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
                      navigate("/update-order", { state: { allowUpdate: true } });
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
