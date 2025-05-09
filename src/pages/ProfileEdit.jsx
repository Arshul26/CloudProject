const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let profilePicURL = previewPic;

    if (profilePic) {
      const fileName = `${username}_profile_pic`;
      const fileKey = `profilePictures/${fileName}`;

      await uploadData({
        key: fileKey,
        data: profilePic,
        options: {
          contentType: profilePic.type,
        },
      });

      const { url } = await getUrl({ key: fileKey });
      profilePicURL = url;
    }

    const params = {
      TableName: 'Users',
      Key: {
        userId: { S: username },
      },
      UpdateExpression:
        'SET bio = :bio, hackathons = :hackathons, techStack = :techStack, profilePicURL = :profilePicURL',
      ExpressionAttributeValues: {
        ':bio': { S: bio },
        ':hackathons': { S: hackathons },
        ':techStack': { SS: techStack.map((skill) => skill.value) },
        ':profilePicURL': { S: profilePicURL },
      },
    };

    const command = new UpdateItemCommand(params);
    await dynamoClient.send(command);

    toast({
      title: 'Profile updated successfully!',
      description: 'Your profile has been updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/dashboard');
  } catch (error) {
    console.error('Error updating profile: ', error);
    toast({
      title: 'Error',
      description: 'There was an issue updating your profile.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@chakra-ui/react';
// import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
// import { Auth } from '@aws-amplify/auth';  // Correct import from @aws-amplify/auth

// const ProfileEdit = () => {
//   const [bio, setBio] = useState('');
//   const [hackathons, setHackathons] = useState('');
//   const [techStack, setTechStack] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewPic, setPreviewPic] = useState(null);
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if the user is authenticated
//       const user = await Auth.currentAuthenticatedUser();
//       if (!user) {
//         // If the user is not authenticated, redirect to login
//         navigate('/auth'); // Adjust the route to your login page
//         return;
//       }

//       let profilePicURL = previewPic;

//       // If there's a profile picture to upload
//       if (profilePic) {
//         const fileName = `${username}_profile_pic`;
//         const fileKey = `profilePictures/${fileName}`;

//         await uploadData({
//           key: fileKey,
//           data: profilePic,
//           options: {
//             contentType: profilePic.type,
//           },
//         });

//         const { url } = await getUrl({ key: fileKey });
//         profilePicURL = url;
//       }

//       // Prepare the DynamoDB update parameters
//       const params = {
//         TableName: 'Users',
//         Key: {
//           userId: { S: username },
//         },
//         UpdateExpression:
//           'SET bio = :bio, hackathons = :hackathons, techStack = :techStack, profilePicURL = :profilePicURL',
//         ExpressionAttributeValues: {
//           ':bio': { S: bio },
//           ':hackathons': { S: hackathons },
//           ':techStack': { SS: techStack.map((skill) => skill.value) },
//           ':profilePicURL': { S: profilePicURL },
//         },
//       };

//       // Update DynamoDB with new profile data
//       const command = new UpdateItemCommand(params);
//       await dynamoClient.send(command);

//       // Display success toast
//       toast({
//         title: 'Profile updated successfully!',
//         description: 'Your profile has been updated.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });

//       // Navigate to the dashboard after successful update
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error updating profile: ', error);

//       // Display error toast
//       toast({
//         title: 'Error',
//         description: 'There was an issue updating your profile.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <div>
//       {/* Form for editing profile */}
//       <form onSubmit={handleSubmit}>
//         {/* Your form fields go here */}
//       </form>
//     </div>
//   );
// };

// export default ProfileEdit;
