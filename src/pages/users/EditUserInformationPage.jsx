import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom'; 
import axios from 'axios';
import { Container, Paper, Image, Text, Grid, TextInput, Button } from '@mantine/core';
import { AuthContext } from '../../contexts/AuthContext';



const EditUserInformationPage = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(user.userId);
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();

  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`).then((response) => {
      setUserData(response.data); 
    });
  }, [userId]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData, 
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedUserData = {
      imageUrl: userData?.imageUrl,
      firstName: userData?.firstName, 
      lastName: userData?.lastName, 
      email: userData?.email, 
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, updatedUserData)
      .then((response) => {
       
        console.log('User data updated successfully');
        navigate('/profile');
      
        
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <Container size="sm">
      <Paper padding="md">
        <Grid gutter="md">
          <Grid.Col span={3}>
            {userData ? (
              <Image src={userData.imageUrl} width={150} height={150} alt={`${userData.firstName} ${userData.lastName}`} />
            ) : null}
          </Grid.Col>
          <Grid.Col span={9}>
            <TextInput
              name="firstName"
              label="First Name"
              value={userData?.firstName || ''} 
              onChange={handleInputChange}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              value={userData?.lastName || ''} 
              onChange={handleInputChange}
            />
            <TextInput
              name="email"
              label="Email"
              value={userData?.email || ''} 
              onChange={handleInputChange}
            />
            <Button variant="filled" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EditUserInformationPage;
