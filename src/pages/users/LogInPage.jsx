import { useContext, useState } from 'react';
import { Container, Paper, TextInput, Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../contexts/AuthContext.jsx'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    console.log('Username:', email);
    console.log('Password:', password);
    
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, JSON.stringify(formData),{
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": true
      }})
      .then((response) => {
        authenticateUser(response.data.token)
        navigate('/'); 
      })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })

  };

  return (
    <Container size="xs">
      <Paper padding="xl">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email Address"
            name="email"
            value={formData.email}
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
