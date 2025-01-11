import React from "react";
import { VStack, Box, Heading, Text } from "@chakra-ui/react";

function BookList({ books }) {
  return (
    <VStack spacing={4} align="stretch">
      <Heading>My Books</Heading>
      {books.map((book) => (
        <Box key={book.id} p={4} bg="white" shadow="sm" borderRadius="md">
          <Heading size="md">{book.title}</Heading>
          <Text color="gray.600">{book.author}</Text>
        </Box>
      ))}
    </VStack>
  );
}

export default BookList;
