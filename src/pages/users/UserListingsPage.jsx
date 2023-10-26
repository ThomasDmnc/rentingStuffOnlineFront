import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { Flex, Title, Group, Text, Button, Burger, Menu, rem } from '@mantine/core';
import CardGrid from '../../components/CardGrid.jsx';

function UserListings() {
    const [equipments, setEquipments] = useState();
    const { 
        isLoggedIn,
        logOutUser,
        user
      } = useContext(AuthContext);

      const [userId, setuserId] = useState(user.userId);

      const getEquipments = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments?OwnedBy=${userId}`)
        .then((response) =>{
            setEquipments(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getEquipments()
    }, []);

    return (
        <>
            <Group grow mt="5vh">
                <Flex
                        direction="column"
                        align="start"
                        justify="center"
                        mih="10vh"
                >
                    <Title order={1} fw={900} c="#288BE2" size="48">My Equiments</Title>
                    <Text mt="1rem">Manage all your equipments from here</Text>
                </Flex>
            </Group>
            <Group grow mt="5vh" className="gridCtn">
                <CardGrid allEquipments={equipments} isUpdate={true} />
            </Group>
            <Group grow mt="5vh">
                <Button component={Link} to={'/'} variant="filled" color="#F9C22E" mt="md" radius="md" mr={2}>Add a new Equipment</Button>
            </Group>
        </>
    );
}

export default UserListings;