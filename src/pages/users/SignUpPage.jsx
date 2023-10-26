import { useState } from 'react';
import { Container, Paper, TextInput, Button, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    console.log('Username:', firstName);
    console.log('Username:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    
    axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
      }
    })
    .then((response) => {
      navigate('/login')
    })
    .catch((err) => {
      const errorDescription = err.response.data.message;
      console.log(errorDescription);
    })
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
          <Button mt="2rem" type="submit" variant="filled">Sign Up</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupPage;