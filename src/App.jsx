import '@mantine/core/styles.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/users/SignUpPage';
import LoginPage from './pages/users/LogInPage';
import EquipmentDetails from './pages/equipments/EquipmentDetailsPage';

function App() {
  return (
    <> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage/ >}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path='/equipments/:equipmentId' element={<EquipmentDetails />} />
      <Route path="/signup" element={<SignupPage />}/>
    </Routes>
    </>
  )
}

export default App