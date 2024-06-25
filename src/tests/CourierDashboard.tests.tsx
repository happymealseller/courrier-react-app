import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../redux/authentication/authenticationSlice';
import { CourierDashboard } from '../components/dashboard/CourierDashboard';
import { describe, assert, it, beforeEach, afterEach, test, expect, vi } from 'vitest';

// Mock the axios module
vi.mock('axios');

const mockAxiosInstance = {
  get: vi.fn(),
  put: vi.fn(),
};

// Helper function to render the component with Redux store
const renderWithProviders = (ui, { store = configureStore({ reducer: { authentication: authenticationReducer } }) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('CourierDashboard Component', () => {
  beforeEach(() => {
    mockAxiosInstance.get.mockReset();
    mockAxiosInstance.put.mockReset();
  });

  test('renders component with initial state', () => {
    renderWithProviders(<CourierDashboard />);
    expect(screen.getByText(/Courier Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  test('fetches trip details on mount', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        tripDetailsList: [
          {
            tripId: '1',
            tripDate: '2023-06-24T00:00:00Z',
            sortingWarehouse: { address: 'Warehouse 1' },
            partyAddress: { address: 'Address 1' },
            tripStatus: 'RETRIEVED',
            orderId: '123',
          },
        ],
      },
    });

    renderWithProviders(<CourierDashboard />);
    await waitFor(() => expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Warehouse 1/i)).toBeInTheDocument();
  });

  test('updates input status on select change', () => {
    renderWithProviders(<CourierDashboard />);
    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'RETRIEVED' } });
    expect(select.value).toBe('RETRIEVED');
  });

  test('handles update trip status', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        tripDetailsList: [
          {
            tripId: '1',
            tripDate: '2023-06-24T00:00:00Z',
            sortingWarehouse: { address: 'Warehouse 1' },
            partyAddress: { address: 'Address 1' },
            tripStatus: 'RETRIEVED',
            orderId: '123',
          },
        ],
      },
    });

    mockAxiosInstance.put.mockResolvedValueOnce({});

    renderWithProviders(<CourierDashboard />);
    await waitFor(() => expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1));

    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'COMPLETED' } });

    const button = screen.getByText('Update');
    fireEvent.click(button);

    await waitFor(() => expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1));
    expect(mockAxiosInstance.put).toHaveBeenCalledWith(`/courier/123`, {
      tripStatus: 'COMPLETED',
      remarks: '',
    }, expect.any(Object));
  });
});