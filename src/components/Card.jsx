import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function EquipmentCard(props) {

  console.log(`/equipements/${props.props._id}`)
    return (
      <>
        <Card key={props.props._id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{props.props.name}</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>
          
          <Link to={`/equipments/${props.props._id}`} >
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Link>
        </Card>
      </>
    );
}

export default EquipmentCard;