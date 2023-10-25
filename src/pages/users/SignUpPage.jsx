import { useState } from 'react';
import { Container, Paper, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
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

    const { username, email, password } = formData;

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    
    axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
    .then((response) => {
      navigate('/login')
    })
    .catch((err) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  };

  return (
    <Container size="xs">
      <Paper padding="xl">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
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
            label="Re-Enter Password"
            name="Re-password"
            type="Re-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="filled">Sign Up</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupPage;