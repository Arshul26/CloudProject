import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, Button, Spinner } from '@chakra-ui/react';
import { get } from '@aws-amplify/api-rest';

export default function HackathonDetails() {
  const { state } = useLocation();
  const [hackathon, setHackathon] = useState(state?.hackathon || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hackathon) {
      fetchHackathonDetails();
    }
  }, [hackathon]);

  const fetchHackathonDetails = async () => {
    setLoading(true);
    try {
      const response = await get({
        apiName: 'yourApiName', // <-- Replace with actual REST API name
        path: '/hackathonDetails',
      });
      setHackathon(response);
    } catch (err) {
      setError('Failed to fetch hackathon details.');
      console.error('Error fetching hackathon details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNow = () => {
    if (hackathon?.['Registration Link']) {
      window.open(hackathon['Registration Link'], '_blank');
    }
  };

  if (loading) return <Spinner size="xl" color="teal.500" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!hackathon) return <Text>No hackathon data available.</Text>;

  return (
    <Box p={8}>
      <Heading mb={4}>{hackathon['Hackathon Name'] || 'Name not available'}</Heading>
      <Text fontWeight="bold">Date: {hackathon['Date'] || 'Not available'}</Text>
      <Text>Location: {hackathon['Location'] || 'Not available'}</Text>
      <Text>Theme: {hackathon['Theme'] || 'Not available'}</Text>
      <Text>Organizer: {hackathon['Organizer'] || 'Not available'}</Text>
      <Text>Prizes: {hackathon['Prizes'] || 'Not available'}</Text>
      {hackathon['Registration Link'] && (
        <Button onClick={handleRegisterNow} colorScheme="blue" mt={4}>
          Register Now
        </Button>
      )}
    </Box>
  );
}
