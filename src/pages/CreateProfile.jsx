// // src/pages/CreateProfile.jsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   VStack,
//   Heading,
//   useToast,
//   Image,
// } from '@chakra-ui/react';
// import Select from 'react-select';
// import { Amplify } from 'aws-amplify';
// import amplifyConfig from '../amplifyconfiguration.json';
// import { uploadData, getUrl } from '@aws-amplify/storage';
// import { getCurrentUser } from 'aws-amplify/auth';

// import { useNavigate } from 'react-router-dom';
// import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

// Amplify.configure(amplifyConfig);

// const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

// const techOptions = [
//   { value: 'React', label: 'React' },
//   { value: 'Node.js', label: 'Node.js' },
//   { value: 'JavaScript', label: 'JavaScript' },
//   { value: 'Python', label: 'Python' },
//   { value: 'CSS', label: 'CSS' },
//   { value: 'HTML', label: 'HTML' },
//   { value: 'AWS', label: 'AWS' },
//   { value: 'Docker', label: 'Docker' },
//   { value: 'Kubernetes', label: 'Kubernetes' },
//   { value: 'MongoDB', label: 'MongoDB' },
//   { value: 'PostgreSQL', label: 'PostgreSQL' },
//   { value: 'GraphQL', label: 'GraphQL' },
//   { value: 'Firebase', label: 'Firebase' },
//   { value: 'GCP', label: 'GCP' },
//   { value: 'Azure', label: 'Azure' },
//   { value: 'Machine Learning', label: 'Machine Learning' },
//   { value: 'Data Science', label: 'Data Science' },
//   { value: 'TensorFlow', label: 'TensorFlow' },
//   { value: 'Django', label: 'Django' },
//   { value: 'Flask', label: 'Flask' },
// ];

// export default function CreateProfile() {
//   const [username, setUsername] = useState('');
//   const [bio, setBio] = useState('');
//   const [hackathons, setHackathons] = useState('');
//   const [techStack, setTechStack] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewPic, setPreviewPic] = useState(null);
//   const toast = useToast();
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setProfilePic(e.target.files[0]);
//       setPreviewPic(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await getCurrentUser();
//       const { username: currentUsername } = user;

//       let profilePicURL = '';

//       if (profilePic) {
//         const fileName = `${currentUsername}_profile_pic`;
//         const fileKey = `profilePictures/${fileName}`;

//         await uploadData({
//           key: fileKey,
//           data: profilePic,
//           options: {
//             contentType: profilePic.type,
//           },
//         });

//         const result = await getUrl({ key: fileKey });
//         profilePicURL = result.url.toString();
//       }

//       const userProfileData = {
//         userId: { S: currentUsername },
//         username: { S: currentUsername || username },
//         bio: { S: bio },
//         hackathons: { S: hackathons },
//         techStack: { SS: techStack.map((s) => s.value) },
//         profilePicURL: { S: profilePicURL },
//       };

//       const params = {
//         TableName: 'Users',
//         Item: userProfileData,
//       };

//       await dynamoClient.send(new PutItemCommand(params));

//       toast({
//         title: 'Profile created successfully!',
//         description: 'Your profile has been saved.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });

//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error creating profile:', error);
//       toast({
//         title: 'Error',
//         description: 'There was an issue saving your profile.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box p={8} maxW="md" mx="auto" mt={10} bg="gray.50" boxShadow="xl" borderRadius="lg">
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={5} align="start">
//           <Heading size="lg" color="teal.600">
//             Create Your Profile
//           </Heading>

//           <FormControl>
//             <FormLabel>Profile Picture</FormLabel>
//             <Input type="file" accept="image/*" onChange={handleImageChange} />
//             {previewPic && (
//               <Image src={previewPic} alt="Preview" boxSize="100px" objectFit="cover" mt={2} rounded="full" />
//             )}
//           </FormControl>

