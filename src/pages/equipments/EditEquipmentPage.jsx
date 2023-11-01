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
  Loader,
  Radio,
  Group,
  rem,
  Notification,
} from "@mantine/core";

import { IconX } from "@tabler/icons-react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

function EditEquipment() {
  const navigate = useNavigate();

  const defaultImageUrl =
    "https://res.cloudinary.com/dq06ojue1/image/upload/v1698659751/trsfpj0z9irvccspskqu.jpg";

  const { equipmentId } = useParams();

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  const [isLoading, setIsLoading] = useState(true);

  const newForm = useForm({
    initialValues: {
      name: "",
      description: "",
      condition: "",
      categories: [],
      available: "",
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
  const [file, setFile] = useState();
  const [fileUploaded, setFileUploaded] = useState(true);

  useEffect(() => {
    setFileUploaded(false);
  }, [file]);

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

  function removeImage() {
    setImageUrl(defaultImageUrl);
    setFile(null);
    setFileUploaded(true);
  }

  useEffect(() => {
    getEquipment();
  }, []);

  function getEquipment() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
      .then((response) => {
        setImageUrl(response.data.imageUrl);
        newForm.setValues({
          name: response.data.name,
          description: response.data.description,
          condition: response.data.condition,
          categories: response.data.categories,
          available: response.data.available.toString()
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
        imageUrl,
        available,
      };
      console.log(payload);
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`,
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((response) => {
          console.log(response);
          navigate(`/equipments/${equipmentId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      newForm.validate();
      console.log(newForm.errors);
    }
  }

  return isLoading ? (
    <>
      <Flex justify="center" align="center">
        <Loader color="#288BE2" size="20em" />
      </Flex>
    </>
  ) : (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title order={1} fw={900} c="#288BE2" size="52">
        Update Equipment
      </Title>
      <form onSubmit={handleSubmit}>
        <Flex wrap="wrap" justify="center">
          <Card bg="#F2F2F2">
            <Card.Section>
              <Image mt={20}  src={imageUrl} h="8em" radius="md" fit="contain" />
              <FileInput
                label="Equipment image"
                placeholder="Enter Image Url"
                value={file}
                onChange={setFile}
                mt={20} 
              />
              <Button
                mt={20} 
                mr={2}
                variant="filled"
                onClick={() => {
                  uploadImage();
                }}
              >
                Upload
              </Button>
              <Button
              mt={20} 
              mr={2}
                variant="filled"
                onClick={() => {
                  removeImage();
                }}
              >
                Remove
              </Button>
            </Card.Section>
          </Card>
          <Flex ml={20} w="60%" direction="column" id="form-container">
            <TextInput
              label="Name"
              placeholder="Enter Equipment name"
              mt={20} 
              {...newForm.getInputProps("name")}
            />
            <Textarea
              label="Description of your equipment:"
              placeholder="Enter Equipment description"
              mt={20} 
              {...newForm.getInputProps("description")}
            />
            <Group>
              <Select
                label="Condition"
                placeholder="Choose condition"
                data={["poor", "used", "good", "new"]}
                mt={20} 
                mr={4}
                {...newForm.getInputProps("condition")}
              />
              <MultiSelect
                label="Categories"
                w={350}
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
            </Group>
            <Radio.Group
                  name="available"
                  label="Make your equipment ad available:"
                  description="If you're equipment is unavailable it won't be seen by others."
                  mt={20}
                  value={newForm.available}
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
            <Button mt={20} type="submit">Update Equipment</Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

export default EditEquipment;
