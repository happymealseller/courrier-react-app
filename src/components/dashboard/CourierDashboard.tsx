import { ChangeEvent, useEffect, useState } from "react";
import { RequestHeaderKey } from "../../utilities/enums/RequestHeaderKey";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { config } from "../../utilities/constants/config";
import { axiosInstance } from "../security/axiosInstance";
import { Route, TripDetail } from "./TripDetail";
import { CourierEndpoint } from "../../utilities/enums/Endpoint";
import { TripData } from "./TripData";

export function CourierDashboard() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [inputStatus, setInputStatus] = useState<{ [tripId: string]: TripData["tripStatus"] }>({});
  const username = useSelector((state: RootState) => state.authentication.username);

  function getAddressesBasedOnRouteType(route: string, warehouseAdd: string, partyAdd: string) {
    return route === Route.INBOUND ? { from: partyAdd, to: warehouseAdd }
      : { from: warehouseAdd, to: partyAdd };
  }

  const getTripDetails = async () => {
    config.headers[RequestHeaderKey.Username] = username;
    try {
      const backendRes = await axiosInstance.get(CourierEndpoint.TRIPS, config);
      console.log("[RESPONSE - COURIER_APP backend] REQUEST_URL: ", CourierEndpoint.TRIPS + " | Response: ", backendRes)
      const updatedTrips = backendRes.data.tripDetailsList.map((tripDetails: TripDetail) => {
        const addresses = getAddressesBasedOnRouteType(tripDetails.route, tripDetails.sortingWarehouse.address, tripDetails.partyAddress.address);
        return {
          tripId: tripDetails.tripId,
          tripDate: new Date(tripDetails.tripDate).toLocaleDateString('en-US'),
          from: addresses.from,
          to: addresses.to,
          tripStatus: tripDetails.tripStatus
        }
      })
      setTrips(updatedTrips);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTripDetails();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>, tripId: string) => {
    const chosenStatus = event.target.value;
    setInputStatus({
      ...inputStatus,
      [tripId]: chosenStatus,
    });
  }

  const handleUpdate = async (tripId: string) => {
    try {
      await axiosInstance.put(`/courier/${tripId}`, {
        "tripStatus": inputStatus[tripId],
        "remarks": ""
      }, config);
      await getTripDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold underline mb-5">Courier Dashboard</h2>
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Welcome {username}!
      </h2>
      <div>
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
            {trips.map((tripData, index) => (
              <tr key={tripData.tripId} className={`text-sm text-gray-800 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{tripData.tripId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tripData.tripDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tripData.from}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tripData.to}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${tripData.tripStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {tripData.tripStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tripData.tripStatus !== 'COMPLETED' && (
                    <div className="flex items-center space-x-2">
                      <select
                        value={inputStatus[tripData.tripId]}
                        onChange={(event) => handleChange(event, tripData.tripId)}
                        className="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500 font-semibold"
                      >
                        <option value="" disabled hidden>Select Status</option>
                        <option value="RETRIEVED">Retrieve</option>
                        <option value="COMPLETED">Complete</option>
                      </select>
                      <button
                        disabled={!inputStatus[tripData.tripId]}
                        onClick={() => handleUpdate(tripData.tripId)}
                        className={`px-4 py-2 text-sm bg-blue-500 text-white rounded font-semibold hover:bg-blue-700 ${!inputStatus[tripData.tripId] ? 'opacity-50 cursor-not-allowed' : ''}`}
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