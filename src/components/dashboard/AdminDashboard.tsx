import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { axiosInstance } from "../security/axiosInstance";

/* Admin should be able to do
- filter by trip status (UNASSIGNED, ASSIGNED, RETRIEVED, COMPLETED), region, trip date, type (PICKUP OR DELIVERY)
- update order status INCLUDING order cancelled and others AND remarks
*/

/*
- Add region column add a later date
*/
interface PartyAddress {
  id: number;
  address: string;
  postalCode: string;
  country: string;
  city: string;
}

interface SortingWarehouse {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  country: string;
  city: string;
}

interface Trip {
  tripId: number;
  tripDate: string;
  tripStatus: string;
  route: string;
  partyAddress: PartyAddress;
  sortingWarehouse: SortingWarehouse;
  courierId?: number | null; // Courier ID, which may be null
}

const filterData = (data: any[], keys: any[]) => {
  return data.map((item) => {
    const filteredItem: any = {};
    keys.forEach((key) => {
      filteredItem[key] = key.includes("Date")
        ? item[key] ? format(new Date(item[key]), "yyyy-MM-dd") : "N/A"
        : item[key];
    });
    return filteredItem as Trip;
  });
};

const filterOrdersByStatus = (orders: Trip[], status: string): Trip[] => {
  return status === "All" ? orders : orders.filter(order => order.tripStatus === status);
};

const mapRouteType = (route: string): string => {
  switch (route) {
    case 'INBOUND':
      return 'Pick up';
    case 'OUTBOUND':
      return 'Delivery';
    default:
      return route;
  }
};

const mapTripStatus = (status: string): string => {
  switch (status) {
    case 'UNASSIGNED':
      return 'Unassigned';
    case 'ASSIGNED':
      return 'ASSIGNED';
    case 'RETRIEVED':
      return 'Retrieved';
    case 'COMPLETED':
      return 'Completed';
    default:
      return status;
  }
};

export function AdminDashboard() {
  const [orders, setOrders] = useState<Trip[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Trip[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.authentication.username);

  const order_headers = [
    "Trip ID",
    "Recipient Address",
    "Date of Delivery",
    "Route Type",
    "Trip Status",
    "Courier Name",
  ];

  const displayKeys = [
    "tripId",
    "tripDate",
    "tripStatus",
    "route",
    "partyAddress",
    "courierId",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const hardcodedToken = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTgwMDIyMDcsImV4cCI6MTcxODA4ODYwNywidXNlcm5hbWUiOiJBZG1pbjAwMSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.7SZtPvLahOsdkJZ7ef-IpuOs0OfejRFRaSwty7y_iUoR5zAxXZla5LxOISYOXh7s';
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hardcodedToken}`, // Hardcoded JWT token here
          // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      };
  
      try {
        const response = await axiosInstance.get('/admin/trips', config);
        if (response.data && response.data.trips) {
          const filteredData = filterData(response.data.trips, displayKeys);
          setOrders(filteredData);
          setFilteredOrders(filteredData);
        } else {
          console.log('No trips found in response.');
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    setFilteredOrders(filterOrdersByStatus(orders, selectedStatus));
  }, [selectedStatus, orders]);

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value);
  }

  function handleClick(e: React.FormEvent) {
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
          <option value="UNASSIGNED">Unassigned</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="RETRIEVED">Retrieved</option>
          <option value="COMPLETED">Completed</option>
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
          {filteredOrders.map((trip, index) => (
            <tr key={index} className="bg-white border border-black px-5 py-2 border-solid">
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {trip.tripId}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {trip.partyAddress.address}, {trip.partyAddress.city}, {trip.partyAddress.country}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {trip.tripDate !== "N/A" ? format(new Date(trip.tripDate), "yyyy-MM-dd") : "N/A"}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {mapRouteType(trip.route)}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {mapTripStatus(trip.tripStatus)}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {trip.courierId ?? "N/A"}
              </td>
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
    </div>
  );
}
