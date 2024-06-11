import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../security/axiosInstance';

// Trip is assigned to specific courier, cannot chain filters yet
// Currently can only assign, and cannot unassign

export function CourierAssign() {
  const navigate = useNavigate();
  
  const assignCourier = async () => {
    const hardcodedToken = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTgxMTkyNzAsImV4cCI6MTcxODIwNTY3MCwidXNlcm5hbWUiOiJBZG1pbjAwMSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.uYrUU6_6YudRntnl-oOaVJJA7eQTU1Th47Q9oL0Q0sojTvljOR6vm-4ZdFwu5b6q';
  
    const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hardcodedToken}`, // Hardcoded JWT token here
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    };

    const requestBodyAssign = {
    assignedCourierId: 1,
    };

    try {
      await axiosInstance.put('/admin/trips/3', requestBodyAssign, config);
      alert('Courier assigned successfully');
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Error assigning courier:', error);
      alert('Failed to assign courier');
    }
  };

  const unassignCourier = async () => {
    const hardcodedToken = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTgxMTkyNzAsImV4cCI6MTcxODIwNTY3MCwidXNlcm5hbWUiOiJBZG1pbjAwMSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.uYrUU6_6YudRntnl-oOaVJJA7eQTU1Th47Q9oL0Q0sojTvljOR6vm-4ZdFwu5b6q';
  
    const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hardcodedToken}`, // Hardcoded JWT token here
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    };

    const requestBodyUnassign = {
    assignedCourierId: null,
    };

    try {
      await axiosInstance.put('/admin/trips/3', requestBodyUnassign, config);
      alert('Courier unassigned successfully');
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Error unassigning courier:', error);
      alert('Failed to unassign courier');
    }
  };

  return (
    <div className="bg-white p-12 rounded-3xl border-2 border-gray-200">
      <h1 className="text-2xl font-semibold underline underline-offset-1">Assign Courier</h1>
      {/* <div className="mt-4">
        <p><strong>Trip ID:</strong> {trip.tripId}</p>
        <p><strong>Recipient Address:</strong> {trip.partyAddress.address}, {trip.partyAddress.city}, {trip.partyAddress.country}</p>
        <p><strong>Trip Date:</strong> {trip.tripDate}</p>
        <p><strong>Route Type:</strong> {trip.route}</p>
        <p><strong>Trip Status:</strong> {trip.tripStatus}</p>
        <p><strong>Current Courier ID:</strong> {trip.courierId ?? "N/A"}</p>
      </div>
      {trip.tripStatus === 'UNASSIGNED' ? ( */}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-4"
          onClick={() => assignCourier()}
        >
          Assign Courier
        </button>
      {/* ) : ( */}
        <div className="mt-4">
          {/* <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded mr-4"
            onClick={() => assignCourier()} 
          >
            Change Courier
          </button> */}
          {/* <button
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => unassignCourier()}
          >
            Unassign Courier
          </button> */}
        </div>
      {/* )} */}
    </div>
  );
}