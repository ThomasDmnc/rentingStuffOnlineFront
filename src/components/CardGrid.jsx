import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import EquipmentCard from './Card';

function CardGrid(props) {
    const [equipments, setEquipments] = useState();
    
    useEffect(() => {
        setEquipments(props.props)
    })

    return (  
        <Grid gutter="lg"  spacing="lg">
        {equipments && equipments.map((equipment) => {
            return (
                <Grid.Col key={equipment.id} span={{ base: 12, xs:6, md: 3, lg: 3 }}>
                    <EquipmentCard props={equipment} />
                </Grid.Col>
            )
        })}
      </Grid>
    );
}

export default CardGrid;