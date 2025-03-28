import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaTwitter, 
  FaTelegram, 
  FaDiscord, 
  FaGithub, 
  FaMedium, 
  FaArrowRight 
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(180deg, var(--background-secondary) 0%, rgba(10, 20, 45, 1) 100%);
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(36, 99, 255, 0) 0%, rgba(36, 99, 255, 0.3) 50%, rgba(36, 99, 255, 0) 100%);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  
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

const FooterAbout = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 350px;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--primary);
  }
`;

const ColumnLinks = styled.ul`
  list-style: none;
`;

const ColumnLink = styled(motion.li)`
  margin-bottom: 0.75rem;
  
  a {
    color: var(--text-secondary);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      color: var(--secondary);
      transform: translateX(3px);
    }
  }
`;

const NewsletterForm = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterInput = styled.input`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  background: rgba(15, 27, 58, 0.6);
  border: 1px solid rgba(36, 99, 255, 0.1);
  color: var(--text-primary);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: var(--text-secondary);
    font-size: 0.875rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: var(--primary);
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 5px 15px rgba(36, 99, 255, 0.3);
  z-index: 10;
  transition: all 0.3s ease;
  
  svg {
    transform: rotate(-45deg);
  }
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <div>
            <FooterLogo
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <LogoIcon
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaRocket />
              </LogoIcon>
              First<span className="highlight">Doge</span>Agent <span className="token">$FDA</span>
            </FooterLogo>
            
            <FooterAbout>
              $FDA is the premier tokenized agent for the DOGE ecosystem, providing AI-powered insights, analytics, and tools to maximize efficiency and transparency.
            </FooterAbout>
            
            <SocialLinks>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FaTwitter />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FaTelegram />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FaDiscord />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FaMedium />
              </SocialLink>
            </SocialLinks>
          </div>
          
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ColumnLinks>
              {[
                { text: 'About Us', href: '#about' },
                { text: 'Dashboard', href: '#dashboard' },
                { text: 'AI Chatbot', href: '#chatbot' },
                { text: 'Tokenomics', href: '#' },
                { text: 'Roadmap', href: '#' },
              ].map((link, index) => (
                <ColumnLink 
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={link.href}>
                    <FaArrowRight /> {link.text}
                  </a>
                </ColumnLink>
              ))}
            </ColumnLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <ColumnLinks>
              {[
                { text: 'Documentation', href: '#' },
                { text: 'API Reference', href: '#' },
                { text: 'GitHub Repository', href: '#' },
                { text: 'Community Forum', href: '#' },
                { text: 'Press Kit', href: '#' },
              ].map((link, index) => (
                <ColumnLink 
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={link.href}>
                    <FaArrowRight /> {link.text}
                  </a>
                </ColumnLink>
              ))}
            </ColumnLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Subscribe</ColumnTitle>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Stay updated with the latest news and updates from the $FDA team.
            </p>
            
            <NewsletterForm>
              <NewsletterInput 
                type="email" 
                placeholder="Enter your email" 
              />
              <SubscribeButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe <FaArrowRight />
              </SubscribeButton>
            </NewsletterForm>
          </FooterColumn>
        </FooterTop>
        
        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} First Doge Agent ($FDA). All rights reserved.
          </Copyright>
          
          <FooterLinks>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Disclaimer</a>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
      
      <BackToTop
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <FaArrowRight />
      </BackToTop>
    </FooterContainer>
  );
};

export default Footer;