import React from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

function BookList({ books, onDeleteBook }) {
  //status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Currently Reading":
        return "blue";
      case "Finished Reading":
        return "green";
      case "Want To Read":
      default:
        return "gray";
    }
  };
  return (
    <VStack spacing={4} align="stretch">
      <Heading>My Books</Heading>
      {/*Empty State*/}
      {books.length === 0 && (
        <Box
          textAlign="center"
          py={8}
          transition="all 0.2s"
          _hover={{ transform: "translateY(-2px)" }}
        >
          <Text fontSize="xl" color="gray.500">
            No books in your library yet!
          </Text>
          <Button mt={4} as={RouterLink} to="/add" colorScheme="blue">
            Add Your First Book
          </Button>
        </Box>
      )}

      {books.map((book) => (
        <Box key={book.id} p={4} bg="white" shadow="sm" borderRadius="md">
          <HStack justify="space-between">
            <Box>
              <Heading size="md">{book.title}</Heading>
              <Text color="gray.600">{book.author}</Text>
              <Badge colorScheme={getStatusColor(book.status)} mt={2}>
                {book.status}
              </Badge>
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
