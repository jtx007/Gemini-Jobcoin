import React, { useState, useContext } from 'react';
import { GiCrownCoin } from 'react-icons/gi';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  chakra,
  Heading,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { navigate, Redirect } from '@reach/router';
import { AuthContext } from '../context/auth';
import { jobcoinAPI } from '../api';

const Login = () => {
  const [jobcoinAddress, setJobcoinAddressValue] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    loginStatus,
    handleUserAddressInCtx,
    handleUserBalanceInCtx,
    handleLoginStatusInCtx,
  } = useContext(AuthContext);

  const toast = useToast();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await jobcoinAPI.get(`/addresses/${jobcoinAddress}`);
      const data = await response.data;
      const { balance, transactions } = data;
      if (parseInt(balance) === 0 && transactions.length === 0) {
        toast({
          title: `${jobcoinAddress} does not exist, please enter valid credentials`,
          position: 'top',
          status: 'error',
          isClosable: 'true',
        });
        setLoading(false);
        return;
      }
      handleLoginStatusInCtx(true);
      handleUserAddressInCtx(jobcoinAddress);
      handleUserBalanceInCtx(balance);
      toast({
        title: `${jobcoinAddress} login successful`,
        position: 'top',
        status: 'success',
        isClosable: 'true',
      });
      navigate('/profile');
    } catch (e) {
      toast({
        title: 'Network Error',
        position: 'top',
        status: 'error',
        isClosable: 'true',
      });
    }

    setLoading(false);
  };

  return (
    <>
      {loginStatus ? (
        <Redirect to="/profile" noThrow />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Icon mt="10" as={GiCrownCoin} height="20vh" width="20vw" />

          <chakra.form
            onSubmit={handleLogin}
            border="1px"
            borderRadius="10px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            padding={10}
            mt={10}
            height="35vh"
          >
            <Heading>
              Welcome! Sign In With Your <br /> Jobcoin Address
            </Heading>
            <Box
              height="40vh"
              flexDir="column"
              display="flex"
              justifyContent="space-evenly"
            >
              <FormControl id="jobcoin-address">
                <FormLabel>Jobcoin address</FormLabel>
                <Input
                  type="text"
                  isRequired
                  name="jobcoinAddress"
                  value={jobcoinAddress}
                  onChange={e => setJobcoinAddressValue(e.target.value)}
                  onBlur={e => setJobcoinAddressValue(e.target.value)}
                />
              </FormControl>
              <Button
                isDisabled={jobcoinAddress.length <= 0}
                isLoading={loading}
                type="submit"
                colorScheme="teal"
              >
                Sign In
              </Button>
            </Box>
          </chakra.form>
        </Box>
      )}
    </>
  );
};

export default Login;
