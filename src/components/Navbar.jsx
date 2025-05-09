// src/components/Navbar.jsx
import {
    Box,
    Flex,
    Button,
    useColorMode,
    useColorModeValue,
    Spacer,
    IconButton,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // 🛠 add useNavigate
  
  export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const location = useLocation();
    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks
  
    const navItems = [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Hackathons', path: '/hackathon-explorer' },
      { name: 'Profile', path: '/profile' },
    ];
  
    // 🛠 logout handler
    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast({
          title: 'Logged out successfully!',
          description: 'You have been logged out.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
          variant: 'left-accent',
        });
        navigate('/'); // Redirect to sign-in page after logout
      } catch (error) {
        console.error('Error logging out:', error);
        toast({
          title: 'Error logging out',
          description: 'Something went wrong. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
          variant: 'left-accent',
        });
      }
    };
  
    // 🛠 Show the confirmation modal
    const showConfirmModal = () => {
      onOpen(); // Open the modal when logout is triggered
    };
  
    // 🛠 Modal for logout confirmation
    const confirmLogout = () => {
      handleLogout();
      onClose(); // Close the modal after confirming logout
    };
  
    return (
      <Flex
        as="nav"
        position="sticky"
        top="0"
        zIndex="1000"
        bg={bg}
        borderBottom="1px solid"
        borderColor={borderColor}
        p={4}
        align="center"
        boxShadow="md"
      >
        <Box fontWeight="bold" fontSize="xl">
          TeamForge
        </Box>
        <Spacer />
        <Flex gap={4} align="center">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Button
                key={name}
                as={RouterLink}
                to={path}
                variant="ghost"
                position="relative"
                color={isActive ? 'blue.400' : useColorModeValue('gray.800', 'gray.100')}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.500',
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  transform: 'scaleX(0)',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'blue.400',
                  transformOrigin: 'bottom right',
                  transition: 'transform 0.3s ease-out',
                }}
                sx={{
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                }}
              >
                {name}
              </Button>
            );
          })}
  
          {/* 🌟 LOGOUT Button */}
          <Button
            colorScheme="red"
            variant="solid"
            size="sm"
            onClick={showConfirmModal} // Show confirmation modal
          >
            Logout
          </Button>
  
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
  
        {/* 🛠 Logout Confirmation Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="red.500">Confirm Logout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to log out? This will end your session.</Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmLogout}>
                Logout
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }
 