import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';

const TransactionLogItem = ({ transaction }) => {
  const { amount, fromAddress, toAddress, timestamp } = transaction;
  return (
    <Box p={5} bg="whiteAlpha.100" border="1px">
      <Text>{`From ${
        fromAddress ? fromAddress : 'Jobcoin Bank'
      } to ${toAddress} with ${amount} coins at ${format(
        new Date(timestamp),
        'MM-dd-yyyy hh:mm:s:a'
      )}`}</Text>
    </Box>
  );
};

export default TransactionLogItem;
