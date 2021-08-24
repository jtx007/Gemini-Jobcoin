import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import TransactionLogItem from './TransactionLogItem';

const TransactionLog = ({ allTransactions }) => {
  const renderLogItems = () => {
    return allTransactions
      .slice(0)
      .reverse()
      .map(transaction => {
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
      <Box
        mt={24}
        width={[null, null, '30vw', '20vw']}
        border="1px"
        textAlign="center"
        borderTopRadius="10px"
      >
        <Heading
          whiteSpace="nowrap"
          fontSize="2xl"
          bgColor="teal.500"
          p={5}
          borderTopRadius="10px"
        >
          Transaction Log
        </Heading>
        <Box
          height="20vh"
          width={[null, null, '30vw', '20vw']}
          overflowY="scroll"
          border="1px"
        >
          {renderLogItems()}
        </Box>
      </Box>
    </>
  );
};

export default TransactionLog;
