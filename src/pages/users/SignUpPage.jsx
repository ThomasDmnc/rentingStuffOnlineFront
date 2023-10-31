import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TextInput,
  Button,
  PasswordInput,
  Flex,
  Image,
  FileInput,
  Title,
  Notification,
  rem,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { IconX } from "@tabler/icons-react";

function SignupPage() {
  const defaultPorfileUrl = "./src/assets/defaultAvatar.png";

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(true);
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  useEffect(() => {
    setFileUploaded(false);
  }, [file]);

  const newForm = useForm({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      imgUrl: defaultPorfileUrl,
    },
    validate: {
      firstName: hasLength(
        { min: 2 },
        "First Name must be at least 2 characters long"
      ),
      lastName: hasLength(
        { min: 2 },
        "Last name must be at least 2 characters long"
      ),
      email: isEmail("Invalid email"),
      password: hasLength(
        { min: 4 },
        "Password needs to be at least 4 characters long"
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newForm.isValid());
    if (newForm.isValid() && ((fileUploaded && file) || !file)) {
      const formData = {
        firstName: newForm.getInputProps("firstName").value,
        lastName: newForm.getInputProps("lastName").value,
        email: newForm.getInputProps("email").value,
        password: newForm.getInputProps("password").value,
        imageUrl: newForm.getInputProps("imgUrl").value,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
        .then((response) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      newForm.validate();
      console.log(newForm.errors);
    }
  };

  function uploadImage() {
    const formData = new FormData();
    formData.append("imageUrl", file);

    axios
      .put(`${import.meta.env.VITE_API_URL}/auth/upload`, formData)
      .then((response) => {
        console.log(response);
        newForm.setFieldValue("imgUrl", response.data.file);
        // setFileUploaded(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    console.log("Uploading image");
  }

  function removeImage() {
    newForm.setFieldValue("imgUrl", defaultPorfileUrl);
    setFile(null);
    setFileUploaded(true);
  }

  return (
    <Flex direction="column" justify="center">
      <Title>Sign Up</Title>
      <Flex wrap="wrap" w="100%" justify="center">
        <Image src={newForm.getInputProps("imgUrl").value} h="10em" />
        <div>
          <FileInput
            label="Profile picture"
            placeholder="click to upload"
            value={file}
            onChange={setFile}
          />
          <Button onClick={uploadImage}>Upload</Button>
          <Button onClick={removeImage}>Remove</Button>
        </div>

        <Container w="100%">
          <Paper bg="#F2F2F2" padding="xl">
            <form onSubmit={handleSubmit}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                {...newForm.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                {...newForm.getInputProps("lastName")}
              />
              <TextInput
                label="Email"
                name="email"
                {...newForm.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                name="password"
                {...newForm.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                name="password"
                {...newForm.getInputProps("confirmPassword")}
              />
              {file && !fileUploaded && (
                <Notification
                  icon={xIcon}
                  color="red"
                  title="Stop!"
                  withCloseButton={false}
                >
                  Please upload picture before submitting
                </Notification>
              )}
              <Button type="submit" variant="filled">
                Sign Up
              </Button>
            </form>
          </Paper>
        </Container>
      </Flex>
    </Flex>
  );
}

export default SignupPage;
