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
  const [fileUploaded, setFileUploaded] = useState(false);

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
    if (newForm.isValid() && fileUploaded) {
      const name = newForm.getInputProps("name").value;
      const description = newForm.getInputProps("description").value;
      const condition = newForm.getInputProps("condition").value;
      const categories = newForm.getInputProps("categories").value;
      const payload = {
        name,
        description,
        condition,
        categories,
        ownedBy,
        imageUrl,
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
        <Flex wrap="wrap" justify="center">
          <Card>
            <Card.Section>
              <Image src={imageUrl} radius="md" fit="contain" h="5rem" />
              <FileInput
                label="Equipment image"
                placeholder="Click to upload"
                value={file}
                onChange={setFile}
              />
              <Button variant="filled" onClick={uploadImage}>
                Upload
              </Button>
              <Button variant="filled" onClick={removeImage}>
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
              {...newForm.getInputProps("name")}
            />
            <Textarea
              label="description"
              placeholder="Enter Equipment description"
              id="descriptionInput"
              {...newForm.getInputProps("description")}
            />
            <Flex wrap={"wrap"}>
              <Select
                label="Condition"
                placeholder="Choose condition"
                withAsterisk
                id="conditionInput"
                data={["poor", "used", "good", "new"]}
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
              />
            </Flex>
            <Button type="submit">Add Equipment</Button>
            {file && !fileUploaded && (
              <Notification icon={xIcon} color="red" title="Stop!">
                Please upload picture before submitting
              </Notification>
            )}
          </Container>
        </Flex>
      </form>
    </Flex>
  );
}

export default CreateEquipment;
