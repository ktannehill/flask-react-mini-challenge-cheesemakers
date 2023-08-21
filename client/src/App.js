import React from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Link,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Link as RouteLink, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Home from './components/Home';
import ProducerDetail from './components/ProducerDetail';
import CheeseForm from './components/CheeseForm';
import CheeseEdit from './components/CheeseEdit';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
      >
        <Grid
          minH="100vh"
          p={3}
        >
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Link
              as={RouteLink}
              to="/"
            >
              <Heading
                as="h1"
                size="3xl"
              >
                CheeseBook
              </Heading>
            </Link>

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/producers/:id/cheeses/new"
                element={<CheeseForm />}
              />
              <Route
                path="/producers/:id/cheeses/:cheeseId/edit"
                element={<CheeseEdit />}
              />
              <Route
                path="/producers/:id"
                element={<ProducerDetail />}
              />
            </Routes>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
