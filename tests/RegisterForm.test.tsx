import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegisterForm } from '../src/components/register/RegisterForm';
import { AccountType } from '../src/utilities/enums/AccountType'; 
import { RootState } from "../src/App";
import { afterEach, test, describe, expect, vi } from 'vitest';

const mockedUseSelector = vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
}));
  
const mockedUseNavigate = vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

const mockedAxios = vi.mock('axios');

// const mockedUseSelector = useSelector;
// const mockedUseNavigate = useNavigate;
// const mockedAxios = axios;

describe('RegisterForm', () => {
const setup = (role: AccountType) => {
    mockedUseSelector.mockImplementation((selector: (state: RootState) => any) =>
    selector({ authentication: {
        role,
        isLoggedIn: false,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NjU0MzIiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.huxtwqAnpIeolXvB_UJhwg7gkvx7_e6-d2XIqnTdAlc',
        username: 'user1'
    } })
    );
    const navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
    return { navigateMock };
};
  
    afterEach(() => {
        vi.resetAllMocks();
    });
  
    test('renders registration form for customer', () => {
      setup(AccountType.Customer);
  
      render(<RegisterForm />);
  
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    });
  
    test('renders registration form for admin (courier)', () => {
      setup(AccountType.Admin);
  
      render(<RegisterForm />);
  
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/Phone Number/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/Vehicle Capacity/i)).toBeInTheDocument();
    });
  
    test('handles successful customer registration', async () => {
      setup(AccountType.Customer);
  
      render(<RegisterForm />);
  
      const fullNameInput = screen.getByLabelText(/Full Name/i);
      const usernameInput = screen.getByLabelText(/Username/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const phoneNoInput = screen.getByLabelText(/Phone Number/i);
      const submitButton = screen.getByRole('button', { name: /Register/i });
  
      fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.change(phoneNoInput, { target: { value: '91234567' } });
  
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: "Success" },
      });
  
      fireEvent.click(submitButton);
  
      await screen.findByText(/Please enter your registration details/i);
    });
  
    test('handles successful courier registration', async () => {
      setup(AccountType.Admin);
  
      render(<RegisterForm />);
  
      const fullNameInput = screen.getByLabelText(/Full Name/i);
      const usernameInput = screen.getByLabelText(/Username/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const vehicleCapacityInput = screen.getByLabelText(/Vehicle Capacity/i);
      const submitButton = screen.getByRole('button', { name: /Register/i });
  
      fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(usernameInput, { target: { value: 'jane_doe' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.change(vehicleCapacityInput, { target: { value: '500' } });
  
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: "Success", username: 'jane_doe' },
      });
  
      fireEvent.click(submitButton);
  
      await screen.findByText(/Courier jane_doe registered successfully!/i);
    });
  
    test('handles registration failure', async () => {
      setup(AccountType.Customer);
  
      render(<RegisterForm />);
  
      const fullNameInput = screen.getByLabelText(/Full Name/i);
      const usernameInput = screen.getByLabelText(/Username/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const phoneNoInput = screen.getByLabelText(/Phone Number/i);
      const submitButton = screen.getByRole('button', { name: /Register/i });
  
      fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
      fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.change(phoneNoInput, { target: { value: '91234567' } });
  
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: "Failure", message: 'Registration failed' },
      });
  
      fireEvent.click(submitButton);
  
      await screen.findByText(/Registration failed/i);
    });
  });