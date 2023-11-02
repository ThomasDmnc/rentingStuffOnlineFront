import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Button, Textarea, Title, Text } from "@mantine/core";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "@mantine/form";

function CreateRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { equipment, owner, requester } = location.state;
  const [ownerId, setownerId] = useState(owner._id);
  const [requesterId, setrequesterId] = useState(requester);
  const [equipmentId, setEquipmentId] = useState(equipment._id);

  const newForm = useForm({
    initialValues: {
      requestMessage: "",
      dates: [],
    },
    validate: {
      requestMessage: (value) => 
        value.length < 20 ? "Your message has to be at least 20 characters" : null,
      dates: (value) =>
        !value[0] && !value[1] ? "YOU MUST HAVE 2 DATES ARE YOU DAFT?" : null, 
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newForm.isValid()){
    const requestMessage = newForm.getInputProps("requestMessage").value
    const dates = newForm.getInputProps("dates").value
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
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      newForm.validate()
    }
  };

  return (
    <>
      <Title order={1} fw={900} c="#288BE2" size="52" mt="5rem" mb="5rem">
        Create your request
      </Title>
      <form onSubmit={handleSubmit}>
        <Textarea
          label="Your message to the owner:"
          placeholder="Please write your message here."
          mb="2em"
          mt="2em"
          {...newForm.getInputProps("requestMessage")}
        />
        <Text>When do you want to rent the equipment:</Text>
        <DatePickerInput
          type="range"
          minDate={new Date()}
          placeholder="Pick date"
          label="Event date"
          required
          mt="2em"
          {...newForm.getInputProps("dates")}
        />
        <Button mt="2em"
        mb="2em" type="submit">Send your request</Button>
      </form>
    </>
  );
}

export default CreateRequest;
