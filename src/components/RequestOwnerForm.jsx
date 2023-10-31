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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestOwnerForm({ requestData, yetAnotherMagicFunction }) {
    const [request, setRequest] = useState(requestData);
    const [acceptation, setAcceptation] = useState("");
    const [answer, setAnswer] = useState("");


    const handleSubmit = () => {
        event.preventDefault()
        const status = acceptation
        const responseMessage = answer
        const payload = {
            responseMessage,
            status
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/requests/${request._id}`, payload, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },})
        .then((response) => {
            console.log(response)
            yetAnotherMagicFunction()
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <>
      <Grid.Col span={12}>
        <Title order={4}>Accept or Decline the request:</Title>
        <form onSubmit={handleSubmit}>
          <Radio.Group
            name="ownerAnswer"
            value={acceptation}
            onChange={setAcceptation}
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="accepted" label="Accept" />
              <Radio value="declined" label="Decline" />
            </Group>
          </Radio.Group>
          <Textarea
            label="Write your answer"
            placeholder="Hello 👋 My equipment is available. Please reach me out to this phone number so we can meet up."
            onChange={ (event) => setAnswer(event.currentTarget.value)}
          />
          <Button type="submit">Send your answer</Button>
        </form>
      </Grid.Col>
    </>
  );
}

export default RequestOwnerForm;
