import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Grid, Flex, Text, Badge, Image, Button } from "@mantine/core";
import { useState } from "react";
import { DatesProvider, DateTimePicker, DateInput } from "@mantine/dates";
import { Link } from "react-router-dom";
import axios from "axios";

function SentRequestsGrid({ allSentRequests }) {
  const [requests, setRequests] = useState(allSentRequests);
  
  const handleDeleteRequest = (requestId) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/requests/${requestId}`)
    .then(() =>{
        console.log("It was well destroyed")
    })
    .catch((err) => {
        console.log(err)
    })
  }



  return (
    <>
      {requests.map((request) => {
        return (
          <Grid.Col key={request._id} span={12}>
            <Flex direction="column">
              <Flex direction="column">
                <Text>
                  Request for: {request.equipmentId.name}, owned by{" "}
                  {request.ownerId.firstName} {request.ownerId.lastName}{" "}
                </Text>
                <Flex align="center">
                  <Text mr="10">From:</Text>
                  <DateInput
                    variant="unstyled"
                    value={new Date(request.startDate)}
                    disabled
                  />
                  <Text mr="10">to</Text>
                  <DateInput
                    variant="unstyled"
                    value={new Date(request.endDate)}
                    disabled
                  />
                </Flex>
              </Flex>

              <Flex>
                <Grid>
                    <Grid.Col span={2}>
                    <Image fit="contain" src={request.equipmentId.imageUrl} />
                  </Grid.Col>
                  <Grid.Col span={8}>
                  <Flex direction="column">
                    <Text>
                      Status:
                      <Badge
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

                    <Text>Response from the ownwer:</Text>
                    {!request.responseMessage ? (
                      <Text>No response yet.</Text>
                    ) : (
                      <Text>{request.responseMessage}</Text>
                    )}
                  </Flex>
                  </Grid.Col>
                  <Grid.Col span={2}>
                  <Flex direction="column">
                    <Button component={Link} state={{request: request}} to='/editRequest' >Edit</Button>
                    <Button onClick={() => handleDeleteRequest(request._id)}>Delete</Button>
                  </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Flex>
          </Grid.Col>
        );
      })}
    </>
  );
}

export default SentRequestsGrid;
