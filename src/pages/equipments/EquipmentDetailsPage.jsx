import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Badge, Loader, Flex, SimpleGrid, Image, Title, Text, Button, rem } from '@mantine/core';
import { IconBoxSeam } from '@tabler/icons-react';
import { AuthContext } from '../../contexts/AuthContext.jsx'
import CommentGrid from "../../components/CommentGrid.jsx";

function EquipmentDetails() {
    const [ equipment, setEquipment ] = useState();
    const { equipmentId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const icon = <IconBoxSeam style={{ width: rem(12), height: rem(12) }} />;
    const { isLoggedIn } = useContext(AuthContext);
    const [ owner, setOwner ] = useState({});
    const [ comments, setComments ] = useState({})


    const getEquipment = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
        .then((response) => {
            setEquipment(response.data)
            setIsLoading(false)
            setOwner(response.data.ownedBy)
        }).catch((error) => {
            console.log(error)
        })
    };

    const getOwnerComments = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/comments?ownedBy=${owner._id}`)
        .then((response) => {
            setComments(response.data)
        }).catch((err) =>{
            console.log(err)
        })
    };

  useEffect(() => {
    getEquipment();
  }, []);

    useEffect(() => {
        getOwnerComments()
    }, [owner])



    return isLoading ? (<><Loader color="#288BE2" /></>) : (  
        <>
        <SimpleGrid 
            cols={{ base: 1, md: 2, lg: 2 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
            mb={50}
            mt={50}
        >
          <Title order={1} fw={900} c="#288BE2" size="48">
            {equipment.name}
          </Title>
          <Badge
            leftSection={icon}
            variant="light"
            color="#288BE2"
            size="lg"
            radius="md"
            tt="capitalize"
          >
            {equipment.condition}
          </Badge>
          <Title order={4} fw={900}>
            Description:
          </Title>
          <Text>{equipment.description}</Text>
          <Text>{equipment.available}</Text>

          <Button mt={20} variant="filled" color="#288BE2" size="md">
            Make a request
          </Button>
        </Flex>
      </SimpleGrid>
            <Flex
                direction="row"
                align="center"
                justify="start"
                mt={20}
                mb={20}
            >                
                
                <Avatar 
                    h={50}
                    w={50}
                    src={equipment.ownedBy.imageUrl}
                    mr={20}
                />
            <Text fw={600}>{equipment.ownedBy.firstName} {equipment.ownedBy.lastName}</Text>
            </Flex>
            <Text>Has been a member since {equipment.ownedBy.createdAt.substring(0,4)} </Text>
            <Text>Has {equipment.ownedBy.equipment.length} other equipments</Text>
            <Text>Rated: {equipment.ownedBy.comments.length} </Text>
        </section>
        <section>
            <Title mt={20} order={3} fw={900} c="#F9C22E">Comments:</Title>
            { comments.length == 0 ? (
                <>
                    <Text mt={20} mb={20}>
                        No comments added yet.
                    </Text>
                </>
            ): (
                <>
                    <CommentGrid allcomments={comments} />
                </>
            )}
            { isLoggedIn ? (
                <>
                    <Text mt={50}>Did you rented this equipment from {equipment.ownedBy.firstName} {equipment.ownedBy.lastName}?</Text>
                    <Text>Please leave a comment:</Text>
                    <Button component={Link} to={`/createComment?owner=${equipment.ownedBy._id}`} mt={20} variant="filled" color="#288BE2" size="md">Add a comment</Button>
                </>
            ) : ""}
        </section>

        </>
    );
}

export default EquipmentDetails;
