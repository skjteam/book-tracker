import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  VStack,
  Box,
  Text,
  Input,
  Button,
  Heading,
  useToast,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { STATUS_OPTIONS } from "../constants";

function EditBook({ books, onEditBook }) {
  const navigate = useNavigate();
  const { id } = useParams(); // get book ID from URL
  const toast = useToast();

  //State for form data
  const [bookData, setBookData] = useState({
    id: "",
    title: "",
    author: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Find and set current book
  useEffect(() => {
    const bookToEdit = books.find((book) => book.id === parseInt(id));
    if (bookToEdit) {
      setBookData(bookToEdit);
      setIsLoading(false);
    } else {
      // If the book isn't found
      toast({
        title: "Book not found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [id, books, navigate, toast]);

  //UI for loading screen
  if (isLoading) {
    return <Spinner size="xl" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditBook(bookData);
    toast({
      title: "Book updated!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading>Edit Book</Heading>
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
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>

          <Button type="submit" colorScheme="blue" width="100%">
            Update Book
          </Button>
          <Button onClick={() => navigate("/")} variant="ghost" width="100%">
            Cancel
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
export default EditBook;
