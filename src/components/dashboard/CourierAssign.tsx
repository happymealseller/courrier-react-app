import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../security/axiosInstance';

interface LocationState {
  tripId: number;
}

export function CourierAssign() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId } = location.state as LocationState;

  const assignCourier = async () => {
    const hardcodedToken = 'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTgxMTkyNzAsImV4cCI6MTcxODIwNTY3MCwidXNlcm5hbWUiOiJBZG1pbjAwMSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.uYrUU6_6YudRntnl-oOaVJJA7eQTU1Th47Q9oL0Q0sojTvljOR6vm-4ZdFwu5b6q';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hardcodedToken}`,
      },
    };

    const requestBodyAssign = {
      assignedCourierId: 1,
    };

    try {
      await axiosInstance.put(`/admin/trips/assign/${tripId}`, requestBodyAssign, config);
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
      },
    };

    const requestBodyUnassign = {
      assignedCourierId: null,
    };

    try {
      await axiosInstance.put(`/admin/trips/unassign/${tripId}`, requestBodyUnassign, config);
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
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-4"
        onClick={assignCourier}
      >
        Assign Courier
      </button>
      <div className="mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          onClick={unassignCourier}
        >
          Unassign Courier
        </button>
      </div>
    </div>
  );
}