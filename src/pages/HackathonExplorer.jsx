// src/pages/HackathonExplorer.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Box, Heading, Text, Button, Stack, Spinner, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const S3_CSV_URL = 'https://teamforgedata.s3.us-east-1.amazonaws.com/2025_hackathons_updated.csv';

export default function HackathonExplorer() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(S3_CSV_URL)
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setHackathons(results.data);
            setLoading(false);
          },
          error: (error) => {
            setError('Error parsing CSV data');
            setLoading(false);
            console.error("CSV Parsing Error:", error);
          }
        });
      })
      .catch(error => {
        setError('Error loading CSV');
        setLoading(false);
        console.error("Error loading CSV:", error);
      });
  }, []);

  const handleViewDetails = (hackathon) => {
    navigate('/hackathon-details', { state: { hackathon } });
  };

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="80vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <>
      <Navbar />
      <Box p={8}>
        <Heading mb={6}>Upcoming Hackathons</Heading>
        <Stack spacing={6}>
          {hackathons.length === 0 ? (
            <Text>No hackathons available.</Text>
          ) : (
            hackathons.map((hackathon, idx) => (
              <Box key={idx} p={4} shadow="md" borderWidth="1px" borderRadius="lg">
                <Text fontWeight="bold">{hackathon['Hackathon Name'] || 'Name not available'}</Text>
                <Text>Date: {hackathon['Date'] || 'Not available'}</Text>
                <Text>Location: {hackathon['Location'] || 'Not available'}</Text>
                <Button onClick={() => handleViewDetails(hackathon)} colorScheme="blue">View Details</Button>
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </>
  );
}
