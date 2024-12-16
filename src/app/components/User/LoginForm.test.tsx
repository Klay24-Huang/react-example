import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm'; // Adjust the import path as needed
import { useLoginForm } from '@/app/hooks/user/useLoginForm';

// Mock the `useLoginForm` hook as a Jest function
jest.mock('@/app/hooks/user/useLoginForm', () => ({
  useLoginForm: jest.fn(),
}));

describe('LoginForm', () => {
  it('renders the form with email and password fields', () => {
    // Mock the hook's return values for this test
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: null,
      fieldErrors: {},
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<LoginForm useLoginForm={useLoginForm()} />);  // Pass mocked hook result

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('shows error message when email field is invalid', () => {
    // Mock the hook to simulate an invalid email
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: null,
      fieldErrors: { email: 'Invalid email' },
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<LoginForm useLoginForm={useLoginForm()} />);  // Pass mocked hook result

    // Check for the error message
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows error message when password field is invalid', () => {
    // Mock the hook to simulate an invalid password
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: null,
      fieldErrors: { password: 'Password is required' },
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<LoginForm useLoginForm={useLoginForm()} />);  // Pass mocked hook result

    // Check for the error message
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('calls handleSubmit when the form is submitted', () => {
    // Mock the hook to simulate a form submission
    const handleSubmitMock = jest.fn();
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: null,
      fieldErrors: {},
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleSubmit: handleSubmitMock,
    });

    render(<LoginForm useLoginForm={useLoginForm()} />);  // Pass mocked hook result

    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);

    // Verify that the handleSubmit function was called
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('displays a general error message if there is an error', () => {
    // Mock the hook to simulate a general error
    (useLoginForm as jest.Mock).mockReturnValue({
      email: '',
      password: '',
      error: 'Invalid credentials',
      fieldErrors: {},
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<LoginForm useLoginForm={useLoginForm()} />);  // Pass mocked hook result

    // Check for the error message
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
