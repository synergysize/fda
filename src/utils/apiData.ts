import dogeData from '../data/doge_api_data.json';

export interface Grant {
  date: string;
  agency: string;
  recipient: string;
  value: number;
  savings: number;
  link: string | null;
  description: string | null;
}

export interface DogeApiResponse {
  success: boolean;
  result: {
    grants: Grant[];
  };
  meta: {
    total_results: number;
    pages: number;
  };
}

export const getDogeApiData = (): DogeApiResponse => {
  return dogeData as DogeApiResponse;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const getTopAgencies = (): { agency: string; totalValue: number }[] => {
  const data = getDogeApiData();
  const agencies = data.result.grants.reduce((acc, grant) => {
    if (!acc[grant.agency]) {
      acc[grant.agency] = 0;
    }
    acc[grant.agency] += grant.value;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(agencies)
    .map(([agency, totalValue]) => ({ agency, totalValue }))
    .sort((a, b) => b.totalValue - a.totalValue);
};

export const getTotalSavings = (): number => {
  const data = getDogeApiData();
  return data.result.grants.reduce((acc, grant) => acc + (grant.savings || 0), 0);
};

export const getTotalAllocations = (): number => {
  const data = getDogeApiData();
  return data.result.grants.reduce((acc, grant) => acc + grant.value, 0);
};

export const getRecipientCount = (): number => {
  const data = getDogeApiData();
  const uniqueRecipients = new Set(data.result.grants.map(grant => grant.recipient));
  return uniqueRecipients.size;
};

// Function to search for information in the API data
export const searchInApiData = (query: string): Grant[] => {
  const data = getDogeApiData();
  const lowerCaseQuery = query.toLowerCase();
  
  return data.result.grants.filter(grant => 
    (grant.agency && grant.agency.toLowerCase().includes(lowerCaseQuery)) ||
    (grant.recipient && grant.recipient.toLowerCase().includes(lowerCaseQuery)) ||
    (grant.description && grant.description.toLowerCase().includes(lowerCaseQuery))
  );
};

// For the chatbot to answer questions about grants
export const answerQuestion = (question: string): string => {
  const lowerCaseQuestion = question.toLowerCase();
  
  // Check for specific question patterns
  if (lowerCaseQuestion.includes('highest grant') || lowerCaseQuestion.includes('largest grant')) {
    const data = getDogeApiData();
    const highestGrant = data.result.grants.reduce((prev, current) => 
      (prev.value > current.value) ? prev : current
    );
    
    return `The highest grant is ${formatCurrency(highestGrant.value)} awarded to ${highestGrant.recipient} by ${highestGrant.agency} on ${highestGrant.date}.`;
  }
  
  if (lowerCaseQuestion.includes('total saving') || lowerCaseQuestion.includes('total savings')) {
    return `The total savings across all grants is ${formatCurrency(getTotalSavings())}.`;
  }
  
  if (lowerCaseQuestion.includes('total allocation') || lowerCaseQuestion.includes('total value')) {
    return `The total value of all grants is ${formatCurrency(getTotalAllocations())}.`;
  }
  
  if (lowerCaseQuestion.includes('how many recipient') || lowerCaseQuestion.includes('number of recipient')) {
    return `There are ${getRecipientCount()} unique recipients in the current dataset.`;
  }
  
  if (lowerCaseQuestion.includes('top agency') || lowerCaseQuestion.includes('highest funding agency')) {
    const topAgencies = getTopAgencies();
    return `The top funding agency is ${topAgencies[0].agency} with a total allocation of ${formatCurrency(topAgencies[0].totalValue)}.`;
  }

  // Search for specific entity in the question
  const searchTerms = lowerCaseQuestion.split(' ').filter(word => word.length > 3);
  for (const term of searchTerms) {
    const results = searchInApiData(term);
    if (results.length > 0) {
      const result = results[0];
      return `I found information about ${result.recipient}: They received ${formatCurrency(result.value)} from ${result.agency} on ${result.date}${result.description ? `. Description: ${result.description}` : ''}.`;
    }
  }
  
  // Default response if no specific information is found
  return "I can provide information about grants from the DOGE API. You can ask about the highest grants, total savings, specific agencies, or recipients.";
};