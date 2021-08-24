// localStorage Helper Methods
export const setCurrentUserAddress = userAddress => {
  localStorage.setItem('currentUserAddress', userAddress);
};

export const getCurrentUserAddress = () => {
  return localStorage.getItem('currentUserAddress');
};

export const setCurrentUserBalance = userBalance => {
  localStorage.setItem('currentUserBalance', userBalance);
};

export const getCurrentUserBalance = () => {
  return localStorage.getItem('currentUserBalance');
};

export const setCurrentLoginStatus = loginStatus => {
  localStorage.setItem('currentLoginStatus', loginStatus);
};

export const getCurrentLoginStatus = () => {
  return localStorage.getItem('currentLoginStatus');
};
