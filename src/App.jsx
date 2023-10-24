import { useState } from 'react'
import '@mantine/core/styles.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage/ >}/>
      {/* <Route path="/login" element={<LogInPage />}/>
      <Route path="/signup" element={<SignUpPage />}/> */}
    </Routes>
    </>
  )
}

export default App
