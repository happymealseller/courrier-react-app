import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { config } from "../../utilities/constants/config";
import { axiosInstance } from "../security/axiosInstance";

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

const allowedStatuses = ["PICKED_UP", "SORTING", "DELIVERING", "DELIVERED"];

export function CourierDashboard() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.authentication.username);

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

  useEffect(() => {
    axiosInstance
      .get("/courier/orders", config) 
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

  const handleStatusUpdate = async (orderId: string) => {
    console.log(config);
    try {
      const response = await axiosInstance.put(`/courier/${orderId}`, {
        status: selectedStatus,
        remarks: 'Status updated by courier',
      }, config);
      // Update status on dashboard
      setOrders(orders.map(order => order.orderId === orderId ? { ...order, currentStatus: selectedStatus } : order));
      setEditingOrderId(null);
      console.log(`Order ${orderId} updated successfully to status: ${selectedStatus}`);
    } catch (error) {
      console.error(`Failed to update order ${orderId}:`, error);
    }
  };

  function handleClick(e: FormEvent) {
    e.preventDefault();
    console.log("Courier assigned to order successfully!");
    navigate("/");
  }

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Courier Dashboard</h1>
      <br />
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">Welcome {username} !</h2>
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
              <td className="border px-5 py-2 border-black" style={{ textAlign: 'center' }}>
                <div className="mb-2">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => navigate('/orders')}
                  >
                    View
                  </button>
                </div>
                {editingOrderId === item.orderId ? (
                  <div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="border-2 rounded-md px-2 mb-2"
                    >
                      <option value="">Select Status</option>
                      {allowedStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded"
                        onClick={() => handleStatusUpdate(item.orderId)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded"
                        onClick={() => setEditingOrderId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2" style={{ width: '130px' }}
                      onClick={() => { setEditingOrderId(item.orderId); setSelectedStatus(item.currentStatus); }}
                    >
                      Update
                    </button>
                  </div>
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
