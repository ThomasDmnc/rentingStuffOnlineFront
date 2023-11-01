import "@mantine/core/styles.css";
import 'dayjs/locale/de';
import Navbar from "./components/Navbar";
import { Container } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/users/SignUpPage";
import LoginPage from "./pages/users/LogInPage";
import EquipmentDetails from "./pages/equipments/EquipmentDetailsPage";
import UserInformationPage from "./pages/users/UserInformationPage";
import EditUserInformationPage from "./pages/users/EditUserInformationPage";
import UserListings from "./pages/users/UserListingsPage";
import PrivateRoute from "./components/PrivateRoute";
import CreateComment from "./pages/comments/CreateCommentPage";
import UpdateComment from "./pages/comments/UpdateCommentPage";
import CreateEquipment from "./pages/equipments/CreateEquipmentPage";
import EditEquipment from "./pages/equipments/EditEquipmentPage";
import NotFoundPage from './pages/NotFoundPage';
import CreateRequest from "./pages/requests/CreateRequestPage";
import EditRequest from "./pages/requests/EditRequestPage";
import UserRequests from "./pages/users/UserRequestsPage";

function App() {
  const containerProps = {
    h: "100vh",
  };
  return (
    <>
      <Navbar />
      <Container {...containerProps}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/equipments/:equipmentId"
            element={<EquipmentDetails />}
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserInformationPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditUserInformationPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/createComment"
            element={
              <PrivateRoute>
                <CreateComment />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateComment/:commentId"
            element={
              <PrivateRoute>
                <UpdateComment />
              </PrivateRoute>
            }
          />

          <Route
            path="/createEquipment"
            element={
              <PrivateRoute>
                <CreateEquipment />
              </PrivateRoute>
            }
          ></Route>

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

          <Route 
            path="/createRequest"
            element={
                <PrivateRoute>
                  <CreateRequest />
                </PrivateRoute>
            }
          />

          <Route 
            path="/editRequest"
            element={
                <PrivateRoute>
                  <EditRequest />
                </PrivateRoute>
            }
          />
          
          <Route 
            path="/my-requests"
            element={
                <PrivateRoute>
                  <UserRequests />
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
