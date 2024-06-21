import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../security/axiosInstance';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';


interface Courier {
  id: number;
  fullName: string;
  vehicleCapacity: number;
}

interface LocationState {
  tripId: number;
}

export function CourierAssign() {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [selectedCourierId, setSelectedCourierId] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId } = location.state as LocationState;
  const username = useSelector((state: RootState) => state.authentication.username);

  useEffect(() => {
    const fetchCouriers = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${username}`,
        },
      };

      try {
        const response = await axiosInstance.get('/courier/couriers', config);
        if (response.data && response.data.couriers) {
          setCouriers(response.data.couriers);
        }
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    };

    fetchCouriers();
  }, [username]);

  const assignCourier = async () => {
    if (selectedCourierId === null) {
      alert('Please select a courier');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${username}`,
      },
    };

    const requestBodyAssign = {
      assignedCourierId: selectedCourierId,
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${username}`,
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
      <div className="mt-4">
        <label htmlFor="courierSelect" className="mr-2">Select Courier:</label>
        <select
          id="courierSelect"
          value={selectedCourierId ?? ""}
          onChange={(e) => setSelectedCourierId(Number(e.target.value))}
          className="border-2 border-gray-300 p-2 rounded-md"
        >
          <option value="" disabled>Select a courier</option>
          {couriers.map((courier) => (
            <option key={courier.id} value={courier.id}>
              {courier.fullName} - Capacity: {courier.vehicleCapacity}
            </option>
          ))}
        </select>
      </div>
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
