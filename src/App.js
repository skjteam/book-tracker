import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Container, Button, HStack } from "@chakra-ui/react";
//import { MdBook } from "react-icons/md";
import BookList from "./components/BookList";
import AddBook from "./components/AddBooks";
import EditBook from "./components/EditBook";

function App() {
  //Move books state up to App so it can be shared between components
  const [books, setBooks] = useState([]);
  /*
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      status: "To Read",
    },
  ]);
  */

  //Function to add new book
  const handleAddBook = (newBook) => {
    // ID generation based on date
    newBook.id = Date.now();
    setBooks([...books, newBook]);
  };

  //Function to delete book
  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Function to edit book
  const handleEditBook = (updatedBook) => {
    //Replace matching book with updated book
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <Router>
      <Box minH="100vh" bg="gray.50">
        {/* Navigation */}
        <Box bg="white" py={4} shadow="sm">
          <Container maxW="container.xl">
            <HStack spacing={4}>
              <Link to="/">
                <Button colorScheme="blue" variant="ghost">
                  View Books
                </Button>
              </Link>
              <Link to="/add">
                <Button colorScheme="blue">Add New Book</Button>
              </Link>
            </HStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route
              path="/"
              element={
                <BookList books={books} onDeleteBook={handleDeleteBook} />
              }
            />
            <Route
              path="/add"
              element={<AddBook onAddBook={handleAddBook} />}
            />
            <Route
              path="/edit/:id"
              element={<EditBook books={books} onEditBook={handleEditBook} />}
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
