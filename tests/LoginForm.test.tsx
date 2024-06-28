import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { LoginForm } from '../src/components/login/LoginForm';
import { AccountType } from '../src/utilities/enums/AccountType'; 
import { CustomerUrl, CourierUrl, AdminUrl } from "../src/utilities/enums/Url"; 
import { afterEach, describe, expect, test, vi } from 'vitest';

const mockedUseDispatch = vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

const mockedUseNavigate = vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

const mockedUseLocation = vi.mock('react-router-dom', () => ({
    useLocation: vi.fn(),
  }));

const mockedAxios = vi.mock('axios');

// const mockedUseNavigate = useNavigate as jest.Mock;
// const mockedUseLocation = useLocation as jest.Mock;
// const mockedUseDispatch = useDispatch as jest.Mock;
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginForm', () => {
  const setup = (state: any = {}) => {
    mockedUseLocation.mockReturnValue({
      state,
    });
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
    const dispatchMock = vi.fn();
    mockedUseDispatch.mockReturnValue(dispatchMock);
    return { navigateMock, dispatchMock };
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('renders login form with prepopulated values', () => {
    const { navigateMock } = setup({ prepopulatedUsername: 'testuser', prepopulatedPassword: 'testpass' });

    render(<LoginForm />);

    expect(screen.getByLabelText(/Username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('testpass');
  });

  test('handles successful customer login', async () => {
    const { navigateMock, dispatchMock } = setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'customeruser' } });
    fireEvent.change(passwordInput, { target: { value: 'Customer123' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: { status: "Success", jwt: 'fake-jwt', role: AccountType.Customer },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(expect.any(Object)); // login action
      expect(navigateMock).toHaveBeenCalledWith(CustomerUrl.DASHBOARD);
    });
  });

  test('handles successful courier login', async () => {
    const { navigateMock, dispatchMock } = setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'courieruser' } });
    fireEvent.change(passwordInput, { target: { value: 'Courier123' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: { status: "Success", jwt: 'fake-jwt', role: AccountType.Courier },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(expect.any(Object)); // login action
      expect(navigateMock).toHaveBeenCalledWith(CourierUrl.DASHBOARD);
    });
  });

  test('handles successful admin login', async () => {
    const { navigateMock, dispatchMock } = setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'adminuser' } });
    fireEvent.change(passwordInput, { target: { value: 'Admin123' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: { status: "Success", jwt: 'fake-jwt', role: AccountType.Admin },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(expect.any(Object)); // login action
      expect(navigateMock).toHaveBeenCalledWith(AdminUrl.DASHBOARD);
    });
  });

  test('handles login failure', async () => {
    setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPass123' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: { status: "Failure", message: 'Invalid credentials' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
