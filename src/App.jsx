import '@mantine/core/styles.css';
import { Container } from '@mantine/core';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/users/SignUpPage';
import LoginPage from './pages/users/LogInPage';
import EquipmentDetails from './pages/equipments/EquipmentDetailsPage';
import UserInformationPage from './pages/users/UserInformationPage';
import EditUserInformationPage from './pages/users/EditUserInformationPage';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const containerProps = {
    h: '100vh'
  }
  return (
    <> 
    <Navbar />
    <Container {...containerProps}>
      <Routes>
        <Route path="/" element={<Homepage/ >}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path='/equipments/:equipmentId' element={<EquipmentDetails />} />
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/profile" element=
        {<PrivateRoute>
        <UserInformationPage />
        </PrivateRoute> }/>
        <Route path="/edit-profile" element=
        {<PrivateRoute>
        <EditUserInformationPage />
        </PrivateRoute> }/>
       

      </Routes>
    </Container>
    </>
  )
}

export default App