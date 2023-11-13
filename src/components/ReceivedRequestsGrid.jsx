import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import {
  Grid,
  Flex,
  Text,
  Badge,
  Image,
  Button,
  Space,
  Radio,
  Group,
  Textarea,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import RequestOwnerForm from "./RequestOwnerForm";
import axios from "axios";

function ReceivedRequestsGrid({ allReceivedRequests, fetchRequests }) {
  const [requests, setRequests] = useState();

  useEffect(() => {
    setRequests(allReceivedRequests);
  }, [allReceivedRequests]);

  const updateAvailability = (id) => {
    const equipmmentId = id;
    const available = true;
    const payload = { available };
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/equipments/${equipmmentId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {requests &&
        requests.map((request) => {
          return (
            <Grid.Col key={request._id} span={12}>

              <Grid bg="#FFFFFF" mt="1em" shadow="sm" style={{ borderRadius: "10px", border: '1px solid #E8E9EB', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px'}} p="2em">
                <Grid.Col span={12}>
                <Flex direction="column" mb="2em">
                  <Text>
                    Request for: {request.equipmentId.name}, from{" "}
                    {request.requesterId.firstName}{" "}
                    {request.requesterId.lastName}
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
                    <Grid.Col span={2}>
                      <Image fit="contain" src={request.equipmentId.imageUrl} />
                    </Grid.Col>
                    <Grid.Col span={10}>
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
                        <Text>Message from the requester:</Text>
                        <Space h="sm" />
                        {!request.requestMessage ? (
                          <Text>No resquest message.</Text>
                        ) : (
                          <Text>{request.requestMessage}</Text>
                        )}
                      </Flex>
                    </Grid.Col>
                    {request.status === "pending" ? (
                      <RequestOwnerForm
                        requestData={request}
                        fetchAllRequests={fetchRequests}
                      />
                    ) : null}
                    <Grid.Col>
                      {request.status === "accepted" ? (
                        <Button
                          onClick={() =>
                            updateAvailability(request.equipmentId._id)
                          }
                        >
                          Make your equipment availabe
                        </Button>
                      ) : null}
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

export default ReceivedRequestsGrid;
