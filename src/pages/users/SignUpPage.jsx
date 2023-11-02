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
  Loader,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { IconX } from "@tabler/icons-react";

function SignupPage() {
  const defaultPorfileUrl =
    "https://res.cloudinary.com/dq06ojue1/image/upload/v1698767929/d9r3dmbpbov77j75rqz0.png";

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(true);
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const [imageLoading, setImageLoading] = useState(false);

  const [emailTaken, setEmailTaken] = useState(false);

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

  useEffect(() => {
    setEmailTaken(false);
  }, [newForm.getInputProps("email").value]);

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
          setEmailTaken(true);
        });
    } else {
      newForm.validate();
      console.log(newForm.errors);
    }
  };

  function uploadImage() {
    const formData = new FormData();
    formData.append("imageUrl", file);
    setImageLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/auth/upload`, formData)
      .then((response) => {
        newForm.setFieldValue("imgUrl", response.data.file);
        setFileUploaded(true);
        setImageLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setImageLoading(false);
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
      <Title order={1} fw={900} c="#288BE2">
        Sign Up
      </Title>
      <Flex wrap="wrap" w="100%" justify="center">
        {imageLoading ? (
          <Loader color="blue" size="10em" />
        ) : (
          <Image
            src={newForm.getInputProps("imgUrl").value}
            h="10em"
            w="10em"
            radius="100"
          />
        )}

        <Flex direction="column" justify="space-evenly">
          <FileInput
            label="Profile picture"
            placeholder="click to upload"
            value={file}
            onChange={setFile}
          />
          <Flex justify="space-evenly">
            <Button mr="1em" onClick={uploadImage}>
              Upload
            </Button>
            <Button onClick={removeImage}>Remove</Button>
          </Flex>
        </Flex>

        <Container w="100%">
          <Paper bg="#F2F2F2" padding="xl">
            <form onSubmit={handleSubmit}>
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                name="firstName"
                mt="1em"
                {...newForm.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                name="lastName"
                mt="1em"
                {...newForm.getInputProps("lastName")}
              />
              <TextInput
                label="Email"
                placeholder="Enter email"
                name="email"
                mt="1em"
                {...newForm.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                name="password"
                mt="1em"
                {...newForm.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Repeat password"
                name="password"
                mt="1em"
                {...newForm.getInputProps("confirmPassword")}
              />
              {file && !fileUploaded && (
                <Notification
                  icon={xIcon}
                  color="red"
                  title="Stop!"
                  mt="1em"
                  withCloseButton={false}
                >
                  Please upload picture before submitting
                </Notification>
              )}
              {emailTaken && (
                <Notification
                  icon={xIcon}
                  color={"red"}
                  title="Uhlala"
                  mt="1em"
                  withCloseButton={false}
                >
                  Seems like this email is already in use
                </Notification>
              )}
              <Button mt="1em" type="submit" variant="filled">
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
