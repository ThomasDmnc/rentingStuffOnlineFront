import { Card, Image, Text, Badge, Button, Group, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconBoxSeam } from '@tabler/icons-react';

function EquipmentCard(props) {
  const icon = <IconBoxSeam style={{ width: rem(12), height: rem(12) }} />;

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
            <Badge leftSection={icon} variant="light" color="#288BE2" size="lg" radius="md" tt="capitalize">{props.props.condition}</Badge>
          </Group>
          
            <Button component={Link} to={`/equipments/${props.props._id}`}  variant="light" color="blue" fullWidth mt="md" radius="md">
              More Details
            </Button>
        </Card>
      </>
    );
}

export default EquipmentCard;