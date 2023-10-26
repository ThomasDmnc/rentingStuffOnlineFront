import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Paper, Image, Text, Grid, Button } from '@mantine/core';
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
      <Paper padding="md">
        <Grid gutter="md">
          <Grid.Col span={3}>
            <Image src={userData?.imgUrl || '../src/assets/defaultAvatar.png'} width={150} height={150} alt={`${userData?.firstName || ''} ${userData?.Lastname || ''}`} />
          </Grid.Col>
          <Grid.Col span={9}>
            <Text size="xl">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</Text>
            <Text size="sm" color="gray" style={{ marginBottom: '10px' }}>{userData?.email || ''}</Text>
            <Link to="/edit-profile">
              <Button variant="filled">Edit Profile</Button>
            </Link>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserInformationPage;
