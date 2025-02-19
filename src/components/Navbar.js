import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => 
    props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(26, 32, 44, 0.9)'
  };
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.theme.shadows.light};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.h3};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${props => 
      props.theme.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(26, 32, 44, 0.95)'
    };
    backdrop-filter: blur(10px);
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.lg};
    z-index: 1000;
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ThemeToggleButton = styled.button`
  background-color: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}20;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
  }
`;

const Navbar = ({ toggleTheme, theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo to="/">Anu Sah</Logo>
        <NavLinks>
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              active={location.pathname === link.path ? 1 : 0}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
        <ThemeToggleButton onClick={toggleTheme}>
          {theme.mode === 'light' ? <FaMoon /> : <FaSun />}
          {theme.mode === 'light' ? 'Dark' : 'Light'}
        </ThemeToggleButton>
        <MobileMenuToggle onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuToggle>
        
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <MobileNavLink 
                key={link.path} 
                to={link.path} 
                active={location.pathname === link.path ? 1 : 0}
                onClick={toggleMobileMenu}
              >
                {link.label}
              </MobileNavLink>
            ))}
            <ThemeToggleButton onClick={toggleTheme}>
              {theme.mode === 'light' ? <FaMoon /> : <FaSun />}
              {theme.mode === 'light' ? 'Dark' : 'Light'}
            </ThemeToggleButton>
          </MobileMenu>
        )}
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
