import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Flex, SimpleGrid, Image, Title } from '@mantine/core';

function EquipmentDetails() {
    const [ equipment, setEquipment ] = useState();
    const { equipmentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const getEquipment = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
        .then((response) => {
            setEquipment(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getEquipment();
    }, []);

    console.log(equipment)
    return isLoading ? (<><Loader color="#288BE2" /></>) : (  
        <>
        <SimpleGrid cols={2} spacing="lg" verticalSpacing="xl">
            <Flex>
                <Image 
                    radius="md"
                    src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
                />
            </Flex>
            <Flex>
                <Title order={1} fw={900}>{equipment.name}</Title>
                <p>{equipment.description}</p>
                <p>{equipment.available}</p>
            </Flex>
        </SimpleGrid>

        </>
    );
}

export default EquipmentDetails;