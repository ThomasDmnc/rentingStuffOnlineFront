import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter as Router } from "react-router-dom";

import { MantineProvider, createTheme } from '@mantine/core';
const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    
    <Router>
      <App />
    </Router>

    </MantineProvider>
  </React.StrictMode>,
)
