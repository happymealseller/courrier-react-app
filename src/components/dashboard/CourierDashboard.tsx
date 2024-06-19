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
    <div className="p-20">
      <h2 className="text-2xl font-semibold underline underline-offset-1 m-5">Courier Dashboard</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">Trip Date</th>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">From</th>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">To</th>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-center text-md text-gray-500 uppercase tracking-wider">Update Trip Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trips.map((e) => (
            <tr key={e.id}>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">{e.id}</td>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">{e.date}</td>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">{e.from}</td>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">{e.to}</td>
              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">{e.status}</td>

              <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                {e.status !== "COMPLETED" &&
                  <div>
                    <select defaultValue={"DEFAULT_STATUS"}
                      onChange={(event) => handleChange(event, e.id)} className="border border-gray-300 rounded px-3 py-1 text-gray-700">
                      <option value="DEFAULT_STATUS" disabled hidden>Select Status</option>
                      <option value="RETRIEVED">Retrieve</option>
                      <option value="COMPLETED">Complete</option>
                    </select>
                    <button
                      disabled={inputStatus[e.id] === undefined}
                      onClick={() => handleUpdate(e.id)}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-100">
                      Update
                    </button>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
