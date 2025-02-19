import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsContainer = styled(motion.div)`
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 1200px;
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(26, 32, 44, 0.7)'
  };
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.light};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectTitle = styled.h2`
  font-size: ${props => props.theme.typography.h3};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern, responsive personal portfolio website built with React and Emotion.',
      image: '/images/portfolio.png',
      technologies: ['React', 'Emotion', 'Framer Motion', 'React Router'],
      githubLink: 'https://github.com/Anu374/Anu-Sah',
      liveLink: 'https://anusah.com'
    },
    {
      id: 2,
      title: 'Amazon Prive Font Page Clone',
      description: 'This app is clone of Amazon prime front page. It has a fully functional shopping cart and checkout process.',
      image: './images/Amazon.png',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
      githubLink: 'https://github.com/Anu374/Amazon-Prime-page',
      liveLink: 'https://amazon-prime-page.vercel.app/'
    },
    {
      id: 3,
      title: 'Resume Builder',
      description: 'This app to Build your own resumme using various templets and download it as pdf.',
      image: '/images/resume.png',
      technologies: ['React', 'OpenWeatherMap API', 'Styled Components'],
      githubLink: 'https://github.com/Anu374/Resume-builder',
      liveLink: 'https://resume-builder-coral.vercel.app/'
    }
  ]);

  return (
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </SectionTitle>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.technologies.map(tech => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
              <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </ProjectLink>
              <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Live Demo
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsContainer>
  );
};

export default Projects;
