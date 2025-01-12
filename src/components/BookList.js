import React from "react";
import { VStack, Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

function BookList({ books, onDeleteBook }) {
  return (
    <VStack spacing={4} align="stretch">
      <Heading>My Books</Heading>
      {books.map((book) => (
        <Box key={book.id} p={4} bg="white" shadow="sm" borderRadius="md">
          <HStack justify="space-between">
            <Box>
              <Heading size="md">{book.title}</Heading>
              <Text color="gray.600">{book.author}</Text>
            </Box>
            <HStack spacing={2}>
              <RouterLink to={`/edit/${book.id}`}>
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </RouterLink>
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={() => onDeleteBook(book.id)}
                leftIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}

export default BookList;
