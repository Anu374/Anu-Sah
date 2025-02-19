import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Global, css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

// Import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

// Theme configuration
const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#3498db',
    secondary: '#2980b9',
    background: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    white: '#ffffff',
    black: '#000000',
    border: '#e0e0e0',
    gray: '#f4f4f4',
    error: '#e74c3c',
    // Vibrant background colors
    backgroundColors: [
      '#ff6b6b',   // Pastel Red
      '#4ecdc4',   // Turquoise
      '#45b7d1',   // Sky Blue
      '#f7d794',   // Soft Yellow
      '#ff9ff3',   // Soft Pink
      '#a29bfe'    // Lavender
    ]
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    body: '1rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    round: '50%',
  },
  shadows: {
    light: '0 4px 6px rgba(0,0,0,0.1)',
    medium: '0 6px 12px rgba(0,0,0,0.15)',
    dark: '0 10px 20px rgba(0,0,0,0.2)',
  }
};

const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#3498db',
    secondary: '#2980b9',
    background: '#1a202c',
    text: '#e2e8f0',
    textSecondary: '#a0aec0',
    white: '#ffffff',
    black: '#000000',
    border: '#2d3748',
    gray: '#2d3748',
    error: '#e74c3c',
    // Vibrant background colors
    backgroundColors: [
      '#ff6b6b',   // Pastel Red
      '#4ecdc4',   // Turquoise
      '#45b7d1',   // Sky Blue
      '#f7d794',   // Soft Yellow
      '#ff9ff3',   // Soft Pink
      '#a29bfe'    // Lavender
    ]
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: lightTheme.shadows,
};

// Keyframe animations for background
const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const particleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
`;

const gradientAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  
  // Base background with gradient animation
  background: ${props => 
    props.theme.mode === 'light' 
      ? `linear-gradient(-45deg, ${props.theme.colors.backgroundColors.join(', ')})`
      : `linear-gradient(-45deg, ${props.theme.colors.backgroundColors.map(color => color + '99').join(', ')})`
  };
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;

  // Particle effects
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 50px;
    background: 
      radial-gradient(circle at center, 
        ${props => props.theme.colors.backgroundColors[0]} 10%, 
        transparent 10%),
      radial-gradient(circle at center, 
        ${props => props.theme.colors.backgroundColors[1]} 10%, 
        transparent 10%);
    background-size: 50px 50px;
    animation: ${particleAnimation} 20s linear infinite;
    opacity: 0.3;
  }

  // Multiple particle layers
  ${[...Array(5)].map((_, i) => css`
    &::nth-child(${i + 2}) {
      animation-delay: ${i * 2}s;
      background: 
        radial-gradient(circle at center, 
          ${props => props.theme.colors.backgroundColors[(i + 2) % 6]} 10%, 
          transparent 10%);
      opacity: 0.1;
    }
  `)}
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(180deg);
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    transition: color 0.3s ease;
  }
  a:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle, 
    rgba(78, 205, 196, 0.2), 
    rgba(78, 205, 196, 0)
  );
`;

const AppContainer = styled.div`
  font-family: ${props => props.theme.typography.fontFamily};
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? darkTheme : lightTheme;
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.mode);
  };

  const generateShapes = () => {
    const shapes = [];
    for (let i = 0; i < 5; i++) {
      shapes.push(
        <AnimatedShape
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: 0.5,
            opacity: 0.5
          }}
          animate={{ 
            x: [
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight, 
              Math.random() * window.innerHeight, 
              Math.random() * window.innerHeight
            ],
            scale: [0.5, 1, 0.5],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{
            width: `${100 + Math.random() * 300}px`,
            height: `${100 + Math.random() * 300}px`,
          }}
        />
      );
    }
    return shapes;
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <ThemeToggleButton onClick={toggleTheme}>
          {theme.mode === 'light' ? <FaMoon /> : <FaSun />}
        </ThemeToggleButton>
        <BackgroundAnimation />
        <AnimatePresence mode="wait">
          <AppContainer>
            <Navbar theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AppContainer>
        </AnimatePresence>
      </ThemeProvider>
    </Router>
  );
}

export default App;
