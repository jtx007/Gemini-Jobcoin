import React from 'react';
import { render } from '../test-utils';
import App from '../components/App';

describe('App', () => {
  test('should render component', () => {
    render(<App />);
  });
});
