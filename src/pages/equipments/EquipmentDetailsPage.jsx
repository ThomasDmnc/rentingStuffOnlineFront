import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Loader, Flex, SimpleGrid, Image, Title, Text, Button, rem } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';

function EquipmentDetails() {
    const [ equipment, setEquipment ] = useState();
    const { equipmentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const icon = <IconBoxSeam style={{ width: rem(12), height: rem(12) }} />;

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
        <SimpleGrid 
            cols={{ base: 1, md: 2, lg: 2 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
            mb={50}
            mt={50}
        >
            <Flex>
                <Image 
                    radius="md"
                    src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
                />
            </Flex>
            <Flex
                direction='column'
                align="start"
                justify="space-evenly"
                mih="30rem"
            >
                <Title order={1} fw={900} c="#288BE2" size="48">{equipment.name}</Title>
                <Badge leftSection={icon} variant="light" color="#288BE2" size="lg" radius="md" tt="capitalize">{equipment.condition}</Badge>
                <Title order={4} fw={900} >Description:</Title>
                <Text>{equipment.description}</Text>
                <Text>{equipment.available}</Text>
                
                <Button mt={20} variant="filled" color="#288BE2" size="md">Make a request</Button>
            </Flex>
        </SimpleGrid>

        <section>
        <Title order={3} fw={900} c="#288BE2">About the Owner:</Title>

            <Flex
                direction="row"
                align="center"
                justify="start"
            >                
                
                <Image 
                    radius="md"
                    h={100}
                    w={100}
                    src={equipment.OwnedBy.imageUrl}
                    mr={20}
                />
            <Text fw={600}>{equipment.OwnedBy.firstName} {equipment.OwnedBy.lastName}</Text>
            </Flex>
            <Text>Has been a member since {equipment.OwnedBy.createdAt.substring(0,4)} </Text>
            <Text>Has {equipment.OwnedBy.equipment.length} other equipments</Text>
            <Text>Rated: {equipment.OwnedBy.comments.length} </Text>
        </section>
        <section>
            <Title mt={20} order={3} fw={900} c="#F9C22E">Comments:</Title>

        </section>

        </>
    );
}

export default EquipmentDetails;