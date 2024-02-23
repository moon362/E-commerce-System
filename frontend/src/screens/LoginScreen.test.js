import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginScreen from './LoginScreen';

// Mock Redux store
const mockStore = configureStore([]);

describe('LoginScreen Component', () => {
  let store;
  let component;

  beforeEach(() => {
    // Mock Redux store with the initial state
    store = mockStore({
      user: {
        userDetails: null,
        loading: false,
        error: null,
      },
    });

    // Render the LoginScreen component with the mocked Redux store
    component = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('renders the sign-in form', () => {
    const signInHeader = screen.getByText('Sign In', { exact: false });
    expect(signInHeader).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('dispatches login action on form submission', () => {
    // Mock the login function and provide the necessary implementation

    // For example, you can use jest.fn() to create a mock function
    const mockLogin = jest.fn();

    // Replace the real login function with the mock function in the component
    jest.mock('../redux/slices/userSlice', () => ({
      ...jest.requireActual('../redux/slices/userSlice'),
      login: mockLogin,
    }));

    // Re-render the component with the updated login function
    component.rerender(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));

    // Expect the login function to be called
    expect(mockLogin).toHaveBeenCalledTimes(1);

    // Optionally, you can check if the login function was called with the correct arguments
    // For example, you can check if mockLogin was called with the expected email and password
    // expect(mockLogin).toHaveBeenCalledWith(expectedEmail, expectedPassword);
  });
});
