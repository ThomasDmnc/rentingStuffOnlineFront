import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Flex, Container, Paper, Image, Text, Grid, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function UserInformationPage() {
  const { user } = useContext(AuthContext);
  const [userId, setuserId] = useState(user.userId);
  const [userData, setUserData] = useState(null);

  console.log(userId);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`).then((response) => {
      setUserData(response.data);
    });
  }, [user.userId]);

  return (
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
            <Image
              src={userData?.imageUrl || '../src/assets/defaultAvatar.png'}
              width={150}
              height={150}
              alt={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            />
            
            </Container>
            <Container id="form-container">
          
            <Text size="xl">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</Text>
            <Text size="sm" color="gray" style={{ marginBottom: '10px' }}>
              {userData?.email || ''}
            </Text>
            <Link to="/edit-profile">
              <Button variant="filled" style={{ marginTop: '10px' }}>
                Edit Profile
              </Button>
            </Link>
            </Container>
        </Flex>
      </Paper>
    </Container>
  );
}

export default UserInformationPage;
