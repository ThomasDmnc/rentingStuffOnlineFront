import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Button, TextInput, Title, Text } from "@mantine/core";
import { useState } from "react";
import { DatePicker, Calendar, Month } from "@mantine/dates";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { equipment, owner, requester } = location.state;
  const [ownerId, setownerId] = useState(owner._id);
  const [requesterId, setrequesterId] = useState(requester);
  const [requestMessage, setRequestMessage] = useState("");
  const [dates, setDates] = useState([]);
  const [equipmentId, setEquipmentId] = useState(equipment._id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const startDate = dates[0];
    const endDate = dates[1];
    const payload = {
      ownerId,
      requesterId,
      requestMessage,
      startDate,
      endDate,
      equipmentId
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/requests`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Title order={1} fw={900} c="#288BE2" size="52" mt="5rem" mb="5rem">
        Create your request
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Your message to the owner"
          placeholder="Please write your message here."
          value={requestMessage}
          mb="1rem"
          onChange={(event) => setRequestMessage(event.currentTarget.value)}
        />
        <Text>When do you want to rent the equipment:</Text>
        <DatePicker
          type="range"
          minDate={new Date()}
          placeholder="Pick date"
          label="Event date"
          required
          onChange={(event) => {
            setDates(event);
          }}
        />
        <Button type="submit">Send your request</Button>
      </form>
    </>
  );
}

export default CreateRequest;
