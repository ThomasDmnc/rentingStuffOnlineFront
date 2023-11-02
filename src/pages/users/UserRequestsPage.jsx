import axios from "axios";
import { Title, Grid, Text, Loader, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SentRequestsGrid from "../../components/SentRequestsGrid";
import ReceivedRequestsGrid from "../../components/ReceivedRequestsGrid";

function UserRequests() {
  const location = useLocation();
  const { user } = location.state;
  const [userId, setUserId] = useState(user.userId);
  const [sentRequests, setSentRequests] = useState();
  const [receivedRequests, setReceivedRequests] = useState();
  const [isLoadingSent, setIsLoadingSent] = useState(true);
  const [isLoadingReceived, setIsLoadingReceived] = useState(true);

  const fetchAllSentRequests = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/requests?requesterId=${userId}`)
      .then((response) => {
        setSentRequests(response.data);
        setIsLoadingSent(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllReceivedRequests = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/requests?ownerId=${userId}`)
      .then((response) => {
        setReceivedRequests(response.data);
        setIsLoadingReceived(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllRequests = () => {
    fetchAllSentRequests();
    fetchAllReceivedRequests();
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);
  console.log(sentRequests);
  return (
    <>
      <Title
        order={1}
        fw={900}
        c="#288BE2"
        size="calc(1.5rem * var(--mantine-scale))"
      >
        Your sent requests:
      </Title>
      {isLoadingSent && (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="5em" />
        </Flex>
      )}
      {!isLoadingSent && (
        <Grid gutter="lg" spacing="lg" mt={0} mb={20}>
          {!sentRequests || sentRequests.length === 0 ? (
            <Grid.Col mt="1em">
              <Text>You didn&apos;t sent any request to rent equipment.</Text>
            </Grid.Col>
          ) : (
            <Grid.Col>
              <SentRequestsGrid allSentRequests={sentRequests} magicFunction={fetchAllRequests}/>
            </Grid.Col>
          )}
        </Grid>
      )}

      <Title
        order={2}
        fw={900}
        c="#288BE2"
        size="calc(1.5rem * var(--mantine-scale))"
      >
        Your received requests:
      </Title>
      {isLoadingReceived && (
        <Flex justify="center" align="center">
          <Loader color="#288BE2" size="5em" />
        </Flex>
      )}
      {!isLoadingReceived && (
        <Grid gutter="lg" spacing="lg" mt={20} mb={20}>
          {!receivedRequests || receivedRequests.length === 0 ? (
            <Grid.Col mt="1em">
              <Text>You didn&apos;t received any request to rent equipment.</Text>
            </Grid.Col>
          ) : (
            <Grid.Col>
              <ReceivedRequestsGrid
                allReceivedRequests={receivedRequests}
                magicFunction={fetchAllRequests}
              />
            </Grid.Col>
          )}
        </Grid>
      )}
    </>
  );
}

export default UserRequests;
