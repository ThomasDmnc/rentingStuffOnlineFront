import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Image, Grid, TextInput, Button } from '@mantine/core';
import { AuthContext } from '../../contexts/AuthContext';

const EditUserInformationPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(user.userId);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

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
    
    const formData = new FormData();
    formData.append('imageUrl', file);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/user/upload/${userId}`, formData)
      .then((response) => {
        console.log('User data updated successfully');
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const handleUpdateImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  
  

  return (
    <Container size="sm">
      <Paper padding="md">
        <Grid gutter="md">
          <Grid.Col span={3}>
            {userData ? (
              <div>
                <Image
                  src={userData.imageUrl}
                  width={150}
                  height={150}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
                <input type="file" accept="image/*" onChange={handleUpdateImage} />
                
              </div>
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
