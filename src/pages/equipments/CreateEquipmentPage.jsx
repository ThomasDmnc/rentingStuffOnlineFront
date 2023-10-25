import {
  Flex,
  Container,
  Card,
  Image,
  TextInput,
  Button,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";

function CreateEquipment() {
  const form = useForm({
    initialValues: {
      imageUrl: "../src/assets/equipmentPlaceholder.jpg",
      name: "",
      description: "",
      condition: "",
      categories: [],
    },
  });

  console.log(form);

  function uploadImage() {}

  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="nowrap"
    >
      <Title order={1} fw={900} c="#288BE2" size="52">
        Add new Equipment
      </Title>
      <form action="">
        <Flex>
          <Card>
            <Card.Section>
              <Image
                src={form.getInputProps("imageUrl").value}
                w="10em"
                h="10em"
                radius="md"
              />
            </Card.Section>
            <TextInput label="Image Url" placeholder="Enter Image Url" />
            <Button variant="filled" onClick={uploadImage}>
              Upload
            </Button>
          </Card>
          <Container id="form-container">
            <TextInput label="" />
          </Container>
        </Flex>
      </form>
    </Flex>
  );
}

export default CreateEquipment;
