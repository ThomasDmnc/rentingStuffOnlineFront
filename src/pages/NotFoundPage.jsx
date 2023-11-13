import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Text, Button } from '@mantine/core';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Automatically redirect to the home page after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        navigate('/');
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, countdown]);

  return (
    <Container size="xs" style={{ height: '100vh' }}>
      <Paper bg="#F2F2F2" padding="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text size="xl" weight={700}>
          404 - Not Found
        </Text>
        <Text size="md">
          The page you are looking for does not exist.
        </Text>
        <Text size="md">
          You will be redirected to the home page in {countdown} seconds.
        </Text>
        <Link mt="2rem" to="/">
          <Button mt="2rem" variant="light">Go to Home</Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
