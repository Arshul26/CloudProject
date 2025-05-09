// //src/AuthPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Input, Button, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';


// import { Amplify } from 'aws-amplify';
// import amplifyConfig from './amplifyconfiguration.json'; // Or whatever your config file is

// Amplify.configure(amplifyConfig);

// export default function AuthPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleAuth = async () => {
//     try {
//       if (isLogin) {
//         await Auth.signIn(email, password);
//         navigate('/dashboard');
//       } else {
//         await Auth.signUp({
//           username: email,
//           password: password,
//           attributes: { email }
//         });
//         navigate('/create-profile');
//       }
//     } catch (err) {
//       setError(err.message || 'Authentication error');
//     }
//   };

//   return (
//     <Box p={8} maxW="400px" mx="auto" mt="10">
//       <Heading mb={6} textAlign="center">
//         {isLogin ? 'Login' : 'Sign Up'}
//       </Heading>
//       {error && <Text color="red.500" mb={4}>{error}</Text>}

//       <FormControl mb={4}>
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </FormControl>

//       <FormControl mb={4}>
//         <FormLabel>Password</FormLabel>
//         <Input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </FormControl>

//       <Button onClick={handleAuth} width="100%" colorScheme="teal" mb={4}>
//         {isLogin ? 'Login' : 'Sign Up'}
//       </Button>

//       <Text textAlign="center">
//         {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//         <Button
//           variant="link"
//           colorScheme="blue"
//           onClick={() => setIsLogin(!isLogin)}
//         >
//           {isLogin ? 'Sign Up' : 'Login'}
//         </Button>
//       </Text>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';

import { signIn, signUp } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplifyconfiguration.json';

Amplify.configure(amplifyConfig);

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError('');
    try {
      if (isLogin) {
        // Sign in with email and password
        await signIn({ username: email, password });
        navigate('/dashboard');
      } else {
        // Sign up with email and password
        await signUp({
          username: email,
          password,
          attributes: { email },
        });

        // Sign in after successful sign-up
        await signIn({ username: email, password });
        navigate('/create-profile');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication error');
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto" mt="10">
      <Heading mb={6} textAlign="center">
        {isLogin ? 'Login' : 'Sign Up'}
      </Heading>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>

      <Button onClick={handleAuth} width="100%" colorScheme="teal" mb={4}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>

      <Text textAlign="center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => {
            setError('');
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </Text>
    </Box>
  );
}
