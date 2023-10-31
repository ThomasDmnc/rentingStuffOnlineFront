import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Button, TextInput, Title, Text } from "@mantine/core";
import { useState } from "react";
import { DatePicker, Calendar, Month } from "@mantine/dates";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditRequest() {
    const location = useLocation()
    const navigate = useNavigate()
    const { request } = location.state
    const [requestMessageData, setRequestMessageData] = useState(request.requestMessage);
    const [dates, setDates] = useState([]);

    const handleSubmit = (event) =>{
        event.preventDefault()
        const startDate = dates[0];
        const endDate = dates[1];
        const requestMessage = requestMessageData
        const payload = {
            requestMessage,
            startDate,
            endDate
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/requests/${request._id}`, payload, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },})
        .then((response) => {
            console.log(response)
            navigate(-1)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
      <Title order={1} fw={900} c="#288BE2" size="52" mt="5rem" mb="5rem">
        Edit your request
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Your message to the owner"
          placeholder="Please write your message here."
          value={requestMessageData}
          onChange={(event) => setRequestMessageData(event.currentTarget.value)}
          mb="1rem"
        />
        <Text>When do you want to rent the equipment:</Text>
        <DatePicker
          type="range"
          minDate={new Date()}
          placeholder="Pick date"
          label="Event date"
          required
          value={dates}
          onChange={(event) => setDates(event)}
        />
        <Button type="submit">Create your comment</Button>
      </form>
        </>
    );
}

export default EditRequest;