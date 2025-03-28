import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaUser, FaRegCopy, FaCheck } from 'react-icons/fa';
import { answerQuestion } from '../../utils/apiData';

const ChatbotSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 100%);
  position: relative;
  overflow: hidden;
`;

const ChatbotContainer = styled.div`
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
  margin: 0 auto 3rem;
  font-size: 1.125rem;
  line-height: 1.7;
`;

const ChatbotWrapper = styled(motion.div)`
  background: rgba(20, 31, 62, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(36, 99, 255, 0.1);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const ChatHeader = styled.div`
  background: rgba(15, 27, 58, 0.8);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(36, 99, 255, 0.1);
`;

const BotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BotAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

const BotDetails = styled.div``;

const BotName = styled.h4`
  margin: 0;
  font-size: 1rem;
  
  .highlight {
    color: var(--secondary);
  }
`;

const BotStatus = styled.div`
  font-size: 0.75rem;
  color: var(--success);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success);
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(15, 27, 58, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(36, 99, 255, 0.3);
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)<{ isBot?: boolean }>`
  max-width: 80%;
  align-self: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MessageContent = styled.div<{ isBot?: boolean }>`
  background: ${props => props.isBot ? 'rgba(36, 99, 255, 0.1)' : 'rgba(36, 99, 255, 0.2)'};
  border: 1px solid ${props => props.isBot ? 'rgba(36, 99, 255, 0.1)' : 'rgba(36, 99, 255, 0.2)'};
  border-radius: ${props => props.isBot ? '0 12px 12px 12px' : '12px 0 12px 12px'};
  padding: 1rem;
  color: var(--text-primary);
  position: relative;
  
  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MessageAvatar = styled.div<{ isBot?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.isBot 
    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
    : 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
`;

const MessageSender = styled.span<{ isBot?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.isBot ? 'var(--primary)' : 'var(--secondary)'};
`;

const MessageActions = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  gap: 0.5rem;
  
  ${MessageContent}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(15, 27, 58, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.75rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(36, 99, 255, 0.2);
    color: var(--text-primary);
  }
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  align-self: flex-end;
`;

const ChatInputContainer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(36, 99, 255, 0.1);
  background: rgba(15, 27, 58, 0.8);
`;

const ChatInputForm = styled.form`
  display: flex;
  gap: 0.75rem;
`;

const ChatInput = styled.input`
  flex: 1;
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

const SendButton = styled(motion.button)`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-dark);
  }
  
  &:disabled {
    background: rgba(36, 99, 255, 0.3);
    cursor: not-allowed;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const SuggestedQuestion = styled(motion.button)`
  background: rgba(36, 99, 255, 0.1);
  border: 1px solid rgba(36, 99, 255, 0.1);
  border-radius: 16px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(36, 99, 255, 0.2);
    border-color: var(--primary);
    color: var(--text-primary);
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: rgba(36, 99, 255, 0.05);
  border-radius: 12px;
  max-width: fit-content;
  
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    display: inline-block;
  }
`;

interface ChatMessage {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hello! I'm the First Doge Agent ($FDA) chatbot. I can answer questions about DOGE grants and provide insights based on the API data. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestedQuestions = [
    "What is the highest grant?",
    "What are the total savings?",
    "Which agency has the most funding?",
    "How many recipients are there?",
    "Tell me about GAVI FOUNDATION",
  ];
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        content: answerQuestion(input),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };
  
  const copyToClipboard = (content: string, id: number) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <ChatbotSection id="chatbot">
      <ChatbotContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          AI <span className="highlight">Chatbot</span>
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Interact with our intelligent chatbot to get insights and information about DOGE grants. Ask questions about funding, recipients, savings, and more.
        </SectionSubtitle>
        
        <ChatbotWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <ChatHeader>
            <BotInfo>
              <BotAvatar>
                <FaRobot />
              </BotAvatar>
              <BotDetails>
                <BotName>FDA <span className="highlight">Assistant</span></BotName>
                <BotStatus>Online</BotStatus>
              </BotDetails>
            </BotInfo>
            <CloseButton>
              <FaTimes />
            </CloseButton>
          </ChatHeader>
          
          <ChatMessages>
            {messages.map((message) => (
              <Message 
                key={message.id} 
                isBot={message.isBot}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MessageContent isBot={message.isBot}>
                  <MessageHeader>
                    <MessageAvatar isBot={message.isBot}>
                      {message.isBot ? <FaRobot /> : <FaUser />}
                    </MessageAvatar>
                    <MessageSender isBot={message.isBot}>
                      {message.isBot ? 'FDA Assistant' : 'You'}
                    </MessageSender>
                  </MessageHeader>
                  <p>{message.content}</p>
                  
                  {message.isBot && (
                    <MessageActions>
                      <ActionButton 
                        onClick={() => copyToClipboard(message.content, message.id)}
                        title="Copy to clipboard"
                      >
                        {copied === message.id ? <FaCheck /> : <FaRegCopy />}
                      </ActionButton>
                    </MessageActions>
                  )}
                </MessageContent>
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
              </Message>
            ))}
            
            {isTyping && (
              <Message 
                isBot={true}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TypingIndicator>
                  <span
                    style={{
                      animation: 'bounce 1s infinite',
                      animationDelay: '0s',
                    }}
                  />
                  <span
                    style={{
                      animation: 'bounce 1s infinite',
                      animationDelay: '0.2s',
                    }}
                  />
                  <span
                    style={{
                      animation: 'bounce 1s infinite',
                      animationDelay: '0.4s',
                    }}
                  />
                </TypingIndicator>
              </Message>
            )}
            
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <ChatInputContainer>
            <ChatInputForm onSubmit={handleSendMessage}>
              <ChatInput
                type="text"
                placeholder="Ask me about DOGE grants..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <SendButton
                type="submit"
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
              </SendButton>
            </ChatInputForm>
            
            <SuggestedQuestions>
              {suggestedQuestions.map((question, index) => (
                <SuggestedQuestion
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isTyping}
                >
                  {question}
                </SuggestedQuestion>
              ))}
            </SuggestedQuestions>
          </ChatInputContainer>
        </ChatbotWrapper>
      </ChatbotContainer>
    </ChatbotSection>
  );
};

export default Chatbot;