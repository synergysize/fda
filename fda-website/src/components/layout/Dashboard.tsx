import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaChartLine, FaDollarSign, FaSave, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import { 
  getDogeApiData, 
  formatCurrency, 
  getTotalSavings, 
  getTotalAllocations, 
  getTopAgencies,
  Grant
} from '../../utils/apiData';

const DashboardSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, var(--background-secondary) 0%, var(--background-primary) 100%);
  position: relative;
  overflow: hidden;
`;

const DashboardContainer = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(20, 31, 62, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(36, 99, 255, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.color || 'var(--primary)'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h4`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin: 0;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color || 'rgba(36, 99, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.iconColor || 'var(--primary)'};
  font-size: 1.25rem;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: auto;
`;

const StatChange = styled.div`
  font-size: 0.875rem;
  color: ${props => props.isPositive ? 'var(--success)' : 'var(--danger)'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(36, 99, 255, 0.1);
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  color: ${props => props.active ? 'var(--secondary)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--secondary);
    transform: scaleX(${props => props.active ? '1' : '0'});
    transition: transform 0.3s ease;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(15, 27, 58, 0.6);
  border: 1px solid rgba(36, 99, 255, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const TableContainer = styled(motion.div)`
  background: rgba(20, 31, 62, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(36, 99, 255, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: rgba(15, 27, 58, 0.8);
  border-bottom: 1px solid rgba(36, 99, 255, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(36, 99, 255, 0.05);
  transition: background 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(36, 99, 255, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ValueCell = styled(TableCell)`
  font-weight: 600;
  color: ${props => props.highlight ? 'var(--secondary)' : 'var(--text-primary)'};
`;

const SavingsCell = styled(TableCell)`
  color: var(--success);
`;

const NoResults = styled.div`
  padding: 3rem;
  text-align: center;
  color: var(--text-secondary);
`;

const LoadMoreButton = styled(motion.button)`
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 8px;
  font-weight: 600;
  margin: 0 auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

type TabType = 'all' | 'highest' | 'recent';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedGrants, setDisplayedGrants] = useState<Grant[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  
  const dogeData = getDogeApiData();
  const grants = dogeData.result.grants;
  
  useEffect(() => {
    let filtered = [...grants];
    
    // Apply filter based on active tab
    if (activeTab === 'highest') {
      filtered.sort((a, b) => b.value - a.value);
    } else if (activeTab === 'recent') {
      // Assuming date is in m/d/yyyy format
      filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(grant => 
        (grant.agency && grant.agency.toLowerCase().includes(lowerCaseQuery)) ||
        (grant.recipient && grant.recipient.toLowerCase().includes(lowerCaseQuery)) ||
        (grant.description && grant.description.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    setDisplayedGrants(filtered);
  }, [activeTab, searchQuery, grants]);
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setVisibleCount(5);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(5);
  };
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };
  
  return (
    <DashboardSection id="dashboard">
      <DashboardContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          DOGE <span className="highlight">Dashboard</span>
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Real-time insights and analytics on DOGE grant allocations and savings. Explore the data and discover opportunities for optimization.
        </SectionSubtitle>
        
        <StatsGrid>
          <StatCard
            color="var(--primary)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <StatHeader>
              <StatTitle>Total Allocations</StatTitle>
              <StatIcon>
                <FaDollarSign />
              </StatIcon>
            </StatHeader>
            <StatValue>{formatCurrency(getTotalAllocations())}</StatValue>
            <StatChange isPositive={true}>+12.5% from last month</StatChange>
          </StatCard>
          
          <StatCard
            color="var(--success)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <StatHeader>
              <StatTitle>Total Savings</StatTitle>
              <StatIcon color="rgba(75, 181, 67, 0.1)" iconColor="var(--success)">
                <FaSave />
              </StatIcon>
            </StatHeader>
            <StatValue>{formatCurrency(getTotalSavings())}</StatValue>
            <StatChange isPositive={true}>+23.7% from last month</StatChange>
          </StatCard>
          
          <StatCard
            color="var(--secondary)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <StatHeader>
              <StatTitle>Top Agency</StatTitle>
              <StatIcon color="rgba(255, 193, 7, 0.1)" iconColor="var(--secondary)">
                <FaChartBar />
              </StatIcon>
            </StatHeader>
            <StatValue>{getTopAgencies()[0]?.agency}</StatValue>
            <StatChange isPositive={true}>{formatCurrency(getTopAgencies()[0]?.totalValue)}</StatChange>
          </StatCard>
        </StatsGrid>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => handleTabChange('all')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            All Grants
          </Tab>
          <Tab 
            active={activeTab === 'highest'} 
            onClick={() => handleTabChange('highest')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Highest Value
          </Tab>
          <Tab 
            active={activeTab === 'recent'} 
            onClick={() => handleTabChange('recent')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Most Recent
          </Tab>
        </TabsContainer>
        
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search by agency, recipient, or description..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchContainer>
        
        <AnimatePresence mode="wait">
          <TableContainer
            key={activeTab + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayedGrants.length > 0 ? (
              <Table>
                <TableHead>
                  <tr>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Agency</TableHeader>
                    <TableHeader>Recipient</TableHeader>
                    <TableHeader>Value</TableHeader>
                    <TableHeader>Savings</TableHeader>
                    <TableHeader>More Info</TableHeader>
                  </tr>
                </TableHead>
                <TableBody>
                  {displayedGrants.slice(0, visibleCount).map((grant, index) => (
                    <TableRow
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell>{grant.date}</TableCell>
                      <TableCell>{grant.agency}</TableCell>
                      <TableCell>{grant.recipient}</TableCell>
                      <ValueCell highlight={index === 0 && activeTab === 'highest'}>
                        {formatCurrency(grant.value)}
                      </ValueCell>
                      <SavingsCell>
                        {grant.savings ? formatCurrency(grant.savings) : '-'}
                      </SavingsCell>
                      <TableCell>
                        {grant.link ? (
                          <a href={grant.link} target="_blank" rel="noopener noreferrer">
                            View <FaExternalLinkAlt />
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <NoResults>
                No grants found matching your search criteria. Please try a different search.
              </NoResults>
            )}
          </TableContainer>
        </AnimatePresence>
        
        {displayedGrants.length > visibleCount && (
          <LoadMoreButton
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </LoadMoreButton>
        )}
      </DashboardContainer>
    </DashboardSection>
  );
};

export default Dashboard;