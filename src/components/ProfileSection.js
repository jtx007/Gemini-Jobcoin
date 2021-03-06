import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const ProfileSection = ({ title, titleBgColor, children }) => {
  return (
    <Box
      width={[null, null, null, '20vw']}
      border="1px"
      borderRadius="10px"
      mt={24}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderTopRadius="10px"
        bgColor={titleBgColor}
        whiteSpace="nowrap"
        p={5}
      >
        <Heading textAlign="center" fontSize="2xl">
          {title}
        </Heading>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" p={5}>
        {children}
      </Box>
    </Box>
  );
};

export default ProfileSection;
