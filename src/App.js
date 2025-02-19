import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Container, Button, HStack } from "@chakra-ui/react";
import { useAuth } from "./contexts/AuthContext";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import AuthButtons from "./components/AuthButtons";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  //authorize current user
  const { currentUser } = useAuth();

  //Move books state up to App so it can be shared between components
  const [books, setBooks] = useState([]);

  //Loading state in preparation for Firebase
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      setBooks([]);
      return;
    }

    const unsubscribe = setBooks(currentUser.uid, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

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
    <AuthProvider>
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
                <AuthButtons />
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
    </AuthProvider>
  );
}

export default App;
