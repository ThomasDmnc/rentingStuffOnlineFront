import '@mantine/core/styles.css';
import { Container } from '@mantine/core';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignupPage from './pages/users/SignUpPage';
import LoginPage from './pages/users/LogInPage';
import EquipmentDetails from './pages/equipments/EquipmentDetailsPage';
import UserListings from './pages/users/UserListingsPage';
import PrivateRoute from './components/PrivateRoute';
import CreateEquipment from "./pages/equipments/CreateEquipmentPage";

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
        <Route path='/equipments/:equipmentId' element={<EquipmentDetails />} />
        <Route
          path="/createEquipment"
          element={
            <PrivateRoute>
              <CreateEquipment />
            </PrivateRoute>
          }
        ></Route>
        
        <Route path="/my-listings" element={
          <PrivateRoute> 
            <UserListings />
          </PrivateRoute>
        }/>
        

        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
    </Container>
    </>
  );
}

export default App;
