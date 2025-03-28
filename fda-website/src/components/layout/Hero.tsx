import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 80px; /* Header height */
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 600px;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 3rem;
  }
`;

const HeroTextContent = styled.div`
  max-width: 600px;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  .text-gradient {
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  .highlight {
    color: var(--secondary);
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.button)`
  padding: 0.875rem 2rem;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(36, 99, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -3px rgba(36, 99, 255, 0.3);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 0.875rem 2rem;
  border-radius: 8px;
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const HeroImageContainer = styled(motion.div)`
  position: relative;
  width: 500px;
  height: 500px;
  
  @media (max-width: 992px) {
    width: 400px;
    height: 400px;
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const CircleBackground = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(36, 99, 255, 0.2) 0%, rgba(15, 27, 58, 0) 70%);
  
  @media (max-width: 992px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const TokenImage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 25px 50px -12px rgba(36, 99, 255, 0.4);
  
  @media (max-width: 992px) {
    width: 180px;
    height: 180px;
  }
  
  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
`;

const TokenSymbol = styled.div`
  color: white;
  font-weight: 800;
  font-size: 3.5rem;
  
  @media (max-width: 992px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(255, 193, 7, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  font-weight: 700;
  backdrop-filter: blur(4px);
  box-shadow: 0 10px 15px -3px rgba(255, 193, 7, 0.2);
`;

const SmallDot = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--secondary);
`;

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <HeroSection id="hero">
      <ParticlesContainer>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: '#2463ff',
              },
              links: {
                color: '#2463ff',
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </ParticlesContainer>
      
      <HeroContent>
        <HeroTextContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering <span className="highlight">DOGE</span> with <br />
            <span className="text-gradient">First Doge Agent</span>
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            $FDA - The premier tokenized solution bringing intelligence and efficiency to the DOGE ecosystem. Powered by advanced analytics and AI-driven insights.
          </HeroSubtitle>
          
          <CTAButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Get Started <FaArrowRight />
            </PrimaryButton>
            
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Dashboard <FaRocket />
            </SecondaryButton>
          </CTAButtons>
        </HeroTextContent>
        
        <HeroImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CircleBackground
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          <TokenImage
            whileHover={{ scale: 1.05, rotate: 5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
              y: [0, -10, 0],
              rotate: isHovered ? [0, 5, 0, -5, 0] : 0,
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              },
              rotate: {
                duration: 0.5,
                repeat: isHovered ? 2 : 0,
              }
            }}
          >
            <TokenSymbol>$FDA</TokenSymbol>
          </TokenImage>
          
          <FloatingElement
            style={{ width: '100px', height: '100px', top: '10%', right: '10%' }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            AI-Powered
          </FloatingElement>
          
          <FloatingElement
            style={{ width: '90px', height: '90px', bottom: '15%', left: '5%' }}
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.5,
            }}
          >
            Secure
          </FloatingElement>
          
          <SmallDot
            style={{ top: '30%', left: '20%' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          <SmallDot
            style={{ bottom: '25%', right: '15%' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.7,
            }}
          />
        </HeroImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;