import React, { createContext, useState } from 'react';
import {
  getCurrentUserAddressLocalStorage,
  getCurrentUserBalanceLocalStorage,
  getCurrentLoginStatusLocalStorage,
  setCurrentUserBalanceLocalStorage,
  setCurrentUserAddressLocalStorage,
  setCurrentLoginStatusLocalStorage,
} from '../utils';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(
    '' || getCurrentUserAddressLocalStorage()
  );
  const [userBalance, setUserBalance] = useState(
    '' || getCurrentUserBalanceLocalStorage()
  );
  const [loginStatus, setLoginStatus] = useState(
    false || getCurrentLoginStatusLocalStorage()
  );

  const handleLoginStatusInCtx = boolean => {
    setLoginStatus(boolean);
    setCurrentLoginStatusLocalStorage(boolean ? true : '');
  };

  const handleUserBalanceInCtx = balance => {
    setCurrentUserBalanceLocalStorage(balance);
    setUserBalance(balance);
  };
  const handleUserAddressInCtx = address => {
    setUserAddress(address);
    setCurrentUserAddressLocalStorage(address);
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        handleLoginStatusInCtx,
        handleUserBalanceInCtx,
        handleUserAddressInCtx,
        userBalance,
        userAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
