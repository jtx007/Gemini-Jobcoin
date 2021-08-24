// localStorage Helper Methods
export const setCurrentUserAddressLocalStorage = userAddress => {
  localStorage.setItem('currentUserAddress', userAddress);
};

export const getCurrentUserAddressLocalStorage = () => {
  return localStorage.getItem('currentUserAddress');
};

export const setCurrentUserBalanceLocalStorage = userBalance => {
  localStorage.setItem('currentUserBalance', userBalance);
};

export const getCurrentUserBalanceLocalStorage = () => {
  return localStorage.getItem('currentUserBalance');
};

export const setCurrentLoginStatusLocalStorage = loginStatus => {
  localStorage.setItem('currentLoginStatus', loginStatus);
};

export const getCurrentLoginStatusLocalStorage = () => {
  return localStorage.getItem('currentLoginStatus');
};
