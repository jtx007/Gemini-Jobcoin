import { Box, Text } from '@chakra-ui/react';

import React from 'react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { fromAddress, toAddress, amount } = payload[0].payload;
    return (
      <Box p={2} border="1px" bgColor="whiteAlpha.400">
        <Text>{`From: ${fromAddress ? fromAddress : 'From Bank'}`}</Text>
        <Text>{`To: ${toAddress}`}</Text>
        <Text>{`Amount: ${amount}`}</Text>
      </Box>
    );
  }

  return null;
};

const TransactionChart = ({ graphData }) => {
  return (
    <Box
      mt={['null', '1100px', '1100px', '10px']}
      mr={['1000px', '1000px', '0', '0']}
    >
      <LineChart
        width={800}
        height={500}
        data={graphData}
        margin={{ right: 100 }}
      >
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </Box>
  );
};

export default TransactionChart;
