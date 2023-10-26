import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from './contexts/AuthContext.jsx';

import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  background: '#F2F2F2',
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Work Sans, sans-serif' },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
)