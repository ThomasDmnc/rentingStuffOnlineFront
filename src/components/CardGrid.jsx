import { SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import EquipmentCard from './Card';

function CardGrid(props) {
    const [equipments, setEquipments] = useState();
    
    useEffect(() => {
        setEquipments(props.props)
    })

    return (  
        <SimpleGrid cols={4} spacing="lg">
        {equipments && equipments.map((equipment) => {
            return (
                <EquipmentCard key={equipment.id} props={equipment} />
            )
        })}
      </SimpleGrid>
    );
}

export default CardGrid;