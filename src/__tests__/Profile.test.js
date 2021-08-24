import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import { AuthProvider } from '../context/auth';
import Profile from '../pages/Profile';

describe('Profile', () => {
  test('should render Profile', () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
  });
});
