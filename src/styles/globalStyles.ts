import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #2463ff;
    --primary-dark: #1a47c8;
    --secondary: #ffc107;
    --secondary-dark: #e6ae06;
    --accent: #ff8c00;
    --background-primary: #0f1b3a;
    --background-secondary: #141f3e;
    --text-primary: #ffffff;
    --text-secondary: #bdc3c7;
    --success: #4BB543;
    --warning: #FFD700;
    --danger: #FF6B6B;
    --gray-100: #f8f9fa;
    --gray-300: #dee2e6;
    --gray-500: #adb5bd;
    --gray-700: #495057;
    --gray-900: #212529;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--background-primary);
    color: var(--text-primary);
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--primary);
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--accent);
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.052rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-gradient {
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .highlight {
    color: var(--secondary);
  }

  section {
    padding: 5rem 0;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
  }

  ::selection {
    background: var(--primary);
    color: white;
  }
`;

export default GlobalStyle;