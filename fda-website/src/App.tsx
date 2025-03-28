import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import theme from './styles/theme';

// Layout Components
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import About from './components/layout/About';
import Dashboard from './components/layout/Dashboard';
import Chatbot from './components/chatbot/Chatbot';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <main>
          <Hero />
          <About />
          <Dashboard />
          <Chatbot />
        </main>
        <Footer />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
