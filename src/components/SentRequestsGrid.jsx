import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Grid, Flex, Text, Badge, Image, Button, Space } from "@mantine/core";
import { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router-dom";
import axios from "axios";

function SentRequestsGrid({ allSentRequests, fetchRequests }) {
  const [requests, setRequests] = useState(allSentRequests);

  useEffect(() => {
    setRequests(allSentRequests);
  }, [allSentRequests]);

  const handleDeleteRequest = (requestId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/requests/${requestId}`)
      .then(() => {
        const newRequests = requests.filter(function (request) {
          return request._id != requestId;
        });
        setRequests(newRequests);
        fetchRequests()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {requests.map((request) => {
        return (
          <Grid.Col key={request._id} span={12}>
            <Grid
              bg="#FFFFFF"
              mt="1em"
              shadow="sm"
              style={{
                borderRadius: "10px",
                border: "1px solid #E8E9EB",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
              }}
              p="2em"
            >
              <Grid.Col span={12}>
                <Flex direction="column" mb="2em">
                  <Text>
                    Request for: {request.equipmentId.name}, owned by{" "}
                    {request.ownerId.firstName} {request.ownerId.lastName}{" "}
                  </Text>
                  <Space h="md" />
                  <Flex direction={{ base: 'column', sm: 'row' }} align={{ base: 'start', sm: 'center' }}>
                    <Text mr="10">From:</Text>
                    <DateInput
                      variant="unstyled"
                      value={new Date(request.startDate)}
                      disabled
                      mr="10"
                    />
                    <Text mr="10">to</Text>
                    <DateInput
                      variant="unstyled"
                      value={new Date(request.endDate)}
                      disabled
                    />
                  </Flex>
                </Flex>
              </Grid.Col>


              <Grid.Col span={12}>
                <Grid>
                  <Grid.Col span={{ base: 4, sm: 2, md: 2, lg: 2 }}>
                    <Image fit="contain" src={request.equipmentId.imageUrl} />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                    <Flex direction="column">
                      <Text>
                        Status:
                        <Badge
                          ml="10"
                          leftSection=""
                          variant="light"
                          color="#288BE2"
                          size="lg"
                          radius="md"
                          tt="capitalize"
                        >
                          {request.status}
                        </Badge>
                      </Text>
                      <Space h="md" />
                      <Text>Response from the owner:</Text>
                      <Space h="sm" />
                      {!request.responseMessage ? (
                        <Text>No response yet.</Text>
                      ) : (
                        <Text>{request.responseMessage}</Text>
                      )}
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 12, md: 2, lg: 2 }}>
                    <Flex direction="column">
                      <Button
                        component={Link}
                        state={{ request: request }}
                        to="/editRequest"
                        mb="1em"
                      >
                        Edit
                      </Button>
                      <Button variant="filled" color="#CA1747" onClick={() => handleDeleteRequest(request._id)}>
                        Delete
                      </Button>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Grid.Col>


            </Grid>
          </Grid.Col>
        );
      })}
    </>
  );
}

export default SentRequestsGrid;
