import React, { useContext } from 'react';
import { Box, chakra, Text, Button, Icon } from '@chakra-ui/react';
import { GiCrownCoin } from 'react-icons/gi';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthContext } from '../context/auth';
import { navigate } from '@reach/router';
const Navbar = () => {
  const {
    loginStatus,
    userAddress,
    handleUserAddressInCtx,
    handleUserBalanceInCtx,
    handleLoginStatusInCtx,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    handleUserAddressInCtx(null);
    handleUserBalanceInCtx(null);
    handleLoginStatusInCtx(false);
    await navigate('/login');
  };

  return (
    <chakra.nav
      display="flex"
      justifyContent="space-between"
      border="1px"
      padding={3}
      borderColor="transparent"
      borderBottomColor="black"
      paddingRight="20px"
    >
      <Icon m="0" p="0" h="3vh" w="3vw" as={GiCrownCoin} />
      <Box display="flex" justifyContent="center" alignItems="center">
        {loginStatus ? (
          <Box
            display="flex"
            justifyContent="space-around"
            width="12vw"
            alignItems="center"
          >
            <Text
              whiteSpace="nowrap"
              fontWeight="bold"
            >{`Welcome ${userAddress}`}</Text>
            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          </Box>
        ) : null}
        <ColorModeSwitcher />
      </Box>
    </chakra.nav>
  );
};

export default Navbar;
