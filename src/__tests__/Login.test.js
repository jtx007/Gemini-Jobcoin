import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import Login from '../pages/Login';
import { AuthProvider } from '../context/auth';

describe('Login', () => {
  test('should render Login', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  });
});
