import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  Text,
  Box,
  Input,
  Button,
  Heading,
  Select,
} from "@chakra-ui/react";

function AddBook({ onAddBook }) {
  //Validation state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    status: "To Read", //default status
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const processedBook = {
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      status: bookData.status,
    };

    if (!processedBook.title || !processedBook.author) {
      alert("Please fill out the title and author");
      setIsSubmitting(false);
      return;
    }

    onAddBook(processedBook);
    navigate("/"); // Go back to book list after adding

    //Reset form
    setBookData({ title: "", author: "", status: "To Read" });
    setIsSubmitting(false);
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

          <Box>
            <Text mb={2}>Reading Status</Text>
            <Select
              value={bookData.status}
              onChange={(e) =>
                setBookData({ ...bookData, status: e.target.value })
              }
            >
              <option value="To Read">To Read</option>
              <option value="Reading">Currently Reading</option>
              <option value="Completed">Completed</option>
            </Select>
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
