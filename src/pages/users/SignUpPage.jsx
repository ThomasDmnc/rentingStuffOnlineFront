import { useState } from 'react';
import { Container, Paper, TextInput, Button, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    imgUrl: '', 
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, imgUrl } = formData;

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Image URL:', imgUrl);

   
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
      .then((response) => {
        navigate('/login');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        console.log(errorDescription);
      });
  };

  return (
    <Container  size="xs">
      <Paper  bg="#F2F2F2" padding="xl">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextInput
            label="Image URL" 
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleInputChange}
          />
          <FileInput
                label="Equipment image"
                placeholder="Enter Image Url"
                value={file}
                onChange={setFile}
              />
              <Button variant="filled" onClick={uploadImage}>
                Upload
              </Button>
          <Button type="submit" variant="filled">
            Sign Up
          </Button>

          

        </form>
      </Paper>
    </Container>
  );
}

export default SignupPage;
