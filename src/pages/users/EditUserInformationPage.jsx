import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Image, Grid, TextInput, Button,FileInput, Card, Flex } from '@mantine/core';
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

  return  (
    
    <Container size="sm">
    <Paper bg="#F2F2F2" padding="md">
      <Flex
        gap="md"
        justify="space-between"
       align={['center', 'center', 'start']}
        direction={['column', 'column', 'row']}
        wrap="wrap"
       
      >
        <Container id="form-container">
        <Card>
          <Card.Section>
            {userData && (
              <div style={{ marginBottom: '10px' }}>
                <Image
                  src={userData.imageUrl}
                  width={150}
                  height={150}
                  alt={`${userData.firstName} ${userData.lastName}`}
                />
              </div>
            )}
            <FileInput
              label="Profile image"
              placeholder="Click to upload"
              value={file}
              onChange={setFile}
            />
          </Card.Section>
        </Card></Container>

        
        <Container id="form-container">
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
        </Container>
      </Flex>
    </Paper>
  </Container>
    
  );
};

export default EditUserInformationPage;
