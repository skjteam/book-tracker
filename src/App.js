import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Container, Button, VStack } from "@chakra-ui/react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBooks";

function App() {
  //Move books state up to App so it can be shared between components
  const [books, setBooks] = useState([
    { id: 1, title: "A Tale of Two Cities", author: "Charles Dickens" },
  ]);

  //Function to add new book
  const handleAddBook = (newBook) => {
    // Generate a simple ID
    newBook.id = books.length + 1;
    setBooks([...books, newBook]);
  };

  return (
    <Router>
      <Box minH="100vh" bg="gray.50">
        {/* Navigation */}
        <Box bg="white" py={4} shadow="sm">
          <Container maxW="container.xl">
            <VStack spacing={4}>
              <Link to="/">
                <Button colorScheme="blue" variant="ghost">
                  ViewBooks
                </Button>
              </Link>
              <Link to="/add">
                <Button colorScheme="blue">Add New Book</Button>
              </Link>
            </VStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/" element={<BookList books={books} />} />
            <Route
              path="/add"
              element={<AddBook onAddBook={handleAddBook} />}
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
