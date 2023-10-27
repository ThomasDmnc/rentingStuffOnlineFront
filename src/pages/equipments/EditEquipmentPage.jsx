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
} from "@mantine/core";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditEquipment() {
  const navigate = useNavigate();

  const { equipmentId } = useParams();

  const [imageUrl, setImageUrl] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [categories, setCategories] = useState();

  const [isLoading, setIsLoading] = useState(true);

  function uploadImage() {
    //Upload on cloudymoudy and set imageUrl to cloud Url
    console.log("Uploading image");
  }

  useEffect(() => {
    getEquipment();
  }, []);

  function getEquipment() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setCondition(response.data.condition);
        setCategories(response.data.categories);
        setImageUrl(response.data.imageUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      name,
      description,
      imageUrl,
      condition,
      categories,
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
  }

  return isLoading ? (
    <>
      <Loader color="#288BE2" />
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
          <Card>
            <Card.Section>
              <Image src={imageUrl} w="10em" h="10em" radius="md" />
              <FileInput
                label="Equipment image"
                placeholder="Enter Image Url"
              />
              <Button variant="filled" onClick={uploadImage}>
                Upload
              </Button>
            </Card.Section>
          </Card>
          <Container id="form-container">
            <TextInput
              label="Name"
              placeholder="Enter Equipment name"
              value={name}
              onChange={(event) => {
                setName(event.currentTarget.value);
              }}
            />
            <Textarea
              label="description"
              placeholder="Enter Equipment description"
              value={description}
              onChange={(event) => {
                setDescription(event.currentTarget.value);
              }}
            />
            <Flex wrap={"wrap"}>
              <Select
                label="Condition"
                placeholder="Choose condition"
                data={["poor", "used", "good", "new"]}
                value={condition}
                onChange={setCondition}
              />
              <MultiSelect
                label="Categories"
                data={[
                  "Tennis",
                  "Climbing",
                  "Fishing",
                  "Hiking",
                  "Surfing",
                  "Biking",
                  "Skiing",
                ]}
                value={categories}
                onChange={setCategories}
                hidePickedOptions
                searchable
              />
            </Flex>
            <Button type="submit">Update Equipment</Button>
          </Container>
        </Flex>
      </form>
    </Flex>
  );
}

export default EditEquipment;