//           <FormControl>
//             <FormLabel>Bio</FormLabel>
//             <Input
//               type="text"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               placeholder="Tell us something about you"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Hackathons (Past Participation)</FormLabel>
//             <Input
//               type="text"
//               value={hackathons}
//               onChange={(e) => setHackathons(e.target.value)}
//               placeholder="Mention any hackathons"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Tech Stack</FormLabel>
//             <Select
//               isMulti
//               options={techOptions}
//               value={techStack}
//               onChange={(selected) => setTechStack(selected)}
//               placeholder="Select your skills"
//             />
//           </FormControl>

//           <Button type="submit" colorScheme="teal" width="full" mt={4}>
//             Save Profile
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   VStack,
//   Heading,
//   useToast,
//   Image,
// } from '@chakra-ui/react';
// import Select from 'react-select';
// import { Amplify } from 'aws-amplify';
// import amplifyConfig from '../amplifyconfiguration.json';
// import { uploadData, getUrl } from '@aws-amplify/storage';
// import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
// import { useNavigate } from 'react-router-dom';
// import { getCurrentUser } from '@aws-amplify/auth'; // Import specific method

// Amplify.configure(amplifyConfig);

// const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

// const techOptions = [
//   { value: 'React', label: 'React' },
//   { value: 'Node.js', label: 'Node.js' },
//   { value: 'JavaScript', label: 'JavaScript' },
//   { value: 'Python', label: 'Python' },
//   { value: 'CSS', label: 'CSS' },
//   { value: 'HTML', label: 'HTML' },
//   { value: 'AWS', label: 'AWS' },
//   { value: 'Docker', label: 'Docker' },
//   { value: 'Kubernetes', label: 'Kubernetes' },
//   { value: 'MongoDB', label: 'MongoDB' },
//   { value: 'PostgreSQL', label: 'PostgreSQL' },
//   { value: 'GraphQL', label: 'GraphQL' },
//   { value: 'Firebase', label: 'Firebase' },
//   { value: 'GCP', label: 'GCP' },
//   { value: 'Azure', label: 'Azure' },
//   { value: 'Machine Learning', label: 'Machine Learning' },
//   { value: 'Data Science', label: 'Data Science' },
//   { value: 'TensorFlow', label: 'TensorFlow' },
//   { value: 'Django', label: 'Django' },
//   { value: 'Flask', label: 'Flask' },
// ];

// export default function CreateProfile() {
//   const [username, setUsername] = useState('');
//   const [bio, setBio] = useState('');
//   const [hackathons, setHackathons] = useState('');
//   const [techStack, setTechStack] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewPic, setPreviewPic] = useState(null);
//   const toast = useToast();
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setProfilePic(e.target.files[0]);
//       setPreviewPic(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Use getCurrentUser from @aws-amplify/auth to get the current authenticated user
//       const user = await getCurrentUser();
//       const { username: currentUsername } = user;

//       let profilePicURL = '';

//       // If a profile picture is selected
//       if (profilePic) {
//         const fileName = `${currentUsername}_profile_pic`;
//         const fileKey = `profilePictures/${fileName}`;

//         // Upload the image to S3
//         await uploadData({
//           key: fileKey,
//           data: profilePic,
//           options: {
//             contentType: profilePic.type,
//           },
//         });

//         // Get the URL of the uploaded image
//         const result = await getUrl({ key: fileKey });
//         profilePicURL = result.url.toString();
//       }

//       // Prepare the user profile data to store in DynamoDB
//       const userProfileData = {
//         userId: { S: currentUsername },
//         username: { S: currentUsername || username },
//         bio: { S: bio },
//         hackathons: { S: hackathons },
//         techStack: { SS: techStack.map((s) => s.value) },
//         profilePicURL: { S: profilePicURL },
//       };

//       const params = {
//         TableName: 'Users',
//         Item: userProfileData,
//       };

//       // Save the profile data to DynamoDB
//       await dynamoClient.send(new PutItemCommand(params));

//       // Show success message
//       toast({
//         title: 'Profile created successfully!',
//         description: 'Your profile has been saved.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });

