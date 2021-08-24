import React, { createContext, useState, useEffect } from 'react';
import { jobcoinAPI } from '../api';
import {
  getCurrentUserAddress,
  getCurrentUserBalance,
  getCurrentLoginStatus,
  setCurrentUserBalance,
  setCurrentUserAddress,
  setCurrentLoginStatus,
} from '../utils';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState('' || getCurrentUserAddress());
  const [userBalance, setUserBalance] = useState('' || getCurrentUserBalance());
  const [loginStatus, setLoginStatus] = useState(
    false || getCurrentLoginStatus()
  );

  const handleLoginStatus = boolean => {
    setLoginStatus(boolean);
    setCurrentLoginStatus(boolean ? true : '');
  };

  const handleUserBalance = balance => {
    setCurrentUserBalance(balance);
    setUserBalance(balance);
  };
  const handleUserAddress = address => {
    setUserAddress(address);
    setCurrentUserAddress(address);
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        handleLoginStatus,
        handleUserAddress,
        handleUserBalance,
        userBalance,
        userAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
