import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaBrain, 
  FaChartLine, 
  FaRocket, 
  FaUsers, 
  FaLock 
} from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 100%);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(36, 99, 255, 0) 0%, rgba(36, 99, 255, 0.5) 50%, rgba(36, 99, 255, 0) 100%);
  }
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  
  .highlight {
    color: var(--secondary);
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 4rem;
  font-size: 1.125rem;
  line-height: 1.7;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(20, 31, 62, 0.6);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(36, 99, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(36, 99, 255, 0.3);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    
    .feature-icon {
      transform: scale(1.1) rotate(5deg);
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    }
    
    &:before {
      transform: scale(2.5);
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(36, 99, 255, 0.05) 0%, rgba(36, 99, 255, 0) 70%);
    z-index: -1;
    transition: transform 0.6s ease;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(36, 99, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(36, 99, 255, 0.1);
  position: relative;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 16px;
    border: 1px dashed rgba(36, 99, 255, 0.3);
    z-index: -1;
    opacity: 0.5;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--primary);
  }
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const TokenMetricsContainer = styled(motion.div)`
  margin-top: 5rem;
  background: rgba(20, 31, 62, 0.6);
  border-radius: 16px;
  padding: 3rem;
  border: 1px solid rgba(36, 99, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(36, 99, 255, 0.05) 0%, rgba(15, 27, 58, 0) 70%);
    top: -250px;
    right: -250px;
    z-index: 0;
  }
`;

const MetricsTitle = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.75rem;
  position: relative;
  display: inline-block;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary) 0%, rgba(36, 99, 255, 0) 100%);
  }
  
  .highlight {
    color: var(--secondary);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled(motion.div)`
  padding: 1.5rem;
  background: rgba(15, 27, 58, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(36, 99, 255, 0.1);
`;

const MetricName = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
`;

const MetricValue = styled.h4`
  font-size: 2rem;
  margin-bottom: 0;
  
  .highlight {
    color: var(--secondary);
  }
`;

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          About <span className="highlight">First Doge Agent</span>
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          $FDA is a revolutionary tokenized agent that leverages AI technology to provide unparalleled insights and analysis on DOGE ecosystem data. Our platform combines cutting-edge technology with financial expertise.
        </SectionSubtitle>
        
        <FeaturesGrid>
          {[
            {
              icon: <FaBrain />,
              title: 'AI-Powered Analytics',
              description: 'Leveraging cutting-edge artificial intelligence to analyze DOGE data and provide actionable insights in real-time.'
            },
            {
              icon: <FaShieldAlt />,
              title: 'Secure Infrastructure',
              description: 'Built on a robust, secure foundation ensuring all data and transactions are protected with the highest security standards.'
            },
            {
              icon: <FaChartLine />,
              title: 'Advanced Reporting',
              description: 'Comprehensive reporting capabilities that transform complex data into clear, intuitive visualizations and metrics.'
            },
            {
              icon: <FaRocket />,
              title: 'Token Ecosystem',
              description: 'The $FDA token powers our ecosystem, providing governance rights, staking rewards, and exclusive access to premium features.'
            },
            {
              icon: <FaUsers />,
              title: 'Community Driven',
              description: 'A passionate community of users, developers, and stakeholders contributing to the ongoing development and improvement.'
            },
            {
              icon: <FaLock />,
              title: 'Privacy Focused',
              description: 'Strong commitment to user privacy with data protection measures that exceed industry standards.'
            }
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <FeatureIcon className="feature-icon">
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
        <TokenMetricsContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <MetricsTitle><span className="highlight">$FDA</span> Token Metrics</MetricsTitle>
          
          <MetricsGrid>
            <MetricCard
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <MetricName>Total Supply</MetricName>
              <MetricValue>100,000,000 <span className="highlight">$FDA</span></MetricValue>
            </MetricCard>
            
            <MetricCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <MetricName>Initial Market Cap</MetricName>
              <MetricValue>$4,200,000</MetricValue>
            </MetricCard>
            
            <MetricCard
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <MetricName>Current Price</MetricName>
              <MetricValue>$0.42 <span className="highlight">+2.45%</span></MetricValue>
            </MetricCard>
          </MetricsGrid>
        </TokenMetricsContainer>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;