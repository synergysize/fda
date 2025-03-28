import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaChartLine, FaRocket, FaInfoCircle, FaComments } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(15, 27, 58, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 1.75rem;
  color: var(--text-primary);
  
  span.highlight {
    color: var(--secondary);
  }
  
  span.token {
    background: linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
`;

const LogoIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-size: 1.5rem;
`;

const Navigation = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const NavItem = styled(motion.li)`
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
    font-weight: 500;
    transition: all 0.2s ease;
    padding: 0.5rem 0;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--secondary);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--secondary);
      
      &:after {
        width: 100%;
      }
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

const MobileMenuIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: ${props => props.isOpen ? 'transparent' : 'var(--text-primary)'};
  transition: all 0.3s ease;
  position: relative;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s ease;
  }
  
  &:before {
    top: ${props => props.isOpen ? '0' : '-8px'};
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  }
  
  &:after {
    bottom: ${props => props.isOpen ? '0' : '-8px'};
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`;

const MobileNav = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--background-primary);
  padding: 1rem;
  z-index: 99;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavItem = styled(motion.li)`
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--secondary);
    }
  }
`;

const TokenPrice = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 193, 7, 0.15);
  color: var(--secondary);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
  
  span {
    color: var(--success);
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  const priceChange = '+2.45%';

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 50) {
      controls.start({ height: '70px' });
    } else {
      controls.start({ height: '80px' });
    }
  }, [scrollPosition, controls]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer animate={controls}>
      <HeaderContent>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoIcon
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FaRocket />
          </LogoIcon>
          First<span className="highlight">Doge</span>Agent <span className="token">$FDA</span>
        </Logo>
        
        <Navigation>
          <NavList>
            <NavItem
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#about">
                <FaInfoCircle />
                About
              </a>
            </NavItem>
            <NavItem
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#dashboard">
                <FaChartLine />
                Dashboard
              </a>
            </NavItem>
            <NavItem
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#chatbot">
                <FaComments />
                AI Chatbot
              </a>
            </NavItem>
          </NavList>
        </Navigation>
        
        <TokenPrice
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          $FDA: $0.42 <span>{priceChange}</span>
        </TokenPrice>
        
        <MobileMenu onClick={toggleMenu}>
          <MobileMenuIcon isOpen={isOpen} />
        </MobileMenu>
      </HeaderContent>
      
      {isOpen && (
        <MobileNav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavList>
            <MobileNavItem
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#about">
                <FaInfoCircle />
                About
              </a>
            </MobileNavItem>
            <MobileNavItem
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#dashboard">
                <FaChartLine />
                Dashboard
              </a>
            </MobileNavItem>
            <MobileNavItem
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#chatbot">
                <FaComments />
                AI Chatbot
              </a>
            </MobileNavItem>
          </MobileNavList>
        </MobileNav>
      )}
    </HeaderContainer>
  );
};

export default Header;