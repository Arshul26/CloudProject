import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Stack, Tag, TagLabel, Button, Spinner, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import Navbar from '../components/Navbar';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyconfiguration.json'; // Or whatever your config file is

Amplify.configure(amplifyConfig);
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' }); // Set your region

export default function ProfileDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser(); // Get the current authenticated user
        if (user) {
          const { username } = user;

          // Fetch data from DynamoDB
          const params = {
            TableName: 'Users', // Replace with your DynamoDB table name
            Key: {
              userId: { S: username }, // Use the username as the partition key
            },
          };

          const command = new GetItemCommand(params);
          const data = await dynamoClient.send(command);

          if (data.Item) {
            setUserData({
              username: data.Item.username.S,
              bio: data.Item.bio.S,
              hackathons: data.Item.hackathons.S,
              techStack: data.Item.techStack.SS, // Assumes tech stack is a string set
              profilePicURL: data.Item.profilePicURL.S,
            });
          } else {
            setError('Profile not found');
          }
        } else {
          setError('You are not logged in');
        }
      } catch (error) {
        console.error('Error fetching profile: ', error);
        setError('There was an issue fetching your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <Heading mb={6}>Your Profile</Heading>

        <VStack spacing={4} align="start">
          <Box>
            <Text fontWeight="bold">Bio:</Text>
            <Text>{userData.bio || 'No bio provided'}</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={1}>Tech Stack:</Text>
            <Stack direction="row" wrap="wrap" gap={2}>
              {userData.techStack && userData.techStack.map((tech, i) => (
                <Tag key={i} colorScheme="blue" variant="solid" borderRadius="full">
                  <TagLabel>{tech}</TagLabel>
                </Tag>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="bold">Past Hackathons:</Text>
            <Text>{userData.hackathons || 'None mentioned'}</Text>
          </Box>

          {/* Add the edit profile button */}
          <Link to="/profile-edit">
            <Button colorScheme="blue" mt={4}>Edit Profile</Button>
          </Link>
        </VStack>
      </Box>
    </>
  );
}
