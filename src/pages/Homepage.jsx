import { useState, useEffect } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";
import { Title, Flex, Text } from '@mantine/core';

function Homepage() {
    const [equipments, setEquipments] = useState('');


    const getEquipments = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments`)
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
            <section className="banner">
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    mih="40vh"
                >
                <Title order={1} fw={900} c="#288BE2" size="52">Renting Stuff Online</Title>
                <Text mt="2rem" fw={600}>The place where you get what you want</Text>
                </Flex>
            </section>

            <section className="gridCtn">
                <CardGrid allEquipments={equipments} />
            </section>
        </>
    );
}

export default Homepage;