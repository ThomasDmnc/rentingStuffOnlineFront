import {
  Flex,
  Container,
  Card,
  Image,
  TextInput,
  Button,
  Title,
  Textarea,
  MultiSelect,
  Select,
  FileInput,
  Notification,
  Radio,
  Group,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

function CreateEquipment() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const defaultImageUrl =
    "https://res.cloudinary.com/dq06ojue1/image/upload/v1698659751/trsfpj0z9irvccspskqu.jpg";

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  const [ownedBy, setOwnedBy] = useState(user.userId);

  const newForm = useForm({
    initialValues: {
      name: "",
      description: "",
      condition: "",
      categories: [],
      available: "true",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name has to be at least 3 characters" : null,
      description: (value) =>
        value.length > 0 && (value.length < 20 || value.length > 150)
          ? "Description needs to be between 20-150 characters"
          : null,
      condition: (value) => (value.length < 1 ? "Choose a condition" : null),

      categories: (value) =>
        value.length < 1 ? "Pick at least one categroy" : null,
    },
  });

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(true);

  useEffect(() => {
    setFileUploaded(false);
  }, [file]);

  function removeImage() {
    setImageUrl(defaultImageUrl);
    setFile(null);
    setFileUploaded(true);
  }

  function uploadImage() {
    const formData = new FormData();
    formData.append("imageUrl", file);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/equipments/upload`, formData)
      .then((response) => {
        console.log(response);
        setImageUrl(response.data.file);
        setFileUploaded(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    console.log("Uploading image");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newForm.isValid() && ((fileUploaded && file) || !file)) {
      const name = newForm.getInputProps("name").value;
      const description = newForm.getInputProps("description").value;
      const condition = newForm.getInputProps("condition").value;
      const categories = newForm.getInputProps("categories").value;
      const available = newForm.getInputProps("available").value;
      const payload = {
        name,
        description,
        condition,
        categories,
        ownedBy,
        imageUrl,
        available,
      };
      console.log(payload);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/equipments`,
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((response) => {
          navigate("/my-listings");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      newForm.validate();
    }
  }

  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title order={1} fw={900} c="#288BE2" size="52">
        Add new Equipment
      </Title>
      <form onSubmit={handleSubmit}>
        <Flex wrap="wrap" justify="center" align="space-between">
          <Card bg="#F2F2F2">
            <Card.Section >
              <Image mt={20}  src={imageUrl} radius="md" fit="contain" h="5rem" />
              <FileInput
                label="Equipment image"
                placeholder="Click to upload"
                value={file}
                onChange={setFile}
                mt={20} 
              />
              <Button mt={20} mr={2} variant="filled" onClick={uploadImage}>
                Upload
              </Button>
              <Button mt={20} mr={2} variant="filled" onClick={removeImage}>
                Remove
              </Button>
            </Card.Section>
          </Card>
          <Container id="form-container">
            <TextInput
              label="Name"
              placeholder="Enter Equipment name"
              withAsterisk
              id="nameInput"
              mt={20} 
              {...newForm.getInputProps("name")}
            />
            <Textarea
              label="Description of your equipment:"
              placeholder="Enter Equipment description"
              id="descriptionInput"
              mt={20} 
              {...newForm.getInputProps("description")}
            />
            <Flex wrap={"wrap"}>
              <Select
                label="Condition"
                placeholder="Choose condition"
                withAsterisk
                id="conditionInput"
                data={["poor", "used", "good", "new"]}
                mt={20} 
                mr={4}
                {...newForm.getInputProps("condition")}
              />
              <MultiSelect
                label="Categories"
                id="categoriesInput"
                withAsterisk
                data={[
                  "Tennis",
                  "Climbing",
                  "Fishing",
                  "Hiking",
                  "Surfing",
                  "Biking",
                  "Skiing",
                ]}
                {...newForm.getInputProps("categories")}
                hidePickedOptions
                searchable
                mt={20} 
              />
            </Flex>
            <Radio.Group
                  name="available"
                  label="Make your equipment ad available:"
                  description="If you're equipment is unavailable it won't be seen by others."
                  mt={20}
                  {...newForm.getInputProps("available")}
              >
                <Group mt="xs">
                  <Radio value="true" label="Available" />
                  <Radio value="false" label="Unvailable" />
                </Group>
              </Radio.Group>
            {file && !fileUploaded && (
              <Notification
                icon={xIcon}
                color="red"
                title="Stop!"
                withCloseButton={false}
              >
                Please upload picture before submitting
              </Notification>
            )}
            <Button mt={20} type="submit">Add Equipment</Button>
          </Container>
        </Flex>
      </form>
    </Flex>
  );
}

export default CreateEquipment;
