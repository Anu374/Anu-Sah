import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDesktop, FaDatabase } from 'react-icons/fa';

// Import the profile image
import ProfileImage from '../assets/images/MyPic1.jpg';

const AboutContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background-color: transparent;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h1)`
  font-size: ${props => props.theme.typography.h1};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
`;

const ProfileSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(26, 32, 44, 0.7)'
  };
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.light};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)'
  };

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImageStyled = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const ProfileText = styled.div`
  flex: 1;
`;

const AboutDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const SkillsSection = styled(motion.div)`
  width: 100%;
  background-color: ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(26, 32, 44, 0.7)'
  };
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.light};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.light};
  }
`;

const SkillIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkillTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SkillDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const About = () => {
  const skills = [
    {
      icon: <FaCode />,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive web interfaces using React, Vue, and modern web technologies.'
    },
    {
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Building scalable server-side applications with Node.js, Python, and Express.js.'
    },
    {
      icon: <FaDatabase />,
      title: 'Database Management',
      description: 'Designing and optimizing database schemas with MongoDB, PostgreSQL, and MySQL.'
    },
    {
      icon: <FaDesktop />,
      title: 'DevOps & Cloud',
      description: 'Implementing CI/CD pipelines and deploying applications on AWS, Azure, and Heroku.'
    }
  ];

  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </SectionTitle>
      <AboutContent>
        <ProfileSection
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ProfileImageStyled 
            src={ProfileImage} 
            alt="Anu Sah" 
          />
          <ProfileText>
            <AboutDescription>
              Hi, I'm Anu Sah, a passionate software developer with a strong background in creating innovative web solutions. 
              I specialize in full-stack development, focusing on building scalable and user-friendly applications. 
              With a keen eye for design and a love for solving complex problems, I'm dedicated to delivering high-quality software that makes a difference.
            </AboutDescription>
          </ProfileText>
        </ProfileSection>
        <SkillsSection
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SectionTitle 
            as="h2" 
            style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem' 
            }}
          >
            My Skills
          </SectionTitle>
          <SkillGrid>
            {skills.map((skill, index) => (
              <SkillCard key={index}>
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillDescription>{skill.description}</SkillDescription>
              </SkillCard>
            ))}
          </SkillGrid>
        </SkillsSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
