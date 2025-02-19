import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileImage from '../assets/images/myPic.jpg';

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background-color: transparent;
  
  // Add top margin to create space below the navbar
  margin-top: 80px;  
  
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const ContentWrapper = styled(motion.div)`
  background-color: ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(26, 32, 44, 0.7)'
  };
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.light};
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
  border: 1px solid ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
`;

const ProfileImageStyled = styled(motion.img)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  border: 4px solid ${props => props.theme.colors.primary};
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.typography.h1};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.h3};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.lg};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Button = styled(Link)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.light};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }
`;

const Home = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ContentWrapper
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileImageStyled
          src={ProfileImage}
          alt="Anu Sah"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <Title
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hi, I'm Anu Sah
        </Title>
        <Subtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          A passionate developer creating innovative solutions and building amazing web experiences.
        </Subtitle>
        <ButtonContainer>
          <Button to="/projects">View Projects</Button>
          <Button to="/contact">Contact Me</Button>
        </ButtonContainer>
        <SocialLinks>
          <SocialIcon href="https://github.com/anu374" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://linkedin.com/in/sah-anu/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon href="https://twitter.com/anukrsah" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
        </SocialLinks>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
