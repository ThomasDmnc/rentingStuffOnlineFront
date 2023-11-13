import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Image,
  TextInput,
  Button,
  FileInput,
  Card,
  Flex,
  Loader,
} from "@mantine/core";
import { AuthContext } from "../../contexts/AuthContext";

const EditUserInformationPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(user.userId);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("imageUrl", file);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/upload/${userId}`,
        formData
      )
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleUpdateImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="20em" />
        </Flex>
      ) : (
        <Grid>
          <Grid.Col span={{ base: 12, xs: 12, md: 4, lg: 4 }} justify="center">
            <Card bg="#F2F2F2" top="1.5em">
              <Card.Section>
                {userData && (
                  <Flex justify="center">
                    <Image
                      src={userData.imageUrl}
                      w={150}
                      h={150}
                      fit="contain"
                      radius="xl"
                      alt={`${userData.firstName} ${userData.lastName}`}
                    />
                  </Flex>
                )}
                <FileInput
                  label="Profile image"
                  placeholder="Click to upload"
                  value={file}
                  onChange={setFile}
                />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 12, md: 8, lg: 8 }}>
            <TextInput
              name="firstName"
              label="First Name"
              mt="1em"
              value={userData?.firstName || ""}
              onChange={handleInputChange}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              mt="1em"
              value={userData?.lastName || ""}
              onChange={handleInputChange}
            />
            <TextInput
              name="email"
              label="Email"
              mt="1em"
              value={userData?.email || ""}
              onChange={handleInputChange}
            />
            <Button mt="1em" variant="filled" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default EditUserInformationPage;
