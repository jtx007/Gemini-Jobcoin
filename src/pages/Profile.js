import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../context/auth';
import { SimpleGrid, Box, Heading, useToast, Spinner } from '@chakra-ui/react';
import { jobcoinAPI } from '../api';
import SenderForm from '../components/SenderForm';
import TransactionChart from '../components/TransactionChart';
import TransactionLogItem from '../components/TransactionLogItem';
import axios from 'axios';
const Profile = () => {
  const { loginStatus, userBalance, userAddress } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [userTransactions, setUserTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  const toast = useToast();

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    const fetchAllTransactions = async () => {
      setLoading(true);
      try {
        if (!unmounted) {
          let user = jobcoinAPI.get(`/addresses/${userAddress}`, {
            cancelToken: source.token,
          });
          let allTransactions = jobcoinAPI.get(`/transactions`, {
            cancelToken: source.token,
          });
          const response = await Promise.all([user, allTransactions]);
          const { transactions } = await response[0].data;
          const allTransactionsData = await response[1].data;
          setUserTransactions(transactions);
          setAllTransactions(allTransactionsData);
        }
      } catch (e) {
        if (!unmounted) {
          toast({
            title: e.message,
            position: 'top',
            isClosable: 'true',
            status: 'error',
          });
          if (jobcoinAPI.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log('another error happened:' + e.message);
          }
        }
      }
      setLoading(false);
    };
    fetchAllTransactions();
    return function () {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, [toast, userAddress]);

  const renderLogItems = () => {
    return allTransactions.map(transaction => {
      return (
        <TransactionLogItem
          key={transaction.timestamp}
          transaction={transaction}
        />
      );
    });
  };

  return (
    <>
      {loginStatus ? (
        <SimpleGrid
          margin="0 auto"
          width="70vw"
          p={10}
          columns={[1, 1, 2, 2]}
          spacing={10}
        >
          <Box
            width={[null, null, null, '20vw']}
            height="15vh"
            border="1px"
            borderRadius="10px"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="5vh"
              border="1px"
              borderTopRadius="10px"
              bgColor="salmon"
              whiteSpace="nowrap"
              p={5}
            >
              <Heading textAlign="center" fontSize="2xl">
                Jobcoin Balance
              </Heading>
            </Box>
            <Box
              height="10vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Heading textAlign="center" fontSize="2xl">
                {parseInt(userBalance)}
              </Heading>
            </Box>
            <Box border="1px" borderRadius="10px" mt={24}>
              <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                height="5vh"
                border="1px"
                borderTopRadius="10px"
                bgColor="violet"
              >
                <Heading fontSize="xl" textAlign="center">
                  Send Jobcoins
                </Heading>
              </Box>
              <SenderForm setTransactions={setUserTransactions} />
            </Box>
            <Box
              border="1px"
              borderRadius="10px"
              mt={24}
              h="30vh"
              overflow="scroll"
            >
              <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                height="5vh"
                border="1px"
                borderTopRadius="10px"
                bgColor="slateblue"
              >
                <Heading fontSize="xl" textAlign="center">
                  Transaction Log
                </Heading>
              </Box>
              {loading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                />
              )}
              {renderLogItems()}
            </Box>
          </Box>
          <Box>
            <TransactionChart graphData={userTransactions} />
          </Box>
        </SimpleGrid>
      ) : (
        <Redirect to="/login" noThrow />
      )}
    </>
  );
};

export default Profile;
