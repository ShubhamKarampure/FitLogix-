import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Home/Footer';
import TrackYourProgress from '../components/Home/ProgressTrack';
import Login from '../components/Auth/Login';
import Register from '../components/auth/Register';
import HomeNavbar from '../components/Home/NavBar';

const LandingPage = () => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure(); 
  return (
    <Box>
      <HomeNavbar onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} /> 
      <Box flex="1" bg="rgba(255, 255, 255, 0.9)" borderRadius="md" p={5} boxShadow="md">
        <Hero onRegisterOpen={onRegisterOpen} />
        <Features />
        <TrackYourProgress />
        <Testimonials />
        
        {/* Modals */}
        <Login isOpen={isLoginOpen} onClose={onLoginClose} onRegister={onRegisterOpen}/>
        <Register isOpen={isRegisterOpen} onClose={onRegisterClose} onLogin={onLoginOpen}/> 
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
