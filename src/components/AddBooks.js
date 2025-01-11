import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Text, Box, Input, Button, Heading } from "@chakra-ui/react";

function AddBook({ onAddBook }) {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(bookData);
    navigate("/"); // Go back to book list after adding
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading>Add New Book</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Box>
            <Text mb={2}>Title</Text>
            <Input
              value={bookData.title}
              onChange={(e) =>
                setBookData({ ...bookData, title: e.target.value })
              }
              placeholder="Enter book title"
              required
            />
          </Box>

          <Box>
            <Text mb={2}>Author</Text>
            <Input
              value={bookData.author}
              onChange={(e) =>
                setBookData({ ...bookData, author: e.target.value })
              }
              placeholder="Enter author name"
              required
            />
          </Box>

          <Button type="submit" colorScheme="blue" width="100%">
            Add Book
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default AddBook;
