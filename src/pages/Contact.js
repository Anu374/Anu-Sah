import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const ContactContainer = styled(motion.div)`
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

const ContactContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactForm = styled(motion.form)`
  flex: 1;
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

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const SocialSection = styled(motion.div)`
  flex: 1;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialTitle = styled.h2`
  font-size: ${props => props.theme.typography.h3};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 2.5rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </SectionTitle>
      <ContactContent>
        <ContactForm
          onSubmit={handleSubmit}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FormGroup>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="message">Message</FormLabel>
            <FormTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane style={{ marginRight: '10px' }} /> Send Message
          </SubmitButton>
        </ContactForm>
        <SocialSection
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SocialTitle>Connect with Me</SocialTitle>
          <SocialLinks>
            <SocialIcon href="mailto:code.anukrsah@gmail.com">
              <FaEnvelope />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/sah-anu/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://github.com/anu374" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="https://twitter.com/anukrsah" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
          </SocialLinks>
        </SocialSection>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
