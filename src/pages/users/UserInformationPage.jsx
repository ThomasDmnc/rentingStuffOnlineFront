import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Flex,
  Container,
  Paper,
  Image,
  Text,
  Grid,
  Button,
  Loader,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function UserInformationPage() {
  const { user } = useContext(AuthContext);
  const [userId, setuserId] = useState(user.userId);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(userId);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      });
  }, [user.userId]);

  return (
    <>
      {isLoading ? (
        <Flex direction="column" justify="center" align="center" h="90%">
          <Loader color="blue" size="10rem" />
        </Flex>
      ) : (
        <Container size="sm">
          <Paper bg="#F2F2F2" padding="md">
            <Flex
              mih={50}
              gap="md"
              justify="flex-start"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Flex direction="column" align="center">
                <Image
                  src={userData?.imageUrl || "../src/assets/defaultAvatar.png"}
                  width={150}
                  height={150}
                  alt={`${userData?.firstName || ""} ${
                    userData?.lastName || ""
                  }`}
                />
                <Link to="/edit-profile">
                  <Button variant="filled" style={{ marginTop: "10px" }}>
                    Edit Profile
                  </Button>
                </Link>
              </Flex>
              <Flex direction="column" gap="xs">
                <Text size="xl">{`${userData?.firstName || ""} ${
                  userData?.lastName || ""
                }`}</Text>
                <Text size="sm" color="gray" style={{ marginBottom: "10px" }}>
                  {userData?.email || ""}
                </Text>
              </Flex>
            </Flex>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default UserInformationPage;
