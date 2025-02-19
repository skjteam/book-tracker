import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

function AuthButtons() {
  const { currentUser, signInWithGoogle, signOut } = useAuth();

  return (
    <HStack>
      {currentUser ? (
        <>
          <Button colorScheme="blue" variant="ghost">
            {currentUser.displayName || "User"}
          </Button>
          <Button colorScheme="red" onClick={signOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button colorScheme="blue" onClick={signInWithGoogle}>
          Sign In with Google
        </Button>
      )}
    </HStack>
  );
}

export default AuthButtons;