//       // Redirect to the dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error creating profile:', error);
//       // Show error message
//       toast({
//         title: 'Error',
//         description: 'There was an issue saving your profile.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box p={8} maxW="md" mx="auto" mt={10} bg="gray.50" boxShadow="xl" borderRadius="lg">
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={5} align="start">
//           <Heading size="lg" color="teal.600">
//             Create Your Profile
//           </Heading>

//           <FormControl>
//             <FormLabel>Profile Picture</FormLabel>
//             <Input type="file" accept="image/*" onChange={handleImageChange} />
//             {previewPic && (
//               <Image src={previewPic} alt="Preview" boxSize="100px" objectFit="cover" mt={2} rounded="full" />
//             )}
//           </FormControl>

//           <FormControl>
//             <FormLabel>Bio</FormLabel>
//             <Input
//               type="text"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               placeholder="Tell us something about you"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Hackathons (Past Participation)</FormLabel>
//             <Input
//               type="text"
//               value={hackathons}
//               onChange={(e) => setHackathons(e.target.value)}
//               placeholder="Mention any hackathons"
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Tech Stack</FormLabel>
//             <Select
//               isMulti
//               options={techOptions}
//               value={techStack}
//               onChange={(selected) => setTechStack(selected)}
//               placeholder="Select your skills"
//             />
//           </FormControl>

//           <Button type="submit" colorScheme="teal" width="full" mt={4}>
//             Save Profile
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  useToast,
  Image,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyconfiguration.json';

import { uploadData, getUrl } from '@aws-amplify/storage';
import { getCurrentUser } from '@aws-amplify/auth';

import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { useNavigate } from 'react-router-dom';

// Configure Amplify
Amplify.configure(amplifyConfig);

// Initialize DynamoDB client
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

// Available technology options
const techOptions = [
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'CSS', label: 'CSS' },
  { value: 'HTML', label: 'HTML' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Docker', label: 'Docker' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'Firebase', label: 'Firebase' },
  { value: 'GCP', label: 'GCP' },
  { value: 'Azure', label: 'Azure' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'TensorFlow', label: 'TensorFlow' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
];

export default function CreateProfile() {
  const [bio, setBio] = useState('');
  const [hackathons, setHackathons] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      setPreviewPic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username: currentUsername } = await getCurrentUser();

      let profilePicURL = '';

      if (profilePic) {
        const fileKey = `profilePictures/${currentUsername}_profile_pic`;

        await uploadData({
          key: fileKey,
          data: profilePic,
          options: {
            contentType: profilePic.type,
          },
        });

        const result = await getUrl({ key: fileKey });
        profilePicURL = result.url.toString();
      }

      const userProfileData = {
        userId: { S: currentUsername },
        username: { S: currentUsername },
        bio: { S: bio },
        hackathons: { S: hackathons },
        techStack: { SS: techStack.map((item) => item.value) },
        profilePicURL: { S: profilePicURL },
      };

      const params = {
        TableName: 'Users',
        Item: userProfileData,
      };

      await dynamoClient.send(new PutItemCommand(params));

      toast({
        title: 'Profile created successfully!',
        description: 'Your profile has been saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: 'Error',
        description: 'There was an issue saving your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} bg="gray.50" boxShadow="xl" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={5} align="start">
          <Heading size="lg" color="teal.600">
            Create Your Profile
          </Heading>

          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {previewPic && (
              <Image
                src={previewPic}
                alt="Preview"
                boxSize="100px"
                objectFit="cover"
                mt={2}
                rounded="full"
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us something about you"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Hackathons (Past Participation)</FormLabel>
            <Input
              type="text"
              value={hackathons}
              onChange={(e) => setHackathons(e.target.value)}
              placeholder="Mention any hackathons"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tech Stack</FormLabel>
            <Select
              isMulti
              options={techOptions}
              value={techStack}
              onChange={setTechStack}
              placeholder="Select your skills"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            Save Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
}