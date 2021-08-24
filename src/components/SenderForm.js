import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { jobcoinAPI } from '../api';
import { AuthContext } from '../context/auth';

const SenderForm = ({ setTransactions }) => {
  const [amountToSend, setAmountToSend] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const { userAddress, handleUserBalance } = useContext(AuthContext);

  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      if (parseInt(amountToSend) <= 0) {
        toast({
          title: 'Please enter a value greater than 0',
          status: 'error',
          position: 'top',
          isClosable: 'true',
        });
        setLoading(false);
        return;
      }
      if (userAddress === receiverAddress) {
        toast({
          title:
            "Can't send jobcoins to yourself, please enter a different receiver",
          status: 'error',
          position: 'top',
          isClosable: 'true',
        });
        setLoading(false);
        return;
      }
      const response = await jobcoinAPI.post('/transactions', {
        fromAddress: userAddress,
        toAddress: receiverAddress,
        amount: amountToSend,
      });
      const data = await response.data;
      toast({
        title: `Coins sent, status ${data.status}`,
        position: 'top',
        isClosable: 'true',
        status: 'success',
      });
      const currentUser = await jobcoinAPI.get(`/addresses/${userAddress}`);
      const userData = await currentUser.data;
      handleUserBalance(userData.balance);
      const transactions = await jobcoinAPI.get('/transactions');
      const transactionData = await transactions.data;
      setTransactions(transactionData);
      setAmountToSend('');
      setReceiverAddress('');
    } catch (e) {
      toast({
        title: e.response.data.error,
        position: 'top',
        isClosable: 'true',
        status: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <chakra.form onSubmit={handleSubmit} mt="5" p={5}>
      <FormControl id="amount-to-send">
        <FormLabel>Amount To Send</FormLabel>
        <Input
          isRequired
          type="number"
          name="amountToSend"
          value={amountToSend}
          onChange={e => setAmountToSend(e.target.value)}
          onBlur={e => setAmountToSend(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Receiver Address</FormLabel>
        <Input
          isRequired
          name="receiverAddress"
          value={receiverAddress}
          onChange={e => setReceiverAddress(e.target.value)}
          onBlur={e => setReceiverAddress(e.target.value)}
        />
      </FormControl>
      <Button isLoading={loading} type="submit" colorScheme="green" mt="5">
        Send Coins
      </Button>
    </chakra.form>
  );
};

export default SenderForm;
