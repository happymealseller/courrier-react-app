import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../security/axiosInstance";

/* Admin should be able to do
- filter by trip status (UNASSIGNED, ASSIGNED, RETRIEVED, COMPLETED), region, trip date, type (PICKUP OR DELIVERY)
- update order status INCLUDING order cancelled and others AND remarks
*/

/*
- Add region column at a later date
- the POST request
  - Should also return Courier details
  - Update trip table to display region as well
*/
interface PartyAddress {
  id: number;
  address: string;
  postalCode: string;
  country: string;
  city: string;
  region: string;
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
  region: string;
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
        : item[key] || "N/A";
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
      return 'Assigned';
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
  const [selectedTripStatus, setSelectedTripStatus] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedTripDate, setSelectedTripDate] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const navigate = useNavigate();
  const username = useSelector((state: any) => state.authentication.username);

  const order_headers = [
    "Trip ID",
    "Recipient Address",
    "Date of Delivery",
    "Route Type",
    "Region",
    "Trip Status",
    // "Courier ID",
  ];

  const displayKeys = [
    "tripId",
    "partyAddress",
    "tripDate",
    "route",
    "region",
    "tripStatus",
    // "courierId",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${username}`,
        },
      };

      const requestBody: { columnKey: string, columnValue: string }[] = [];

      if (selectedTripStatus) {
        requestBody.push({ columnKey: 'tripStatus', columnValue: selectedTripStatus });
      }
      if (selectedRoute) {
        requestBody.push({ columnKey: 'route', columnValue: selectedRoute });
      }
      if (selectedTripDate) {
        requestBody.push({ columnKey: 'tripDate', columnValue: selectedTripDate });
      }
      if (selectedRegion) {
        requestBody.push({ columnKey: 'region', columnValue: selectedRegion });
      }

      try {
        const response = await axiosInstance.post('/admin/trips', requestBody, config);

        if (response.data && response.data.trips) {
          const filteredData = filterData(response.data.trips, displayKeys);
          setOrders(filteredData);
          setFilteredOrders(filteredData);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchData();
  }, [username, selectedTripStatus, selectedRoute, selectedTripDate, selectedRegion]);

  useEffect(() => {
    setFilteredOrders(filterOrdersByStatus(orders, selectedStatus));
  }, [selectedStatus, orders]);

  const handleUpdateClick = (tripId: number) => {
    navigate('/assign', { state: { tripId } });
  };

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Admin Dashboard</h1>
      <br />
      <h2 className="text-lg font-semibold px-4 py-2 text-bright-red">Welcome {username}!</h2>
      <br />
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by trip status:</label>
        <select id="statusFilter" value={selectedTripStatus} onChange={(e) => setSelectedTripStatus(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md">
          <option value="">All</option>
          <option value="UNASSIGNED">Unassigned</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="RETRIEVED">Retrieved</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="routeFilter" className="mr-2">Filter by route type:</label>
        <select id="routeFilter" value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md">
          <option value="">All</option>
          <option value="INBOUND">Pick up</option>
          <option value="OUTBOUND">Delivery</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dateFilter" className="mr-2">Filter by date:</label>
        <input type="date" id="dateFilter" value={selectedTripDate} onChange={(e) => setSelectedTripDate(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="regionFilter" className="mr-2">Filter by region:</label>
        <select id="regionFilter" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md">
          <option value="">All</option>
          <option value="CENTRAL">Central</option>
          <option value="EAST">East</option>
          <option value="WEST">West</option>
          <option value="NORTH">North</option>
          <option value="SOUTH">South</option>
        </select>
      </div>
      <table className="table-auto w-full">
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
                {trip.partyAddress.region}
              </td>
              <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {mapTripStatus(trip.tripStatus)}
              </td>
              {/* <td className="border border-black px-5 py-2 border-solid" style={{ textAlign: 'center' }}>
                {trip.courierId ?? "N/A"}
              </td> */}
              <td className="border px-5 py-2 border-black" style={{ textAlign: "center" }}>
                <div>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2" style={{ width: '130px' }}
                    onClick={() => handleUpdateClick(trip.tripId)}
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
