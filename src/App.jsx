
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


import UserListings from './pages/users/UserListingsPage';
import PrivateRoute from './components/PrivateRoute';
import CreateComment from './pages/comments/CreateCommentPage';
import CreateEquipment from "./pages/equipments/CreateEquipmentPage";
import EditEquipment from "./pages/equipments/EditEquipmentPage";

import NotFoundPage from './pages/NotFoundPage';


function App() {
  const containerProps = {
    h: "100vh",
  };
  return (
    <> 
    <Navbar />
    <Container {...containerProps}>
      <Routes>
        <Route path="/" element={<Homepage/ >}/>
        <Route path='/equipments/:equipmentId' element={<EquipmentDetails />} />

         <Route path="/profile" element=
        {<PrivateRoute>
        <UserInformationPage />
        </PrivateRoute> }/>
        <Route path="/edit-profile" element=
        {<PrivateRoute>
        <EditUserInformationPage />
        </PrivateRoute> }/>


        <Route path="/createComment" element={
          <PrivateRoute> 
            <CreateComment />
          </PrivateRoute>
        }/>
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

          <Route
            path="/editEquipment/:equipmentId"
            element={
              <PrivateRoute>
                <EditEquipment />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/my-listings"
            element={
              <PrivateRoute>
                <UserListings />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Container>

    </>
  );
}

export default App;
