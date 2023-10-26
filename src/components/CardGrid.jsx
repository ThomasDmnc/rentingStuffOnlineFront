import { Grid, Flex, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentCard from './Card';

function CardGrid({ isUpdate, allEquipments }) {
    const [equipments, setEquipments] = useState();
    console.log(isUpdate)
    useEffect(() => {
        setEquipments(allEquipments)
    })

    return (  
        <Grid gutter="lg"  spacing="lg">
        {equipments && equipments.map((equipment) => {
            return (
                <Grid.Col key={equipment.id} span={{ base: 12, xs:6, md: 3, lg: 3 }}>
                    <EquipmentCard props={equipment} />
                    { isUpdate ? (
                        <>
                            <Flex
                                direction="row"
                                justify="space-evenly"
                                align="center"
                            >
                                <Button component={Link} to={`/equipments/${equipment._id}`} variant="filled" color="#288BE2" fullWidth mt="md" radius="md" mr={2}>Edit</Button>
                                <Button component={Link} to={`/equipments/${equipment._id}`} variant="filled" color="#E01A4F" fullWidth mt="md" radius="md" ml={2} >Delete</Button>
                            </Flex>
                        </>
                    ) : ''}
                </Grid.Col>
            )
        })}
      </Grid>
    );
}

export default CardGrid;