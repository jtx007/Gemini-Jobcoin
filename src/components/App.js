import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Router, Redirect } from '@reach/router';
import { AuthProvider } from '../context/auth';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Layout from './Layout';
import theme from '../theme';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Router>
            <Redirect from="/" to="/login" noThrow />
            <Login path="/login" />
            <Profile path="/profile" />
          </Router>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
