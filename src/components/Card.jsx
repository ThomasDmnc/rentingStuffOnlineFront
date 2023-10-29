import { Card, Image, Text, Badge, Button, Flex, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconBoxSeam } from '@tabler/icons-react';

function EquipmentCard(props) {
  const icon = <IconBoxSeam style={{ width: rem(12), height: rem(12) }} />;
  console.log(props)
    return (
      <>
        <Card key={props.props._id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={props.props.imageUrl}
              height={160}
              alt="Equipment Image"
            />
          </Card.Section>

          <Flex direction="column" align="start" wrap="wrap" mih="5rem" justify="space-evenly" w="100%" mt="md" mb="xs">
            <Text w="100%" size="md" fw={500}>{props.props.name}</Text>
            <Badge leftSection={icon} variant="light" color="#288BE2" size="lg" radius="md" tt="capitalize">{props.props.condition}</Badge>
          </Flex>
          
            <Button component={Link} to={`/equipments/${props.props._id}`}  variant="light" color="blue" fullWidth mt="md" radius="md">
              More Details
            </Button>
        </Card>
      </>
    );
}

export default EquipmentCard;