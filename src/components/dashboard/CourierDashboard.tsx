import { useEffect, useState } from "react";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { config } from "../../utilities/constants/config";
import { axiosInstance } from "../security/axiosInstance";
import { TripData } from "./TripData";
import { CourierEndpoint } from "../../utilities/enums/Endpoint";


export function CourierDashboard() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [inputStatus, setInputStatus] = useState({});
  const username = useSelector((state: RootState) => state.authentication.username);

  const getTripDetails = async () => {
    config.headers[RequestHeaderKey.Username] = username
    axiosInstance
      .get(CourierEndpoint.TRIPS, config)
      .then((res) => {
        setTrips(res.data?.tripDetailsList.map((tripDetails) => ({
          id: tripDetails.tripId,
          date: new Date(tripDetails.tripDate).toLocaleDateString('en-US'),
          from: tripDetails.sortingWarehouse.address,
          to: tripDetails.partyAddress.address,
          status: tripDetails.tripStatus,
          orderId: tripDetails.orderId,
        })));
        console.log("[RESPONSE - COURIER_APP backend] REQUEST_URL: ",
          CourierEndpoint.TRIPS + " | Response: ", res)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTripDetails();
  }, []);

  const handleChange = (e, tripId) => {
    const chosenStatus = e.target.value;
    console.log(`chosenStatus for trip ${tripId}: ${chosenStatus}`);
    setInputStatus({
      ...inputStatus,
      [tripId]: chosenStatus,
    });
  }

  const handleUpdate = async (id: string) => {
    try {
      console.log(`order id: ${id}`);
      await axiosInstance.put(`/courier/${id}`, {
        "tripStatus": inputStatus[id],
        "remarks": ""
      }, config);
      await getTripDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold underline mb-5">Courier Dashboard</h2>
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Welcome {username}!
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Trip ID</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Trip Date</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Update Trip Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trips.map((e, index) => (
              <tr key={e.id} className={`text-sm text-gray-800 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{e.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{e.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{e.from}</td>
                <td className="px-6 py-4 whitespace-nowrap">{e.to}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    e.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {e.status !== 'COMPLETED' && (
                    <div className="flex items-center space-x-2">
                      <select
                        value={inputStatus[e.id] || ''}
                        onChange={(event) => handleChange(event, e.id)}
                        className="border border-gray-300 rounded px-3 py-1 text-gray-700 focus:outline-none focus:border-blue-500"
                      >
                        <option value="" disabled hidden>Select Status</option>
                        <option value="RETRIEVED">Retrieve</option>
                        <option value="COMPLETED">Complete</option>
                      </select>
                      <button
                        disabled={!inputStatus[e.id]}
                        onClick={() => handleUpdate(e.id)}
                        className={`px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 ${!inputStatus[e.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      </div>
    </div>
  );   
}  
