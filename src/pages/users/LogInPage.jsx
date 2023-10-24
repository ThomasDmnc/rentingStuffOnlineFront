import React, { useState } from 'react';
import { Container, Paper, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

   
    console.log('Username:', username);
    console.log('Password:', password);

  
  };

  return (
    <Container size="xs">
      <Paper padding="xl">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="filled">Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
