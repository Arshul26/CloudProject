// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyconfiguration.json';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button, Spinner, Center, Image } from '@chakra-ui/react';
import Layout from '../components/Layout';
Amplify.configure(amplifyConfig);

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const { username } = user.attributes;
        setUsername(username);
        // You can replace this with fetching profile data from DynamoDB or GraphQL
      } catch (error) {
        console.error('Error fetching user profile: ', error);
        navigate('/create-profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <Center h="80vh">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box maxW="3xl" mx="auto" mt={10} p={6} bg="gray.50" rounded="xl" shadow="lg">
        <VStack spacing={6} align="start">
          <Box display="flex" justifyContent="center" mb={4}>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={profilePicURL || 'default-profile-pic-url'}
              alt="Profile Picture"
              objectFit="cover"
            />
          </Box>
          <Heading size="xl" color="teal.500">
            Welcome, {username}!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Glad to have you onboard! 🎉
          </Text>

          <Button colorScheme="teal" size="lg" width="full" mt={4} onClick={() => navigate('/hackathon-explorer')}>
            Explore Hackathons
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}
