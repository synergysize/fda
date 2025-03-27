// Grant data retrieved from the DOGE API
        const grantData = {
            "success": true,
            "result": {
                "grants": [
                    {
                        "date": "3/1/2025",
                        "agency": "USAID",
                        "recipient": "GAVI FOUNDATION",
                        "value": 4000000000,
                        "savings": 0,
                        "link": "https://usaspending.gov/award/ASST_NON_7200GH21IO00002_7200",
                        "description": "NEW PIO GAVI COVAX-TO PREVENT, PREPARE FOR , AND RESPOND TO CORONAVIRUS, INCLUDING FOR VACCINE PROCUREMENT AND DELIVERY."
                    },
                    {
                        "date": "3/1/2025",
                        "agency": "USAID",
                        "recipient": "GAVI FOUNDATION",
                        "value": 2630000000,
                        "savings": 1750000000,
                        "link": "https://usaspending.gov/award/ASST_NON_7200GH22IO00006_7200",
                        "description": "THE 2021-2025 STRATEGY (GAVI 5.0), WHICH WAS APPROVED BY THE GAVI BOARD IN JUNE 2019, BUILDS ON THE ALLIANCE'S YEARS OF DEMONSTRATED SUCCESS AND STRIVES TOWARD ITS VISION TO "LEAVE NO ONE BEHIND WITH IMMUNIZATION." TO INCREASE COVERAGE AND EQUITY, GAVI 5.0 PRIORITIZES "ZERO-DOSE" CHILDREN WHO HAVE NOT RECEIVED A SINGLE VACCINE SHOT AS WELL AS MISSED COMMUNITIES. THE ZERO-DOSE AGENDA IS ALSO A KEY PRIORITY FOR THE GLOBAL COMMUNITY'S IMMUNIZATION AGENDA 2030, WHICH WAS ENDORSED BY THE WORLD HEALTH ASSEMBLY IN MAY 2020."
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "PUBLIC HEALTH FOUNDATION ENTERPRISES, INC",
                        "value": 1696424899,
                        "savings": 482383724,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "TX DEPT OF STATE HEALTH SERVICES",
                        "value": 1535405092,
                        "savings": 877628206,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/1/2025",
                        "agency": "USAID",
                        "recipient": "INTERNATIONAL BANK FOR RECONSTRUCTION AND DEVELOPMENT",
                        "value": 1300000000,
                        "savings": 372500000,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "HEALTH, FLORIDA DEPARTMENT OF",
                        "value": 1236223812,
                        "savings": 482136996,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "NEW YORK, CITY OF",
                        "value": 807512729,
                        "savings": 39516923,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "RESEARCH TRIANGLE INSTITUTE",
                        "value": 716790486,
                        "savings": 428698791,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "HEALTH RESEARCH, INC.",
                        "value": 700248982,
                        "savings": 62262226,
                        "link": null,
                        "description": null
                    },
                    {
                        "date": "3/23/2025",
                        "agency": "Department of Health and Human Services",
                        "recipient": "STATE OF OHIO - DEPARTMENT OF HEALTH",
                        "value": 672805694,
                        "savings": 220743894,
                        "link": null,
                        "description": null
                    }
                ]
            },
            "meta": {
                "total_results": 9221,
                "pages": 923
            }
        };

        const grants = grantData.result.grants;
        const chatBox = document.getElementById('chat-box');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const progressBar = document.getElementById('progress-bar');
        const refreshBtn = document.getElementById('refresh-data');
        const exportBtn = document.getElementById('export-report');
        
        // Energetic, bullish agent phrases
        const agentPhrases = [
            "🚀 EXCELLENT CHOICE! I'm pumped to dive into this data!",
            "💪 Let's CRUSH these efficiency targets!",
            "⚡ I'm detecting MASSIVE savings potential here!",
            "🔥 These numbers are HEATING UP! Check this out:",
            "🌟 Now we're COOKING! This is where the real value is:",
            "📈 BULLISH on these results! Take a look:",
            "🎯 TARGET ACQUIRED! Here's what I found:",
            "💰 JACKPOT! I've identified substantial savings here:",
            "🏆 WINNING STRATEGY! This data shows tremendous upside:",
            "💎 Found a GEM! This is high-impact information:"
        ];
        
        // Random agent phrase generator
        function getRandomPhrase() {
            const index = Math.floor(Math.random() * agentPhrases.length);
            return agentPhrases[index];
        }
        
        // Show loading progress
        function showProgress() {
            progressBar.style.width = '0%';
            progressBar.style.display = 'block';
            
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                        progressBar.style.display = 'none';
                    }, 300);
                } else {
                    width += 5;
                    progressBar.style.width = width + '%';
                }
            }, 30);
        }
        
        // Format currency numbers
        function formatCurrency(amount) {
            return '$' + amount.toLocaleString('en-US');
        }

        // Add user message to chat
        function addUserMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user-message';
            
            const messageInfo = document.createElement('div');
            messageInfo.className = 'message-info';
            messageInfo.textContent = 'YOU';
            
            const messageContent = document.createElement('div');
            messageContent.textContent = message;
            
            messageDiv.appendChild(messageInfo);
            messageDiv.appendChild(messageContent);
            
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        // Add agent typing indicator
        function addTypingIndicator() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message agent-message';
            messageDiv.id = 'typing-indicator';
            
            const messageInfo = document.createElement('div');
            messageInfo.className = 'message-info';
            messageInfo.textContent = 'AGENT D.O.G.E.';
            
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            
            messageDiv.appendChild(messageInfo);
            messageDiv.appendChild(indicator);
            
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // Add agent message to chat
        function addAgentMessage(message) {
            removeTypingIndicator();
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message agent-message';
            
            const messageInfo = document.createElement('div');
            messageInfo.className = 'message-info';
            messageInfo.textContent = 'AGENT D.O.G.E.';
            
            const messageContent = document.createElement('div');
            
            // Add the bullish phrase at the beginning
            messageContent.innerHTML = getRandomPhrase() + '<br><br>' + message;
            
            messageDiv.appendChild(messageInfo);
            messageDiv.appendChild(messageContent);
            
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        // Suggest a query (for chips)
        function suggestQuery(query) {
            userInput.value = query;
            processUserInput();
        }

        // Process user input and generate response
        function processUserInput() {
            const userMessage = userInput.value.trim();
            if (userMessage === '') return;

            addUserMessage(userMessage);
            userInput.value = '';
            
            // Show loading
            showProgress();
            
            // Show typing indicator
            addTypingIndicator();

            // Simulate processing delay
            setTimeout(() => {
                // Convert user message to lowercase for easier matching
                const query = userMessage.toLowerCase();
                let response = '';

                // Check for different types of questions
                if (query.includes('largest grant') || query.includes('biggest grant') || query.includes('highest value') || query.includes('top grant')) {
                    const largestGrant = grants[0]; // Grants are already sorted by value
                    response = `I've identified our TOP PERFORMER by value! This is a ${formatCurrency(largestGrant.value)} award to ${largestGrant.recipient} from ${largestGrant.agency}.<br><br>`;
                    
                    // Opportunity calculation
                    response += `<strong>💼 OPTIMIZATION OPPORTUNITY:</strong> Based on similar grants, we could achieve up to ${formatCurrency(largestGrant.value * 0.25)} in efficiency savings by implementing standardized processing protocols!<br><br>`;
                    
                    if (largestGrant.description) {
                        response += `<strong>Purpose:</strong> ${largestGrant.description}<br><br>`;
                    }
                    if (largestGrant.link) {
                        response += `<a href="${largestGrant.link}" target="_blank" style="color: #0071bc; font-weight: bold;">🔗 View complete award details on USASpending.gov</a>`;
                    }
                    
                    // Add proactive suggestion
                    response += `<div class="proactive-suggestions" style="margin-top: 15px;">
                        <div class="proactive-header">
                            <span class="proactive-icon">💡</span> Next Step Recommendation:
                        </div>
                        Analyze cost structure of this major grant to identify additional savings opportunities.
                        <div class="proactive-options">
                            <div class="proactive-option" onclick="suggestQuery('Compare GAVI grants')">
                                Compare with other GAVI Foundation grants
                            </div>
                        </div>
                    </div>`;
                } 
                else if (query.includes('saved the most') || query.includes('most savings') || query.includes('highest savings') || query.includes('top agency')) {
                    // Group by agency and calculate totals
                    const agencySummary = {};
                    grants.forEach(grant => {
                        if (!agencySummary[grant.agency]) {
                            agencySummary[grant.agency] = {
                                totalValue: 0,
                                totalSavings: 0,
                                count: 0,
                                grants: []
                            };
                        }
                        agencySummary[grant.agency].totalValue += grant.value;
                        agencySummary[grant.agency].totalSavings += grant.savings;
                        agencySummary[grant.agency].count += 1;
                        agencySummary[grant.agency].grants.push(grant);
                    });
                    
                    // Convert to array and sort by total savings
                    const agencyArray = Object.entries(agencySummary).map(([agency, data]) => ({
                        agency,
                        ...data
                    }));
                    
                    agencyArray.sort((a, b) => b.totalSavings - a.totalSavings);
                    
                    const topAgency = agencyArray[0];
                    const savingsPercentage = ((topAgency.totalSavings / topAgency.totalValue) * 100).toFixed(1);
                    
                    response = `<strong>🏆 TOP PERFORMER IDENTIFIED: ${topAgency.agency}</strong><br>
                    This agency is CRUSHING IT with ${formatCurrency(topAgency.totalSavings)} in total savings across ${topAgency.count} grants!<br>
                    That's a ${savingsPercentage}% efficiency ratio against ${formatCurrency(topAgency.totalValue)} in total value.<br><br>`;
                    
                    // Find the most efficient grant from this agency
                    topAgency.grants.sort((a, b) => (b.savings / b.value) - (a.savings / a.value));
                    const bestGrant = topAgency.grants[0];
                    const bestPercentage = ((bestGrant.savings / bestGrant.value) * 100).toFixed(1);
                    
                    response += `<strong>📊 STANDOUT GRANT:</strong> ${bestGrant.recipient} achieved an impressive ${bestPercentage}% savings ratio!<br><br>`;
                    
                    response += `<table>
                        <tr>
                            <th>Agency</th>
                            <th>Total Value</th>
                            <th>Total Savings</th>
                            <th>Efficiency</th>
                        </tr>`;
                    
                    agencyArray.slice(0, 3).forEach(agency => {
                        const efficiencyPercent = ((agency.totalSavings / agency.totalValue) * 100).toFixed(1);
                        response += `<tr>
                            <td><strong>${agency.agency}</strong></td>
                            <td>${formatCurrency(agency.totalValue)}</td>
                            <td>${formatCurrency(agency.totalSavings)}</td>
                            <td>${efficiencyPercent}%</td>
                        </tr>`;
                    });
                    
                    response += `</table>`;
                    
                    // Action-oriented conclusion
                    response += `<br><strong>🚀 RECOMMENDATION:</strong> Let's adopt ${topAgency.agency}'s successful practices across other agencies to maximize taxpayer value!`;
                }
                else if (query.includes('gavi') || query.includes('foundation')) {
                    const gaviGrants = grants.filter(grant => grant.recipient.toLowerCase().includes('gavi'));
                    if (gaviGrants.length > 0) {
                        let totalValue = 0;
                        let totalSavings = 0;
                        
                        gaviGrants.forEach(grant => {
                            totalValue += grant.value;
                            totalSavings += grant.savings;
                        });
                        
                        const savingsPercentage = ((totalSavings / totalValue) * 100).toFixed(1);
                        
                        response = `<strong>GAVI Foundation Analysis Complete!</strong><br><br>
                        Total funding: ${formatCurrency(totalValue)}<br>
                        Current savings: ${formatCurrency(totalSavings)} (${savingsPercentage}% efficiency)<br><br>
                        
                        <strong>💪 OPTIMIZATION TARGET:</strong> I project we can increase savings by an additional 15-20% through improved grant management!<br><br>`;
                        
                        // Find the grant with zero savings
                        const zeroSavingsGrant = gaviGrants.find(g => g.savings === 0);
                        if (zeroSavingsGrant) {
                            const potentialSavings = Math.round(zeroSavingsGrant.value * 0.15);
                            response += `<strong>🔍 HIGH-PRIORITY OPPORTUNITY:</strong> The ${formatCurrency(zeroSavingsGrant.value)} grant currently shows NO SAVINGS. By implementing standard efficiency measures, we could potentially save up to ${formatCurrency(potentialSavings)}!<br><br>`;
                        }
                        
                        response += `<table>
                            <tr>
                                <th>Date</th>
                                <th>Value</th>
                                <th>Savings</th>
                                <th>Efficiency</th>
                                <th>Status</th>
                            </tr>`;
                        
                        gaviGrants.forEach(grant => {
                            const efficiencyPercent = grant.value > 0 ? ((grant.savings / grant.value) * 100).toFixed(1) : '0.0';
                            const status = grant.savings === 0 ? '<span style="color: var(--accent-color);">ACTION NEEDED</span>' : 
                                         efficiencyPercent > 20 ? '<span style="color: var(--success-color);">OPTIMIZED</span>' : 
                                         '<span style="color: #fdb81e;">REVIEW</span>';
                            
                            response += `<tr>
                                <td>${grant.date}</td>
                                <td>${formatCurrency(grant.value)}</td>
                                <td>${formatCurrency(grant.savings)}</td>
                                <td>${efficiencyPercent}%</td>
                                <td>${status}</td>
                            </tr>`;
                        });
                        
                        response += `</table>`;
                    } else {
                        response = "I couldn't find any grants specifically for GAVI Foundation in the current dataset. Let me expand my search parameters for you.";
                    }
                }
                else if (query.includes('total savings') || query.includes('saved in total') || query.includes('total amount saved')) {
                    const totalSavings = grants.reduce((sum, grant) => sum + grant.savings, 0);
                    const totalValue = grants.reduce((sum, grant) => sum + grant.value, 0);
                    const savingsPercentage = ((totalSavings / totalValue) * 100).toFixed(1);
                    
                    response = `<strong>💰 TOTAL SAVINGS: ${formatCurrency(totalSavings)}</strong><br><br>
                    That's an overall efficiency ratio of ${savingsPercentage}% against ${formatCurrency(totalValue)} in total grant funding!<br><br>
                    
                    <strong>🔥 THE BIG PICTURE:</strong> If we applied this efficiency ratio to all 9,221 grants in our database, potential savings could reach up to ${formatCurrency(totalSavings * 9)}!<br><br>
                    
                    <strong>📈 PERFORMANCE METRICS:</strong><br>
                    - 8 out of 10 grants show measurable savings<br>
                    - The average savings per grant is ${formatCurrency(totalSavings / grants.length)}<br>
                    - Top 3 grants account for ${formatCurrency(grants.slice(0, 3).reduce((sum, g) => sum + g.savings, 0))} in savings<br><br>
                    
                    <strong>🚀 LET'S ACCELERATE!</strong> I've identified potential for an additional ${formatCurrency(totalSavings * 0.3)} in savings through targeted optimization strategies.`;
                    
                    // Add bullish call to action
                    response += `<div class="proactive-suggestions" style="margin-top: 15px;">
                        <div class="proactive-header">
                            <span class="proactive-icon">🚀</span> Next Steps:
                        </div>
                        Let's target the grants with 0% savings - they represent our biggest opportunity to increase efficiency!
                        <div class="proactive-options">
                            <div class="proactive-option" onclick="suggestQuery('Show grants with no savings')">
                                Identify grants with zero savings
                            </div>
                        </div>
                    </div>`;
                }
                else if (query.includes('compare hhs') || query.includes('compare department of health')) {
                    const hhsGrants = grants.filter(g => g.agency.toLowerCase().includes('health'));
                    const usaidGrants = grants.filter(g => g.agency.toLowerCase().includes('usaid'));
                    
                    let hhsTotal = 0, hhsSavings = 0, usaidTotal = 0, usaidSavings = 0;
                    
                    hhsGrants.forEach(g => {
                        hhsTotal += g.value;
                        hhsSavings += g.savings;
                    });
                    
                    usaidGrants.forEach(g => {
                        usaidTotal += g.value;
                        usaidSavings += g.savings;
                    });
                    
                    const hhsEfficiency = ((hhsSavings / hhsTotal) * 100).toFixed(1);
                    const usaidEfficiency = ((usaidSavings / usaidTotal) * 100).toFixed(1);
                    
                    const winner = hhsEfficiency > usaidEfficiency ? 'HHS' : 'USAID';
                    const winnerEfficiency = hhsEfficiency > usaidEfficiency ? hhsEfficiency : usaidEfficiency;
                    
                    const diffPercentage = Math.abs(hhsEfficiency - usaidEfficiency).toFixed(1);
                    
                    response = `<strong>🏆 AGENCY SHOWDOWN: HHS vs USAID</strong><br><br>
                    
                    <table>
                        <tr>
                            <th>Metric</th>
                            <th>HHS</th>
                            <th>USAID</th>
                        </tr>
                        <tr>
                            <td>Total Grants Value</td>
                            <td>${formatCurrency(hhsTotal)}</td>
                            <td>${formatCurrency(usaidTotal)}</td>
                        </tr>
                        <tr>
                            <td>Total Savings</td>
                            <td>${formatCurrency(hhsSavings)}</td>
                            <td>${formatCurrency(usaidSavings)}</td>
                        </tr>
                        <tr>
                            <td>Efficiency Ratio</td>
                            <td>${hhsEfficiency}%</td>
                            <td>${usaidEfficiency}%</td>
                        </tr>
                    </table><br>
                    
                    <strong>📊 VERDICT:</strong> ${winner} is leading with a ${winnerEfficiency}% efficiency ratio - that's ${diffPercentage}% better performance!<br><br>
                    
                    <strong>💰 OPPORTUNITY:</strong> If the lower-performing agency matched this efficiency, we'd generate an additional ${formatCurrency(usaidTotal * (hhsEfficiency - usaidEfficiency) / 100)} in savings!<br><br>
                    
                    <strong>🔑 KEY INSIGHT:</strong> The high-performing grants from ${winner} all share common efficiency practices we should implement government-wide.`;
                }
                else if (query.includes('highest saving percentage') || query.includes('highest efficiency ratio')) {
                    const grantsWithSavings = grants.filter(g => g.savings > 0);
                    grantsWithSavings.sort((a, b) => (b.savings / b.value) - (a.savings / a.value));
                    
                    const topGrant = grantsWithSavings[0];
                    const efficiencyPercent = ((topGrant.savings / topGrant.value) * 100).toFixed(1);
                    
                    response = `<strong>🏆 TOP EFFICIENCY PERFORMER IDENTIFIED!</strong><br><br>
                    ${topGrant.recipient} achieved an IMPRESSIVE ${efficiencyPercent}% savings ratio on their ${formatCurrency(topGrant.value)} grant!<br><br>
                    
                    <strong>🔍 DETAILS:</strong><br>
                    - Agency: ${topGrant.agency}<br>
                    - Date: ${topGrant.date}<br>
                    - Grant Value: ${formatCurrency(topGrant.value)}<br>
                    - Savings: ${formatCurrency(topGrant.savings)} (${efficiencyPercent}%)<br><br>
                    
                    <strong>💡 BREAKTHROUGH FINDING:</strong> If all grants matched this efficiency ratio, we'd save an additional ${formatCurrency(grants.reduce((total, g) => total + g.value, 0) * (topGrant.savings / topGrant.value) - grants.reduce((total, g) => total + g.savings, 0))}!<br><br>
                    
                    <strong>🚀 RECOMMENDATION:</strong> Let's study this grant's implementation strategy and create a template for all agencies to follow.`;
                    
                    // Table of top performers
                    response += `<br><br><strong>Top 3 Efficiency Performers:</strong><br>
                    <table>
                        <tr>
                            <th>Recipient</th>
                            <th>Value</th>
                            <th>Savings</th>
                            <th>Efficiency</th>
                        </tr>`;
                    
                    grantsWithSavings.slice(0, 3).forEach(grant => {
                        const percent = ((grant.savings / grant.value) * 100).toFixed(1);
                        response += `<tr>
                            <td>${grant.recipient}</td>
                            <td>${formatCurrency(grant.value)}</td>
                            <td>${formatCurrency(grant.savings)}</td>
                            <td>${percent}%</td>
                        </tr>`;
                    });
                    
                    response += `</table>`;
                }
                else if (query.includes('grants with no savings') || query.includes('zero savings')) {
                    const zeroSavingsGrants = grants.filter(g => g.savings === 0);
                    
                    if (zeroSavingsGrants.length > 0) {
                        const totalValue = zeroSavingsGrants.reduce((total, g) => total + g.value, 0);
                        const potentialSavings = Math.round(totalValue * 0.15);
                        
                        response = `<strong>🔍 OPPORTUNITY ALERT: ${zeroSavingsGrants.length} Grants With Zero Savings</strong><br><br>
                        
                        I've identified ${zeroSavingsGrants.length} grants totaling ${formatCurrency(totalValue)} with NO recorded savings.<br><br>
                        
                        <strong>💰 MASSIVE POTENTIAL:</strong> By applying our standard efficiency practices, we could generate up to ${formatCurrency(potentialSavings)} in new savings!<br><br>
                        
                        <table>
                            <tr>
                                <th>Recipient</th>
                                <th>Agency</th>
                                <th>Value</th>
                                <th>Potential Savings</th>
                            </tr>`;
                        
                        zeroSavingsGrants.forEach(grant => {
                            const potential = Math.round(grant.value * 0.15);
                            response += `<tr>
                                <td>${grant.recipient}</td>
                                <td>${grant.agency}</td>
                                <td>${formatCurrency(grant.value)}</td>
                                <td>${formatCurrency(potential)}</td>
                            </tr>`;
                        });
                        
                        response += `</table><br>
                        
                        <strong>🚀 ACTION PLAN:</strong> I recommend immediate review of these grants to implement our proven efficiency measures.`;
                    } else {
                        response = "OUTSTANDING NEWS! All grants in our current dataset show some level of savings. This is UNPRECEDENTED efficiency!";
                    }
                }
                else if (query.includes('list all') || query.includes('show all') || query.includes('all grants')) {
                    // Calculate total potential savings
                    const totalValue = grants.reduce((sum, g) => sum + g.value, 0);
                    const totalSavings = grants.reduce((sum, g) => sum + g.savings, 0);
                    const highestEfficiency = Math.max(...grants.filter(g => g.savings > 0).map(g => g.savings / g.value));
                    const potentialSavings = totalValue * highestEfficiency - totalSavings;
                    
                    response = `<strong>📊 GRANT PORTFOLIO OVERVIEW</strong><br><br>
                    <strong>Portfolio Stats:</strong><br>
                    - Total Value: ${formatCurrency(totalValue)}<br>
                    - Current Savings: ${formatCurrency(totalSavings)}<br>
                    - Additional Potential: ${formatCurrency(potentialSavings)}<br><br>
                    
                    <strong>All Grants by Value (Descending):</strong><br>
                    <table>
                        <tr>
                            <th>Recipient</th>
                            <th>Agency</th>
                            <th>Value</th>
                            <th>Savings</th>
                            <th>Status</th>
                        </tr>`;
                    
                    grants.forEach(grant => {
                        // Calculate percentage if savings exist
                        const efficiencyPercent = grant.savings > 0 ? ((grant.savings / grant.value) * 100).toFixed(1) : '0.0';
                        
                        // Determine status
                        let status = '';
                        if (grant.savings === 0) {
                            status = '<span style="color: var(--accent-color);">ACTION NEEDED</span>';
                        } else if (efficiencyPercent > 30) {
                            status = '<span style="color: var(--success-color);">OPTIMIZED</span>';
                        } else if (efficiencyPercent > 15) {
                            status = '<span style="color: #fdb81e;">GOOD</span>';
                        } else {
                            status = '<span style="color: #5b616b;">REVIEW</span>';
                        }
                        
                        response += `<tr>
                            <td>${grant.recipient}</td>
                            <td>${grant.agency}</td>
                            <td>${formatCurrency(grant.value)}</td>
                            <td>${formatCurrency(grant.savings)} (${efficiencyPercent}%)</td>
                            <td>${status}</td>
                        </tr>`;
                    });
                    
                    response += `</table>`;
                }
                else {
                    response = `I'm eager to help optimize our grant efficiency! You can ask me about:<br><br>
                    • The largest grants and their savings potential<br>
                    • Which agencies are most efficient with taxpayer funds<br>
                    • Specific recipients like GAVI Foundation<br>
                    • Total savings and opportunities for improvement<br>
                    • Grants with zero savings (our biggest opportunity!)<br>
                    • Detailed comparison between agencies<br><br>
                    
                    Let's work together to MAXIMIZE EFFICIENCY and deliver exceptional value to taxpayers!`;
                }

                addAgentMessage(response);
            }, 1500);
        }

        // Event listeners
        sendBtn.addEventListener('click', processUserInput);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                processUserInput();
            }
        });
        
        // Button functionality
        refreshBtn.addEventListener('click', function() {
            showProgress();
            setTimeout(() => {
                addAgentMessage("I've refreshed the grant database with the latest data. All metrics are now current as of " + new Date().toLocaleDateString() + ". Ready to continue our efficiency optimization!");
            }, 1200);
        });
        
        exportBtn.addEventListener('click', function() {
            showProgress();
            setTimeout(() => {
                addAgentMessage("I've generated a comprehensive Savings Opportunity Report! If this were a real system, a PDF would be downloading now. The report includes all optimization recommendations and projected savings of $4.2B across all analyzed grants.");
            }, 1200);
        });
        
        // Initial loading effect
        window.addEventListener('load', function() {
            showProgress();
        });