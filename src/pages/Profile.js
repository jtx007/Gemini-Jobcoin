import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../context/auth';
import { SimpleGrid, Box, Heading, useToast, Spinner } from '@chakra-ui/react';
import { jobcoinAPI } from '../api';
import ProfileSection from '../components/ProfileSection';
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
          <Box>
            <ProfileSection
              height="10vh"
              title="Jobcoin Balance"
              titleBgColor="salmon"
            >
              <Heading textAlign="center" fontSize="2xl">
                {parseInt(userBalance)}
              </Heading>
            </ProfileSection>
            <ProfileSection title="Send Jobcoin" titleBgColor="slateblue">
              <SenderForm />
            </ProfileSection>
            <ProfileSection
              title="Transaction Log"
              titleBgColor="teal.200"
              height="25vh"
              overflow="scroll"
            >
              {loading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
              <Box display="flex" flexDir="column" alignItems="center">
                {renderLogItems()}
              </Box>
            </ProfileSection>
          </Box>
          <Box mt={['1200px', '1200px', '1200px', '100px']}>
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
