import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../context/auth';
import { SimpleGrid, Box, Heading, useToast, Spinner } from '@chakra-ui/react';
import { jobcoinAPI } from '../api';
import ProfileSection from '../components/ProfileSection';
import SenderForm from '../components/SenderForm';
import TransactionChart from '../components/TransactionChart';
import TransactionLog from '../components/TransactionLog';

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const [userTransactions, setUserTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  const { loginStatus, userBalance, userAddress } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const fetchAllTransactions = async () => {
      setLoading(true);
      try {
        let user = jobcoinAPI.get(`/addresses/${userAddress}`);
        let allTransactions = jobcoinAPI.get(`/transactions`);
        const response = await Promise.all([user, allTransactions]);
        const { transactions } = await response[0].data;
        const allTransactionsData = await response[1].data;
        setUserTransactions(transactions);
        setAllTransactions(allTransactionsData);
      } catch (e) {
        toast({
          title: e.message,
          position: 'top',
          isClosable: 'true',
          status: 'error',
        });
      }
      setLoading(false);
    };
    fetchAllTransactions();
  }, [toast, userAddress]);

  if (!loginStatus) {
    return <Redirect to="/login" noThrow />;
  }

  return (
    <>
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
              {userBalance}
            </Heading>
          </ProfileSection>
          <ProfileSection title="Send Jobcoin" titleBgColor="slateblue">
            <SenderForm
              setUserTransactions={setUserTransactions}
              setAllTransactions={setAllTransactions}
            />
          </ProfileSection>
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <TransactionLog allTransactions={allTransactions} />
          )}
        </Box>
        <Box mt={['1200px', '1200px', '1200px', '100px']}>
          <TransactionChart graphData={userTransactions} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Profile;
