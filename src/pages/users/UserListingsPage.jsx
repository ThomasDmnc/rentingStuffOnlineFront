import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { Flex, Title, Text, Button, Burger, Menu, rem } from '@mantine/core';
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
            console.log(response.data)
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
            <section>
                <Flex
                        direction="column"
                        align="start"
                        justify="center"
                        mih="10vh"
                >
                    <Title order={1} fw={900} c="#288BE2" size="48">My Equiments</Title>
                </Flex>
            </section>
            <section className="gridCtn">
                <CardGrid props={equipments} />
            </section>
        </>
    );
}

export default UserListings;