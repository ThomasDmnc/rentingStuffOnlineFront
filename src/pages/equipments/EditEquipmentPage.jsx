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

import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEquipment() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { equipmentId } = useParams();
  const [equipment, setEquipment] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState();

  function uploadImage() {
    //Upload on cloudymoudy and set imageUrl to cloud Url
    console.log("Uploading image");
  }

  function getEquipment() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmentId}`)
      .then((response) => {
        setEquipment(response.data);
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
      ownedBy,
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
        Add new Equipment
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
