import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../src/redux/authentication/authenticationSlice';
import { CourierDashboard } from '../src/components/dashboard/CourierDashboard';
import { describe, assert, it, beforeEach, afterEach, test, expect, vi } from 'vitest';
import axios from 'axios';
import '@testing-library/jest-dom';
import container from 'postcss/lib/container';

vi.mock('axios', () => {
  const mockAxios = {
    get: vi.fn(),
    put: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() }
    },
    create: () => ({
      get: vi.fn(),
      put: vi.fn(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() }
      }
    })
  };
  
  return {
    __esModule: true,
    default: mockAxios
  };
});

const mockAxiosInstance = axios.create();

const renderWithProviders = (ui, { store = configureStore({ reducer: { authentication: authenticationReducer } }) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('CourierDashboard Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders component with initial state', async () => {
    mockAxiosInstance.get = vi.fn().mockReturnValueOnce(
      Promise.resolve({
        data: {
          status: "Success",
          message: "Fetch success",
          tripDetailsList: [
            {
              tripId: '1',
              tripDate: '2023-06-24T00:00:00Z',
              sortingWarehouse: { address: 'Warehouse 1' },
              partyAddress: { address: 'Address 1' },
              tripStatus: 'RETRIEVED',
              route: 'OUTBOUND'
            },
          ],
        },
      }));

    renderWithProviders(<CourierDashboard />);
    expect(screen.getByText(/Courier Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  // test('fetches trip details on mount', async () => {
  //   mockAxiosInstance.get.mockResolvedValueOnce({
  //     data: {
  //       tripDetailsList: [
  //         {
  //           tripId: '1',
  //           tripDate: '2023-06-24T00:00:00Z',
  //           sortingWarehouse: { address: 'Warehouse1' },
  //           partyAddress: { address: 'Address 1' },
  //           tripStatus: 'RETRIEVED',
  //           orderId: '123',
  //         },
  //       ],
  //     },
  //   });

  //   renderWithProviders(<CourierDashboard />);
  //   await waitFor(() => expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1));
  //   expect(screen.getByText(/Warehouse1/i)).toBeInTheDocument();
  // });

  // test('updates input status on select change', () => {
  //   renderWithProviders(<CourierDashboard />);
  //   const select = screen.getAllByRole('combobox')[0];
  //   fireEvent.change(select, { target: { value: 'RETRIEVED' } });
  //   expect(select.value).toBe('RETRIEVED');
  // });

  test('handles update trip status', async () => {
    mockAxiosInstance.get = vi.fn().mockReturnValueOnce(
      Promise.resolve({
      data: {
        tripDetailsList: [
          {
            tripId: '1',
            tripDate: '2023-06-24T00:00:00Z',
            sortingWarehouse: { address: 'Warehouse 1' },
            partyAddress: { address: 'Address 1' },
            tripStatus: 'RETRIEVED',
            route: 'OUTBOUND'
          },
        ],
      },
    }));

    mockAxiosInstance.get = vi.fn().mockReturnValueOnce(
      Promise.resolve({})
    );

    renderWithProviders(<CourierDashboard />);
    await waitFor(() => expect(mockAxiosInstance.get).toHaveBeenCalledTimes(0));

    const select = screen.getByDisplayValue('Retrieve');
    fireEvent.change(select, { target: { value: 'COMPLETED' } });

    const button = screen.getByText('Update');
    fireEvent.click(button);

    await waitFor(() => expect(mockAxiosInstance.put).toHaveBeenCalledTimes(0));
    expect(mockAxiosInstance.put).toHaveBeenCalledWith(`/courier/1`, {
      tripStatus: 'COMPLETED',
      remarks: '',
    }, expect.any(Object));

  })
});
