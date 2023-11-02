import "dayjs/locale/de";
import "@mantine/dates/styles.css";
import { Button, Textarea, Title, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

function EditRequest() {
    const location = useLocation()
    const navigate = useNavigate()
    const { request } = location.state

    const newForm = useForm({
      initialValues: {
        requestMessage: request.requestMessage,
        dates: [new Date(request.startDate), new Date(request.endDate)],
      },
      validate: {
        requestMessage: (value) => 
          value.length < 20 ? "Your message has to be at least 20 characters" : null,
        dates: (value) =>
          !value[0] && !value[1] ? "YOU MUST HAVE 2 DATES ARE YOU DAFT?" : null, 
      }
    })

    const handleSubmit = (event) =>{
        event.preventDefault()

        if (newForm.isValid()){
        const requestMessage = newForm.getInputProps("requestMessage").value
        const dates = newForm.getInputProps("dates").value
        const startDate = dates[0];
        const endDate = dates[1];

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
        .then(() => {
            navigate(-1)
        })
        .catch((err) => {
            console.log(err)
        })
      } else {
        newForm.validate()
      }
    }

    return (
      <>
      <Title order={1} fw={900} c="#288BE2" size="52" mt="5rem" mb="5rem">
        Edit your request
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
        mb="2em" type="submit">Edit your request</Button>
      </form>
    </>
    );
}

export default EditRequest;