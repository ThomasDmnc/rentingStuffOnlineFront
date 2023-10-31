import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import {
  Grid,
  Flex,
  Text,
  Badge,
  Image,
  Button,
  Title,
  Radio,
  Group,
  Textarea
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import RequestOwnerForm from "./RequestOwnerForm";
import axios from "axios";

function ReceivedRequestsGrid({ allReceivedRequests, magicFunction }) {
    const [requests, setRequests] = useState();

    useEffect(() =>{
        setRequests(allReceivedRequests)
    }, [allReceivedRequests]) 

    const updateAvailability = (id) =>{
      const equipmmentId = id
      const available = true;
      const payload = {available}
      axios.put(`${import.meta.env.VITE_API_URL}/api/equipments/${equipmmentId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },})
          .then((response) => {
              console.log(response)
          })
          .catch((error) =>{
              console.log(error)
           })
  }

  

  return (
    <>
      { requests && requests.map((request) => {
        return (
          <Grid.Col key={request._id} span={12}>
            <Flex direction="column">
              <Flex direction="column">
                <Text>
                  Request for: {request.equipmentId.name}, from{" "}
                  {request.requesterId.firstName} {request.requesterId.lastName}
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
                  <Grid.Col span={10}>
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

                      <Text>Message from the requester:</Text>
                      {!request.requestMessage ? (
                        <Text>No resquest message.</Text>
                      ) : (
                        <Text>{request.requestMessage}</Text>
                      )}
                    </Flex>
                  </Grid.Col>
                  {request.status === "pending" ? (<RequestOwnerForm requestData={request}  yetAnotherMagicFunction={magicFunction} />) : null }
                  <Grid.Col>
                  {request.status === "accepted" ? (<Button onClick={() => updateAvailability(request.equipmentId._id)}>Make your equipment availabe again</Button>) : null }
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

export default ReceivedRequestsGrid;
