import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "../security/axiosInstance";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { config } from "../../utilities/constants/config";

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

const dummyOrders = [
  {
    orderId: '1',
    fromFullName: 'Alice Johnson',
    toFullName: 'John Doe',
    deliveryDate: '2023-01-02',
    toAddress: '123 Main St',
    currentStatus: 'Out for delivery',

  },
  {
    orderId: '2',
    fromFullName: 'Bob Brown',
    toFullName: 'Jane Smith',
    deliveryDate: '2023-01-06',
    toAddress: '456 Elm St',
    currentStatus: 'Collected',

  },
];

export function CourierDashboard() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const navigate = useNavigate();

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

  const username = useSelector((state: RootState) => state.authentication.username)

  useEffect(() => {
    config.headers[RequestHeaderKey.Username] = username;
    const assignedOrders = dummyOrders;
    setOrders(assignedOrders);
  }, [username]);

	// useEffect(() => {
	// 	config.headers[RequestHeaderKey.Username] = username
	// }, [])

  // useEffect(() => {
  //   axiosInstance
  //     .get("/courier/orders", config) //  url to change also
  //     .then((res) => filterData(res.data.orderHistoryList, displayKeys))
  //     .then((data: OrderHistoryItem[]) => setOrders(data))
  //     .catch((err) => console.log(err));
  // }, [setOrders]); // to filter only for undelivered items next time

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

  const handleStatusUpdate = (orderId: string) => {
    // Handle the update request to the backend
    console.log(`Updating order ${orderId} to status: ${selectedStatus}`);
    // Update the order status on the dashboard
    setOrders(orders.map(order => order.orderId === orderId ? { ...order, currentStatus: selectedStatus } : order));
    setEditingOrderId(null);
  };

  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Courier Dashboard</h1>
      <br></br>
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">Welcome {username} !</h2>
      <br></br>
      <table className="table-auto w-full">
        <thead>
          <tr className="border border-black px-5 py-2">
            {order_headers.map((header, idx) => (
              <th key={idx} className="border border-black px-5 py-2">{header}</th>
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
              <td className="border px-5 py-2 border-black" style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2.5"
                  onClick={() => navigate('/orders')}
                >
                  View
                </button>
                {editingOrderId === item.orderId ? (
                  <div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="border-2 rounded-md px-2"
                    >
                      <option value="">Select Status</option>
                      <option value="Collected">Collected</option>
                      <option value="Processing">Processing</option>                      
                      <option value="Out for delivery">Out for delivery</option>
                    </select>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 ml-2 rounded"
                      onClick={() => handleStatusUpdate(item.orderId)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 ml-2 rounded"
                      onClick={() => setEditingOrderId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => { setEditingOrderId(item.orderId); setSelectedStatus(item.currentStatus); }}
                  >
                    Update
                  </button>
                )}
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
