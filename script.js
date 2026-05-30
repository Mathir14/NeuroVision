// Global navigation
let currentTest = null;

// ========== SCORE STORAGE SYSTEM ==========
const STORAGE_KEY = 'neurotest_scores';

function saveScore(testName, scoreData) {
    try {
        // Get existing scores
        const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        // Initialize test array if doesn't exist
        if (!allScores[testName]) {
            allScores[testName] = [];
        }
        
        // Add timestamp to score
        const scoreWithTimestamp = {
            ...scoreData,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        
        // Add score to array
        allScores[testName].push(scoreWithTimestamp);
        
        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allScores));
        
        console.log(`Saved score for ${testName}:`, scoreWithTimestamp);
        return true;
    } catch (error) {
        console.error('Error saving score:', error);
        return false;
    }
}

function getScores(testName) {
    try {
        const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return allScores[testName] || [];
    } catch (error) {
        console.error('Error loading scores:', error);
        return [];
    }
}

function getAllScores() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
        console.error('Error loading all scores:', error);
        return {};
    }
}

function clearScores(testName) {
    try {
        if (testName) {
            const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            delete allScores[testName];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allScores));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
        return true;
    } catch (error) {
        console.error('Error clearing scores:', error);
        return false;
    }
}

function getTestStats(testName) {
    const scores = getScores(testName);
    if (scores.length === 0) return null;
    
    return {
        totalAttempts: scores.length,
        total: scores.length,
        latest: scores[scores.length - 1],
        firstPlayed: scores[0].date,
        lastPlayed: scores[scores.length - 1].date
    };
}

function loadTest(testName) {
    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('assessments-page').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    
    if (testName === 'reaction') {
        currentTest = 'reaction';
        document.getElementById('reaction-test').classList.remove('hidden');
        initReactionTest();
    } else if (testName === 'number-memory') {
        currentTest = 'number-memory';
        document.getElementById('number-memory-test').classList.remove('hidden');
        initNumberMemory();
    } else if (testName === 'sequence-memory') {
        currentTest = 'sequence-memory';
        document.getElementById('sequence-memory-test').classList.remove('hidden');
        initSequenceMemory();
    } else if (testName === 'key-tapping') {
        currentTest = 'key-tapping';
        document.getElementById('key-tapping-test').classList.remove('hidden');
        initKeyTapping();
    } else if (testName === 'verbal-memory') {
        currentTest = 'verbal-memory';
        document.getElementById('verbal-memory-test').classList.remove('hidden');
        initVerbalMemory();
    } else if (testName === 'drawing-accuracy') {
        currentTest = 'drawing-accuracy';
        document.getElementById('drawing-accuracy-test').classList.remove('hidden');
        initDrawingAccuracy();
    } else if (testName === 'speech-test') {
        currentTest = 'speech-test';
        document.getElementById('speech-test').classList.remove('hidden');
        initSpeechTest();
    } else if (testName === 'hand-stability') {
        currentTest = 'hand-stability';
        document.getElementById('hand-stability-test').classList.remove('hidden');
        initHandStability();
    } else if (testName === 'tug-test') {
        currentTest = 'tug-test';
        document.getElementById('tug-test').classList.remove('hidden');
        initTugTest();
    }
}

function goHome() {
    // Hide all tests
    document.getElementById('reaction-test').classList.add('hidden');
    document.getElementById('number-memory-test').classList.add('hidden');
    document.getElementById('sequence-memory-test').classList.add('hidden');
    document.getElementById('key-tapping-test').classList.add('hidden');
    document.getElementById('verbal-memory-test').classList.add('hidden');
    document.getElementById('drawing-accuracy-test').classList.add('hidden');
    document.getElementById('speech-test').classList.add('hidden');
    document.getElementById('hand-stability-test').classList.add('hidden');
    document.getElementById('tug-test').classList.add('hidden');
    
    // Reset tests
    if (currentTest === 'reaction') {
        resetReactionTest();
    } else if (currentTest === 'number-memory') {
        resetNumberMemory();
    } else if (currentTest === 'sequence-memory') {
        resetSequenceMemory();
    } else if (currentTest === 'key-tapping') {
        resetKeyTapping();
    } else if (currentTest === 'verbal-memory') {
        resetVerbalMemory();
    } else if (currentTest === 'drawing-accuracy') {
        resetDrawingAccuracy();
    } else if (currentTest === 'speech-test') {
        resetSpeechTest();
    } else if (currentTest === 'hand-stability') {
        resetHandStability();
    } else if (currentTest === 'tug-test') {
        resetTugTest();
    }
    
    // Hide dashboard if open
    document.getElementById('dashboard').classList.add('hidden');
    
    // Hide assessments page if open
    const assessmentsPage = document.getElementById('assessments-page');
    if (assessmentsPage) {
        assessmentsPage.classList.add('hidden');
    }
    
    // Show home menu
    document.getElementById('home-menu').classList.remove('hidden');
    currentTest = null;
    
    // Update homepage stats
    updateHomeStats();
}

function showAssessments() {
    // Hide home menu and dashboard
    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('reaction-test').classList.add('hidden');
    document.getElementById('number-memory-test').classList.add('hidden');
    document.getElementById('sequence-memory-test').classList.add('hidden');
    document.getElementById('key-tapping-test').classList.add('hidden');
    document.getElementById('verbal-memory-test').classList.add('hidden');
    document.getElementById('drawing-accuracy-test').classList.add('hidden');
    document.getElementById('speech-test').classList.add('hidden');
    document.getElementById('hand-stability-test').classList.add('hidden');
    document.getElementById('tug-test').classList.add('hidden');
    
    // Show assessments page
    document.getElementById('assessments-page').classList.remove('hidden');
}

function updateHomeStats() {
    const allScores = getAllScores();
    const testNames = Object.keys(allScores);
    
    // Calculate total tests completed
    let totalTests = 0;
    testNames.forEach(testName => {
        totalTests += allScores[testName].length;
    });
    
    // Update total tests
    const totalTestsEl = document.getElementById('home-total-tests');
    if (totalTestsEl) {
        totalTestsEl.textContent = totalTests;
    }
    
    // Find most recent test
    let mostRecent = null;
    let mostRecentDate = null;
    
    testNames.forEach(testName => {
        const scores = allScores[testName];
        if (scores.length > 0) {
            const latest = scores[scores.length - 1];
            const latestDate = new Date(latest.timestamp);
            
            if (!mostRecentDate || latestDate > mostRecentDate) {
                mostRecentDate = latestDate;
                mostRecent = {
                    name: testName,
                    ...latest
                };
            }
        }
    });
    
    // Update recent test
    const recentTestEl = document.getElementById('home-recent-test');
    if (recentTestEl) {
        if (mostRecent) {
            const testNameMap = {
                'reaction-time': 'Reaction Time',
                'number-memory': 'Number Memory',
                'sequence-memory': 'Sequence Memory',
                'key-tapping': 'Finger Tapping',
                'verbal-memory': 'Verbal Memory',
                'drawing-accuracy': 'Drawing Accuracy',
                'speech-test': 'Speech Recognition',
                'hand-stability': 'Hand Stability',
                'tug-test': 'Timed Up & Go'
            };
            recentTestEl.textContent = testNameMap[mostRecent.name] || mostRecent.name;
        } else {
            recentTestEl.textContent = 'No tests completed yet';
        }
    }
}

// Initialize home stats on page load
document.addEventListener('DOMContentLoaded', function() {
    updateHomeStats();
});

// ========== HOME PAGE CHATBOT ==========
let homeChatHistory = [];

function handleHomeChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendHomeMessage();
    }
}

async function sendHomeMessage() {
    const input = document.getElementById('home-chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    const messagesContainer = document.getElementById('home-chat-messages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user-message';
    userMessageDiv.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
    messagesContainer.appendChild(userMessageDiv);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to history
    homeChatHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = `<div class="message-content"><p>Thinking...</p></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
        // Get all scores for context
        const allScores = getAllScores();
        const scoresContext = JSON.stringify(allScores, null, 2);
        
        // Prepare messages for AI
        const systemMessage = {
            role: 'system',
            content: `You are a helpful AI assistant for a cognitive assessment platform called NeuroTest. You help users understand their test results and provide guidance. Here are the user's scores: ${scoresContext}`
        };
        
        const messages = [systemMessage, ...homeChatHistory];
        
        // Call Groq API
        const response = await fetch('/.netlify/functions/groq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Add AI response to history
        homeChatHistory.push({ role: 'assistant', content: aiResponse });
        
        // Remove typing indicator
        messagesContainer.removeChild(typingDiv);
        
        // Add AI response to chat
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'chat-message bot-message';
        aiMessageDiv.innerHTML = `<div class="message-content"><p>${aiResponse}</p></div>`;
        messagesContainer.appendChild(aiMessageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
    } catch (error) {
        console.error('Error calling Groq API:', error);
        
        // Remove typing indicator
        messagesContainer.removeChild(typingDiv);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'chat-message bot-message error-message';
        errorDiv.innerHTML = `<div class="message-content"><p>Sorry, I encountered an error. Please try again.</p></div>`;
        messagesContainer.appendChild(errorDiv);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// ========== AI CHATBOT ==========
const GROQ_API_URL = '/.netlify/functions/groq';
let chatHistory = [];

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.toggle('hidden');
    
    if (!chatContainer.classList.contains('hidden')) {
        document.getElementById('chat-input').focus();
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Add to chat history
    chatHistory.push({
        role: 'user',
        content: message
    });
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
        // Get user's test data and analyze it
        const allScores = getAllScores();
        const analysis = analyzeUserPerformance(allScores);
        
        // Prepare detailed context message
        const contextMessage = `
CURRENT USER PERFORMANCE ANALYSIS:

${analysis.summary}

DETAILED TEST BREAKDOWN:
${analysis.details}

Use this data to provide personalized, specific feedback. When user asks about their performance, refer to actual numbers. Identify patterns, strengths, and areas for improvement.
`;
        
        // Prepare messages for API
        const messages = [
            {
                role: 'system',
                content: `You are an expert cognitive performance analyst and coach. You're helping users improve their cognitive abilities through 9 different tests:

1. Reaction Time (lower is better) - measures visual reflexes
2. Number Memory (higher is better) - measures short-term memory capacity
3. Sequence Memory (higher is better) - measures visual-spatial memory
4. Finger Tapping (higher is better) - measures motor speed (Parkinson's indicator)
5. Verbal Memory (higher is better) - measures word recognition
6. Drawing Accuracy (higher is better) - measures motor control
7. Speech Recognition (higher is better) - measures articulation
8. Hand Stability (higher is better) - measures tremor (neurological indicator)
9. TUG Test (lower is better) - measures fall risk and mobility

${contextMessage}

Provide friendly, specific, evidence-based advice. Use emojis occasionally. Keep responses concise but insightful. Celebrate improvements and provide actionable tips for areas needing work.`
            },
            ...chatHistory.slice(-10) // Keep last 10 messages for context
        ];
        
        // Call Groq AI API
        const response = await fetch('/.netlify/functions/groq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 600
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get response from AI');
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add AI response to chat
        addMessageToChat(aiResponse, 'bot');
        
        // Add to chat history
        chatHistory.push({
            role: 'assistant',
            content: aiResponse
        });
        
    } catch (error) {
        console.error('Chat error:', error);
        typingIndicator.remove();
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'bot');
    }
    
    // Scroll to bottom
    scrollChatToBottom();
}

function analyzeUserPerformance(allScores) {
    let summary = '';
    let details = '';
    
    if (Object.keys(allScores).length === 0) {
        return {
            summary: 'No test data available yet. User hasn\'t completed any tests.',
            details: 'Encourage the user to try the tests!'
        };
    }
    
    const testConfigs = {
        'reaction-time': { name: 'Reaction Time', unit: 'ms', key: 'best', invertBest: true },
        'number-memory': { name: 'Number Memory', unit: 'levels', key: 'level', invertBest: false },
        'sequence-memory': { name: 'Sequence Memory', unit: 'levels', key: 'level', invertBest: false },
        'finger-tapping': { name: 'Finger Tapping', unit: 'taps', key: 'totalTaps', invertBest: false },
        'verbal-memory': { name: 'Verbal Memory', unit: 'words', key: 'score', invertBest: false },
        'drawing-accuracy': { name: 'Drawing Accuracy', unit: '%', key: 'accuracy', invertBest: false },
        'speech-recognition': { name: 'Speech Test', unit: '%', key: 'averageAccuracy', invertBest: false },
        'hand-stability': { name: 'Hand Stability', unit: '%', key: 'stabilityScore', invertBest: false },
        'tug-test': { name: 'TUG Test', unit: 's', key: 'totalTime', invertBest: true }
    };
    
    let testsCompleted = 0;
    let improvingTests = [];
    let decliningTests = [];
    
    for (const [testName, config] of Object.entries(testConfigs)) {
        const scores = allScores[testName];
        if (!scores || scores.length === 0) continue;
        
        testsCompleted++;
        const dataPoints = scores.map(s => s[config.key]);
        const latest = dataPoints[dataPoints.length - 1];
        const best = config.invertBest ? Math.min(...dataPoints) : Math.max(...dataPoints);
        const avg = (dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length).toFixed(1);
        
        // Calculate trend
        if (scores.length >= 3) {
            const firstHalf = dataPoints.slice(0, Math.ceil(dataPoints.length / 2));
            const secondHalf = dataPoints.slice(Math.floor(dataPoints.length / 2));
            const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
            const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
            
            const percentChange = (((secondAvg - firstAvg) / firstAvg) * 100).toFixed(1);
            let trend = 'stable';
            
            if (config.invertBest) {
                if (secondAvg < firstAvg) trend = 'improving';
                else if (secondAvg > firstAvg) trend = 'declining';
            } else {
                if (secondAvg > firstAvg) trend = 'improving';
                else if (secondAvg < firstAvg) trend = 'declining';
            }
            
            if (trend === 'improving') improvingTests.push(config.name);
            if (trend === 'declining') decliningTests.push(config.name);
            
            details += `\n${config.name}:
  - Attempts: ${scores.length}
  - Best: ${best}${config.unit}
  - Average: ${avg}${config.unit}
  - Latest: ${latest}${config.unit}
  - Trend: ${trend.toUpperCase()} (${percentChange > 0 ? '+' : ''}${percentChange}% change)
  - Status: ${latest === best ? '🏆 Personal best!' : best > latest ? `${((best - latest) / best * 100).toFixed(1)}% below best` : `${((latest - best) / best * 100).toFixed(1)}% above best`}`;
        } else {
            details += `\n${config.name}:
  - Attempts: ${scores.length}
  - Best: ${best}${config.unit}
  - Average: ${avg}${config.unit}
  - Latest: ${latest}${config.unit}
  - Trend: INSUFFICIENT DATA (need 3+ attempts)`;
        }
    }
    
    summary = `User has completed ${testsCompleted} out of 9 tests.`;
    if (improvingTests.length > 0) {
        summary += `\n✅ IMPROVING: ${improvingTests.join(', ')}`;
    }
    if (decliningTests.length > 0) {
        summary += `\n⚠️ DECLINING: ${decliningTests.join(', ')}`;
    }
    if (improvingTests.length === 0 && decliningTests.length === 0 && testsCompleted > 0) {
        summary += '\n➡️ Performance is STABLE across all tests';
    }
    
    return { summary, details };
}

function addMessageToChat(message, type) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = message;
    
    contentDiv.appendChild(p);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    scrollChatToBottom();
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    contentDiv.appendChild(typingDiv);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    scrollChatToBottom();
    return messageDiv;
}

function scrollChatToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ========== DASHBOARD ==========
function showDashboard() {
    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('assessments-page').classList.add('hidden');
    document.getElementById('reaction-test').classList.add('hidden');
    document.getElementById('number-memory-test').classList.add('hidden');
    document.getElementById('sequence-memory-test').classList.add('hidden');
    document.getElementById('key-tapping-test').classList.add('hidden');
    document.getElementById('verbal-memory-test').classList.add('hidden');
    document.getElementById('drawing-accuracy-test').classList.add('hidden');
    document.getElementById('speech-test').classList.add('hidden');
    document.getElementById('hand-stability-test').classList.add('hidden');
    document.getElementById('tug-test').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    currentTest = 'dashboard';
    renderDashboard();
}

function renderDashboard() {
    const dashboardContent = document.getElementById('dashboard-content');
    const allScores = getAllScores();
    
    console.log('All scores:', allScores);
    console.log('Number of tests with data:', Object.keys(allScores).length);
    
    const testCategories = {
        'Memory & Cognition': [
            { id: 'reaction-time', name: 'Reaction Time', icon: '⚡', unit: 'ms', invertBest: true, key: 'best' },
            { id: 'number-memory', name: 'Number Memory', icon: '🔢', unit: ' Level', invertBest: false, key: 'level' },
            { id: 'sequence-memory', name: 'Sequence Memory', icon: '🎯', unit: ' Level', invertBest: false, key: 'level' },
            { id: 'verbal-memory', name: 'Verbal Memory', icon: '💬', unit: ' words', invertBest: false, key: 'score' }
        ],
        'Motor & Coordination': [
            { id: 'finger-tapping', name: 'Finger Tapping', icon: '⌨️', unit: ' taps', invertBest: false, key: 'totalTaps' },
            { id: 'drawing-accuracy', name: 'Drawing Accuracy', icon: '✏️', unit: '%', invertBest: false, key: 'accuracy' },
            { id: 'hand-stability', name: 'Hand Stability', icon: '✋', unit: '%', invertBest: false, key: 'stabilityScore' }
        ],
        'Clinical Assessment': [
            { id: 'speech-recognition', name: 'Speech Test', icon: '🎤', unit: '%', invertBest: false, key: 'averageAccuracy' },
            { id: 'tug-test', name: 'Walking & Turning', icon: '🚶', unit: 's', invertBest: true, key: 'totalTime' }
        ]
    };
    
    if (Object.keys(allScores).length === 0) {
        dashboardContent.innerHTML = `
            <div class="no-data-message">
                <div class="no-data-icon">📊</div>
                <h2>No Test Data Yet</h2>
                <p>Complete some tests to see your performance statistics here!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    for (const [categoryName, tests] of Object.entries(testCategories)) {
        html += `
            <div class="test-category">
                <h2 class="category-title">${categoryName}</h2>
                <div class="test-list">
        `;
        
        for (const test of tests) {
            const stats = getTestStats(test.id);
            const scores = getScores(test.id);
            
            console.log(`Test: ${test.id}, Stats:`, stats, 'Scores:', scores);
            
            let best, avg, hasData = false;
            
            if (stats && stats.totalAttempts > 0) {
                hasData = true;
                
                // Calculate best and average based on test type
                if (test.id === 'reaction-time') {
                    best = Math.min(...scores.map(s => s.best));
                    avg = Math.round(scores.reduce((sum, s) => sum + s.average, 0) / scores.length);
                } else if (test.id === 'number-memory' || test.id === 'sequence-memory') {
                    best = Math.max(...scores.map(s => s.level));
                    avg = (scores.reduce((sum, s) => sum + s.level, 0) / scores.length).toFixed(1);
                } else if (test.id === 'finger-tapping') {
                    best = Math.max(...scores.map(s => s.totalTaps));
                    avg = Math.round(scores.reduce((sum, s) => sum + s.totalTaps, 0) / scores.length);
                } else if (test.id === 'verbal-memory') {
                    best = Math.max(...scores.map(s => s.score));
                    avg = (scores.reduce((sum, s) => sum + s.score, 0) / scores.length).toFixed(1);
                } else if (test.id === 'drawing-accuracy' || test.id === 'speech-recognition' || test.id === 'hand-stability') {
                    best = Math.max(...scores.map(s => s[test.key]));
                    avg = (scores.reduce((sum, s) => sum + s[test.key], 0) / scores.length).toFixed(1);
                } else if (test.id === 'tug-test') {
                    best = Math.min(...scores.map(s => s.totalTime));
                    avg = (scores.reduce((sum, s) => sum + s.totalTime, 0) / scores.length).toFixed(1);
                }
            }
            
            html += `
                <div class="dashboard-test-item ${hasData ? '' : 'no-data'}" ${hasData ? `onclick="toggleDashboardItem('${test.id}')"` : ''}>
                    <div class="test-item-header">
                        <div class="test-item-icon">${test.icon}</div>
                        <div class="test-item-content">
                            <h4>${test.name}</h4>
                            <p>${hasData ? `${stats.totalAttempts} attempt${stats.totalAttempts > 1 ? 's' : ''}` : 'No data yet'}</p>
                        </div>
                        <div class="test-item-expand">
                            ${hasData ? '<span class="expand-icon">▼</span>' : ''}
                        </div>
                    </div>
                    ${hasData ? `
                        <div class="test-item-details hidden" id="details-${test.id}">
                            <div class="details-stats">
                                <div class="stat-card">
                                    <span class="stat-label">Best Score</span>
                                    <span class="stat-value best">${best}${test.unit}</span>
                                </div>
                                <div class="stat-card">
                                    <span class="stat-label">Average</span>
                                    <span class="stat-value avg">${avg}${test.unit}</span>
                                </div>
                                <div class="stat-card">
                                    <span class="stat-label">Total Attempts</span>
                                    <span class="stat-value">${stats.totalAttempts}</span>
                                </div>
                            </div>
                            <button class="view-graph-btn" onclick="event.stopPropagation(); showGraph('${test.id}')">
                                <span>📈</span> View Progress Chart
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    dashboardContent.innerHTML = html;
}

function toggleDashboardItem(testId) {
    const details = document.getElementById(`details-${testId}`);
    if (!details) return;
    
    const item = details.closest('.dashboard-test-item');
    const expandIcon = item.querySelector('.expand-icon');
    
    const isExpanded = !details.classList.contains('hidden');
    
    // Close all other expanded items
    document.querySelectorAll('.test-item-details').forEach(detail => {
        if (detail.id !== `details-${testId}`) {
            detail.classList.add('hidden');
            const otherIcon = detail.closest('.dashboard-test-item').querySelector('.expand-icon');
            if (otherIcon) otherIcon.textContent = '▼';
        }
    });
    
    // Toggle current item
    if (isExpanded) {
        details.classList.add('hidden');
        if (expandIcon) expandIcon.textContent = '▼';
    } else {
        details.classList.remove('hidden');
        if (expandIcon) expandIcon.textContent = '▲';
    }
}

function showGraph(testName) {
    const modal = document.getElementById('graph-modal');
    modal.classList.remove('hidden');
    
    const testConfigs = {
        'reaction-time': { name: 'Reaction Time', unit: 'ms', key: 'best', invertBest: true },
        'number-memory': { name: 'Number Memory', unit: 'Level', key: 'level', invertBest: false },
        'sequence-memory': { name: 'Sequence Memory', unit: 'Level', key: 'level', invertBest: false },
        'finger-tapping': { name: 'Finger Tapping', unit: 'Taps', key: 'totalTaps', invertBest: false },
        'verbal-memory': { name: 'Verbal Memory', unit: 'Words', key: 'score', invertBest: false },
        'drawing-accuracy': { name: 'Drawing Accuracy', unit: '%', key: 'accuracy', invertBest: false },
        'speech-recognition': { name: 'Speech Test', unit: '%', key: 'averageAccuracy', invertBest: false },
        'hand-stability': { name: 'Hand Stability', unit: '%', key: 'stabilityScore', invertBest: false },
        'tug-test': { name: 'Walking & Turning', unit: 'seconds', key: 'totalTime', invertBest: true }
    };
    
    const config = testConfigs[testName];
    document.getElementById('graph-title').textContent = `${config.name} Progress`;
    
    const scores = getScores(testName);
    
    // Wait for modal to render before drawing
    setTimeout(() => {
        drawProgressChart(scores, config);
    }, 50);
}

function drawProgressChart(scores, config) {
    const canvas = document.getElementById('progress-chart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size - get actual rendered size
    const containerWidth = canvas.parentElement.offsetWidth;
    canvas.width = containerWidth - 80; // Account for padding
    canvas.height = 400;
    
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Extract data points
    const dataPoints = scores.map(s => s[config.key]);
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue || 1;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = maxValue - (range / 5) * i;
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
    
    // Draw line chart
    if (dataPoints.length > 0) {
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1 || 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1 || 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
            
            ctx.fillStyle = '#764ba2';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Draw axis labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(config.unit, padding / 2, padding + chartHeight / 2);
    ctx.fillText('Attempt Number', canvas.width / 2, canvas.height - 20);
    
    // Calculate trend
    const firstHalf = dataPoints.slice(0, Math.ceil(dataPoints.length / 2));
    const secondHalf = dataPoints.slice(Math.floor(dataPoints.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    let trend, trendColor;
    if (config.invertBest) {
        // Lower is better (reaction time, TUG)
        if (secondAvg < firstAvg) {
            trend = '📈 Improving';
            trendColor = '#2ecc71';
        } else if (secondAvg > firstAvg) {
            trend = '📉 Declining';
            trendColor = '#e74c3c';
        } else {
            trend = '➡️ Stable';
            trendColor = '#3498db';
        }
    } else {
        // Higher is better
        if (secondAvg > firstAvg) {
            trend = '📈 Improving';
            trendColor = '#2ecc71';
        } else if (secondAvg < firstAvg) {
            trend = '📉 Declining';
            trendColor = '#e74c3c';
        } else {
            trend = '➡️ Stable';
            trendColor = '#3498db';
        }
    }
    
    // Display stats
    const statsDiv = document.getElementById('graph-stats');
    const best = config.invertBest ? Math.min(...dataPoints) : Math.max(...dataPoints);
    const avg = (dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length).toFixed(1);
    
    statsDiv.innerHTML = `
        <div class="graph-stat">
            <span class="graph-stat-label">Trend</span>
            <span class="graph-stat-value" style="color: ${trendColor};">${trend}</span>
        </div>
        <div class="graph-stat">
            <span class="graph-stat-label">Best Score</span>
            <span class="graph-stat-value" style="color: #ffd700;">${best} ${config.unit}</span>
        </div>
        <div class="graph-stat">
            <span class="graph-stat-label">Average</span>
            <span class="graph-stat-value" style="color: #3498db;">${avg} ${config.unit}</span>
        </div>
        <div class="graph-stat">
            <span class="graph-stat-label">Total Tests</span>
            <span class="graph-stat-value">${dataPoints.length}</span>
        </div>
    `;
}

function closeGraph() {
    document.getElementById('graph-modal').classList.add('hidden');
}

// Helper function to create a mini progress graph for test results
function createMiniProgressGraph(testName, config) {
    const scores = getScores(testName);
    if (scores.length === 0) return '';
    
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    
    const padding = 30;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    const dataPoints = scores.map(s => s[config.key]);
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue || 1;
    
    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
        const y = padding + (chartHeight / 3) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    if (dataPoints.length > 0) {
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1 || 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / (dataPoints.length - 1 || 1)) * index;
            const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
            
            ctx.fillStyle = '#764ba2';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    return canvas.toDataURL();
}

// ========== REACTION TIME TEST ==========
let state = 'waiting'; // waiting, ready, click-now, result, too-soon
let startTime;
let timeout;
let currentRoundAttempts = []; // Current round of 5 attempts
let allRounds = []; // All completed rounds
const ATTEMPTS_PER_ROUND = 5;

const gameArea = document.getElementById('game-area');
const message = document.getElementById('message');
const stats = document.getElementById('stats');
const currentResult = document.getElementById('current-result');
const averageResult = document.getElementById('average-result');
const attemptsList = document.getElementById('attempts-list');
const resetBtn = document.getElementById('reset-btn');

function initReactionTest() {
    state = 'waiting';
    gameArea.className = 'game-box waiting';
    message.innerHTML = `<h1>Reaction Time Test</h1><p>Click to start</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt 1 of ${ATTEMPTS_PER_ROUND}</p>`;
}

function resetReactionTest() {
    state = 'waiting';
    currentRoundAttempts = [];
    if (timeout) clearTimeout(timeout);
    stats.classList.add('hidden');
    gameArea.classList.remove('hidden');
}

gameArea.addEventListener('click', handleClick);
resetBtn.addEventListener('click', startNewRound);

function handleClick() {
    if (state === 'waiting') {
        // Start the test
        state = 'ready';
        gameArea.className = 'game-box ready';
        const attemptsLeft = ATTEMPTS_PER_ROUND - currentRoundAttempts.length;
        message.innerHTML = `<h1>Wait...</h1><p>Wait for green</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt ${currentRoundAttempts.length + 1} of ${ATTEMPTS_PER_ROUND}</p>`;
        
        // Random delay between 2-5 seconds
        const delay = Math.random() * 3000 + 2000;
        
        timeout = setTimeout(() => {
            state = 'click-now';
            gameArea.className = 'game-box click-now';
            message.innerHTML = '<h1>Click!</h1>';
            startTime = Date.now();
        }, delay);
        
    } else if (state === 'ready') {
        // Clicked too soon
        state = 'too-soon';
        clearTimeout(timeout);
        gameArea.className = 'game-box too-soon';
        message.innerHTML = '<h1>Too Soon!</h1><p>Wait for green</p><p style="margin-top: 20px;">Click to try again</p>';
        
        setTimeout(() => {
            state = 'waiting';
            gameArea.className = 'game-box waiting';
            const attemptsLeft = ATTEMPTS_PER_ROUND - currentRoundAttempts.length;
            message.innerHTML = `<h1>Reaction Time Test</h1><p>Click to start</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt ${currentRoundAttempts.length + 1} of ${ATTEMPTS_PER_ROUND}</p>`;
        }, 2000);
        
    } else if (state === 'click-now') {
        // Calculate reaction time
        const reactionTime = Date.now() - startTime;
        currentRoundAttempts.push(reactionTime);
        
        state = 'result';
        gameArea.className = 'game-box result';
        
        // Check if round is complete
        if (currentRoundAttempts.length >= ATTEMPTS_PER_ROUND) {
            // Round complete - show results
            const average = Math.round(currentRoundAttempts.reduce((a, b) => a + b, 0) / currentRoundAttempts.length);
            allRounds.push({
                attempts: [...currentRoundAttempts],
                average: average,
                timestamp: new Date().toLocaleString()
            });
            
            message.innerHTML = `<h1>${reactionTime} ms</h1><p>Round Complete!</p><p style="margin-top: 10px;">Average: ${average} ms</p>`;
            
            setTimeout(() => {
                showResults();
            }, 2000);
        } else {
            // More attempts needed
            const attemptsLeft = ATTEMPTS_PER_ROUND - currentRoundAttempts.length;
            message.innerHTML = `<h1>${reactionTime} ms</h1><p>${attemptsLeft} more ${attemptsLeft === 1 ? 'attempt' : 'attempts'} to go</p>`;
            
            setTimeout(() => {
                state = 'waiting';
                gameArea.className = 'game-box waiting';
                message.innerHTML = `<h1>Reaction Time Test</h1><p>Click to continue</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt ${currentRoundAttempts.length + 1} of ${ATTEMPTS_PER_ROUND}</p>`;
            }, 1500);
        }
    }
}

function showResults() {
    gameArea.classList.add('hidden');
    stats.classList.remove('hidden');
    
    const latestRound = allRounds[allRounds.length - 1];
    
    // Update average result
    averageResult.textContent = `${latestRound.average} ms`;
    
    // Find best time in this round
    const bestTime = Math.min(...latestRound.attempts);
    currentResult.textContent = `${bestTime} ms`;
    
    // Display all attempts from this round
    attemptsList.innerHTML = '';
    latestRound.attempts.forEach((time, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>Attempt ${index + 1}</span><span><strong>${time} ms</strong></span>`;
        
        if (time === bestTime) {
            li.classList.add('best');
        }
        
        attemptsList.appendChild(li);
    });
    
    // Save score to storage
    saveScore('reaction-time', {
        average: latestRound.average,
        best: bestTime,
        attempts: latestRound.attempts
    });
    
    // Get all-time stats
    const allScores = getScores('reaction-time');
    const allTimeBest = allScores.length > 0 ? Math.min(...allScores.map(s => s.best)) : bestTime;
    const allTimeAverage = allScores.length > 0 ? 
        Math.round(allScores.reduce((sum, s) => sum + s.average, 0) / allScores.length) : latestRound.average;
    
    // Add all-time stats display
    let statsDiv = stats.querySelector('.all-time-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'all-time-stats';
        statsDiv.style.cssText = 'margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        stats.appendChild(statsDiv);
    }
    
    // Generate mini graph
    const graphImg = createMiniProgressGraph('reaction-time', { key: 'best', unit: 'ms', invertBest: true });
    
    statsDiv.innerHTML = `
        <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
            <div style="display: flex; justify-content: space-around; color: #fff; font-size: 14px; flex: 1;">
                <div>
                    <div style="opacity: 0.7;">Best Ever</div>
                    <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest} ms</div>
                </div>
                <div>
                    <div style="opacity: 0.7;">Average</div>
                    <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage} ms</div>
                </div>
                <div>
                    <div style="opacity: 0.7;">Total Attempts</div>
                    <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                </div>
            </div>
            ${allScores.length > 1 ? `<div style="flex-shrink: 0;"><img src="${graphImg}" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);" alt="Progress Graph"></div>` : ''}
        </div>
    `;
}

function startNewRound() {
    currentRoundAttempts = [];
    stats.classList.add('hidden');
    gameArea.classList.remove('hidden');
    state = 'waiting';
    gameArea.className = 'game-box waiting';
    message.innerHTML = `<h1>Reaction Time Test</h1><p>Click to start</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt 1 of ${ATTEMPTS_PER_ROUND}</p>`;
}

// Initialize
if (currentRoundAttempts.length === 0) {
    message.innerHTML = `<h1>Reaction Time Test</h1><p>Click to start</p><p style="margin-top: 15px; font-size: 1em; opacity: 0.9;">Attempt 1 of ${ATTEMPTS_PER_ROUND}</p>`;
}

// ========== NUMBER MEMORY TEST ==========
let numberState = 'start';
let currentLevel = 1;
let currentNumber = '';
let numberTimeout;
let numberScores = [];

const numberGameArea = document.getElementById('number-game-area');
const numberMessage = document.getElementById('number-message');

function initNumberMemory() {
    currentLevel = 1;
    numberState = 'start';
    showNumberStart();
}

function resetNumberMemory() {
    currentLevel = 1;
    numberState = 'start';
    if (numberTimeout) clearTimeout(numberTimeout);
}

function showNumberStart() {
    numberState = 'start';
    numberMessage.innerHTML = `
        <h1>Number Memory</h1>
        <p>Memorize the number that appears on screen</p>
        <p style="margin-top: 30px; font-size: 1.1em;">Level ${currentLevel}</p>
        <p style="margin-top: 20px; opacity: 0.9;">Click anywhere to begin</p>
    `;
    
    numberGameArea.onclick = startNumberRound;
}

function startNumberRound() {
    numberGameArea.onclick = null;
    numberState = 'showing';
    
    // Generate random number with current level digits
    currentNumber = '';
    for (let i = 0; i < currentLevel; i++) {
        currentNumber += Math.floor(Math.random() * 10);
    }
    
    // Show the number
    numberMessage.innerHTML = `
        <p style="font-size: 1em; opacity: 0.8;">Level ${currentLevel}</p>
        <div class="number-display">${currentNumber}</div>
    `;
    
    // Calculate display time: 1 second + 0.5s per digit
    const displayTime = 1000 + (currentLevel * 500);
    
    numberTimeout = setTimeout(() => {
        showNumberInput();
    }, displayTime);
}

function showNumberInput() {
    numberState = 'input';
    
    numberMessage.innerHTML = `
        <h1>What was the number?</h1>
        <input type="text" id="number-input" maxlength="${currentLevel}" autocomplete="off" inputmode="numeric" pattern="[0-9]*">
        <br>
        <button class="submit-button" onclick="checkAnswer()">Submit</button>
    `;
    
    const input = document.getElementById('number-input');
    input.focus();
    
    // Allow Enter key to submit
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Only allow numbers
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

function checkAnswer() {
    const input = document.getElementById('number-input');
    const userAnswer = input.value;
    
    if (userAnswer === currentNumber) {
        // Correct!
        numberState = 'correct';
        numberMessage.innerHTML = `
            <h1>Correct!</h1>
            <div class="number-display" style="color: #2ecc71;">${currentNumber}</div>
            <p>Moving to level ${currentLevel + 1}</p>
        `;
        
        currentLevel++;
        
        numberTimeout = setTimeout(() => {
            showNumberStart();
        }, 2000);
    } else {
        // Wrong!
        numberState = 'wrong';
        const finalLevel = currentLevel;
        
        numberScores.push({
            level: finalLevel,
            timestamp: new Date().toLocaleString()
        });
        
        showNumberResults(finalLevel, userAnswer);
    }
}

function showNumberResults(level, wrongAnswer) {
    // Save score
    saveScore('number-memory', {
        level: level,
        digits: currentNumber.toString().length,
        number: currentNumber,
        userAnswer: wrongAnswer
    });
    
    // Get all-time stats
    const allScores = getScores('number-memory');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.level)) : level;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.level, 0) / allScores.length).toFixed(1) : level;
    
    const graphImg = createMiniProgressGraph('number-memory', { key: 'level', unit: 'Level', invertBest: false });
    
    numberMessage.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 60px 40px; color: #333; max-width: 600px;">
            <h2>Game Over!</h2>
            <div class="score">Level ${level}</div>
            <p style="color: #666; margin-bottom: 10px;">The number was: <strong style="color: #333;">${currentNumber}</strong></p>
            <p style="color: #666; margin-bottom: 40px;">You entered: <strong style="color: #e74c3c;">${wrongAnswer || '(nothing)'}</strong></p>
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <div style="color: #666; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
                    <div style="display: flex; justify-content: space-around; flex: 1;">
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Best Level</div>
                            <div style="font-size: 20px; font-weight: bold; color: #ffd700;">Level ${allTimeBest}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Avg Level</div>
                            <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Games</div>
                            <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                        </div>
                    </div>
                    ${allScores.length > 1 ? `<div style="flex-shrink: 0;"><img src="${graphImg}" style="border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);" alt="Progress Graph"></div>` : ''}
                </div>
            </div>
            <button class="submit-button" onclick="restartNumberMemory()">Try Again</button>
        </div>
    `;
}

function restartNumberMemory() {
    currentLevel = 1;
    showNumberStart();
}

// ========== SEQUENCE MEMORY TEST ==========
let sequenceState = 'start';
let sequenceLevel = 1;
let sequence = [];
let userSequence = [];
let sequenceScores = [];
let isShowingSequence = false;

const sequenceGameArea = document.getElementById('sequence-game-area');
const sequenceMessage = document.getElementById('sequence-message');
const sequenceGrid = document.getElementById('sequence-grid');

function initSequenceMemory() {
    sequenceLevel = 1;
    sequenceState = 'start';
    sequence = [];
    userSequence = [];
    
    sequenceMessage.classList.remove('hidden');
    sequenceGrid.classList.add('hidden');
    
    sequenceMessage.innerHTML = `
        <h1>Sequence Memory</h1>
        <p>Memorize the pattern</p>
        <p style="margin-top: 30px; font-size: 1.1em;">Level 1</p>
        <p style="margin-top: 20px; opacity: 0.9;">Click anywhere to begin</p>
    `;
    
    sequenceGameArea.onclick = startSequenceRound;
    createSequenceGrid();
}

function resetSequenceMemory() {
    sequenceLevel = 1;
    sequenceState = 'start';
    sequence = [];
    userSequence = [];
    sequenceGameArea.onclick = null;
}

function createSequenceGrid() {
    sequenceGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.className = 'sequence-square';
        square.dataset.index = i;
        square.addEventListener('click', handleSquareClick);
        sequenceGrid.appendChild(square);
    }
}

function startSequenceRound() {
    sequenceGameArea.onclick = null;
    sequenceState = 'showing';
    
    // Add one more step to the sequence
    const randomSquare = Math.floor(Math.random() * 9);
    sequence.push(randomSquare);
    userSequence = [];
    
    // Hide message and show grid
    sequenceMessage.classList.add('hidden');
    sequenceGrid.classList.remove('hidden');
    
    // Show the sequence
    showSequence();
}

function showSequence() {
    isShowingSequence = true;
    let index = 0;
    
    function showNext() {
        if (index >= sequence.length) {
            // Sequence complete, player's turn
            isShowingSequence = false;
            sequenceState = 'playing';
            return;
        }
        
        const squareIndex = sequence[index];
        const square = sequenceGrid.children[squareIndex];
        
        // Light up the square
        square.classList.add('active');
        
        setTimeout(() => {
            square.classList.remove('active');
            index++;
            
            setTimeout(() => {
                showNext();
            }, 300);
        }, 600);
    }
    
    setTimeout(() => {
        showNext();
    }, 500);
}

function handleSquareClick(e) {
    if (sequenceState !== 'playing' || isShowingSequence) return;
    
    const clickedIndex = parseInt(e.target.dataset.index);
    const square = e.target;
    
    // Visual feedback
    square.classList.add('user-click');
    setTimeout(() => {
        square.classList.remove('user-click');
    }, 200);
    
    userSequence.push(clickedIndex);
    
    // Check if the click was correct
    const currentStep = userSequence.length - 1;
    if (userSequence[currentStep] !== sequence[currentStep]) {
        // Wrong!
        handleWrongSequence(square);
        return;
    }
    
    // Check if sequence is complete
    if (userSequence.length === sequence.length) {
        // Correct! Move to next level
        sequenceLevel++;
        sequenceState = 'correct';
        
        setTimeout(() => {
            sequenceMessage.classList.remove('hidden');
            sequenceGrid.classList.add('hidden');
            
            sequenceMessage.innerHTML = `
                <h1>Correct!</h1>
                <p>Level ${sequenceLevel}</p>
                <p style="margin-top: 20px; opacity: 0.9;">Click to continue</p>
            `;
            
            sequenceGameArea.onclick = startSequenceRound;
        }, 500);
    }
}

function handleWrongSequence(square) {
    sequenceState = 'wrong';
    isShowingSequence = true;
    
    square.classList.add('wrong');
    
    sequenceScores.push({
        level: sequenceLevel,
        timestamp: new Date().toLocaleString()
    });
    
    setTimeout(() => {
        showSequenceResults();
    }, 1000);
}

function showSequenceResults() {
    // Save score
    saveScore('sequence-memory', {
        level: sequenceLevel,
        sequenceLength: sequenceLevel
    });
    
    // Get all-time stats
    const allScores = getScores('sequence-memory');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.level)) : sequenceLevel;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.level, 0) / allScores.length).toFixed(1) : sequenceLevel;
    
    const graphImg = createMiniProgressGraph('sequence-memory', { key: 'level', unit: 'Level', invertBest: false });
    
    sequenceGrid.classList.add('hidden');
    sequenceMessage.classList.remove('hidden');
    
    sequenceMessage.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 60px 40px; color: #333; max-width: 600px;">
            <h2>Game Over!</h2>
            <div class="score">Level ${sequenceLevel}</div>
            <p style="color: #666; margin-bottom: 20px;">You made it to level ${sequenceLevel}</p>
            <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <div style="color: #666; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
                    <div style="display: flex; justify-content: space-around; flex: 1;">
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Best Level</div>
                            <div style="font-size: 20px; font-weight: bold; color: #ffd700;">Level ${allTimeBest}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Avg Level</div>
                            <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Games</div>
                            <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                        </div>
                    </div>
                    ${allScores.length > 1 ? `<div style="flex-shrink: 0;"><img src="${graphImg}" style="border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);" alt="Progress Graph"></div>` : ''}
                </div>
            </div>
            <button class="submit-button" onclick="restartSequenceMemory()">Try Again</button>
        </div>
    `;
}

function restartSequenceMemory() {
    initSequenceMemory();
}

// ========== KEY TAPPING TEST ==========
let keyTappingState = 'start';
let keyTappingTaps = 0;
let keyTappingStartTime;
let keyTappingDuration = 15000; // 15 seconds
let keyTappingInterval;
let keyTappingTimer;
let lastKeyTapped = null;
let validTaps = 0;

function initKeyTapping() {
    keyTappingState = 'start';
    keyTappingTaps = 0;
    validTaps = 0;
    lastKeyTapped = null;
    
    document.getElementById('key-tapping-start-screen').classList.remove('hidden');
    document.getElementById('key-tapping-play-area').classList.add('hidden');
    document.getElementById('key-tapping-results').classList.add('hidden');
    
    document.getElementById('key-tapping-start-screen').onclick = startKeyTapping;
}

function resetKeyTapping() {
    keyTappingState = 'start';
    keyTappingTaps = 0;
    validTaps = 0;
    lastKeyTapped = null;
    if (keyTappingInterval) clearInterval(keyTappingInterval);
    if (keyTappingTimer) clearTimeout(keyTappingTimer);
    document.getElementById('key-tapping-start-screen').onclick = null;
    document.getElementById('key-left').onclick = null;
    document.getElementById('key-right').onclick = null;
}

function startKeyTapping() {
    keyTappingState = 'playing';
    keyTappingTaps = 0;
    validTaps = 0;
    lastKeyTapped = null;
    keyTappingStartTime = Date.now();
    
    document.getElementById('key-tapping-start-screen').classList.add('hidden');
    document.getElementById('key-tapping-play-area').classList.remove('hidden');
    document.getElementById('key-tapping-results').classList.add('hidden');
    
    document.getElementById('total-taps').textContent = '0';
    document.getElementById('taps-per-second').textContent = '0.0';
    
    // Add click listeners
    const leftKey = document.getElementById('key-left');
    const rightKey = document.getElementById('key-right');
    
    leftKey.onclick = () => handleKeyTap('left');
    rightKey.onclick = () => handleKeyTap('right');
    
    // Also support keyboard
    document.addEventListener('keydown', handleKeyboardTap);
    
    // Update timer
    keyTappingInterval = setInterval(updateKeyTappingTimer, 100);
    
    // End test after duration
    keyTappingTimer = setTimeout(endKeyTapping, keyTappingDuration);
}

function handleKeyTap(key) {
    if (keyTappingState !== 'playing') return;
    
    // Only count if alternating properly
    if (lastKeyTapped === null || lastKeyTapped !== key) {
        validTaps++;
        lastKeyTapped = key;
        
        // Visual feedback
        const keyElement = document.getElementById(key === 'left' ? 'key-left' : 'key-right');
        keyElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            keyElement.style.transform = 'scale(1)';
        }, 100);
    }
    
    keyTappingTaps++;
    updateKeyTappingStats();
}

function handleKeyboardTap(e) {
    if (keyTappingState !== 'playing') return;
    
    if (e.key === 'q' || e.key === 'Q') {
        handleKeyTap('left');
    } else if (e.key === 'p' || e.key === 'P') {
        handleKeyTap('right');
    }
}

function updateKeyTappingTimer() {
    const elapsed = Date.now() - keyTappingStartTime;
    const remaining = Math.max(0, keyTappingDuration - elapsed);
    const seconds = (remaining / 1000).toFixed(1);
    
    document.getElementById('key-tapping-time').textContent = seconds + 's';
}

function updateKeyTappingStats() {
    document.getElementById('total-taps').textContent = validTaps;
    
    const elapsed = (Date.now() - keyTappingStartTime) / 1000;
    const tapsPerSecond = elapsed > 0 ? (validTaps / elapsed).toFixed(1) : '0.0';
    document.getElementById('taps-per-second').textContent = tapsPerSecond;
}

function endKeyTapping() {
    keyTappingState = 'finished';
    clearInterval(keyTappingInterval);
    clearTimeout(keyTappingTimer);
    
    document.removeEventListener('keydown', handleKeyboardTap);
    
    const totalTime = keyTappingDuration / 1000;
    const avgTapsPerSecond = (validTaps / totalTime).toFixed(1);
    
    // Save score
    saveScore('finger-tapping', {
        totalTaps: validTaps,
        tapsPerSecond: parseFloat(avgTapsPerSecond),
        duration: totalTime
    });
    
    // Get all-time stats
    const allScores = getScores('finger-tapping');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.totalTaps)) : validTaps;
    const allTimeAvgTaps = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.totalTaps, 0) / allScores.length).toFixed(0) : validTaps;
    const allTimeAvgRate = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.tapsPerSecond, 0) / allScores.length).toFixed(1) : avgTapsPerSecond;
    
    const graphImg = createMiniProgressGraph('finger-tapping', { key: 'totalTaps', unit: 'taps', invertBest: false });
    
    document.getElementById('key-tapping-play-area').classList.add('hidden');
    document.getElementById('key-tapping-results').classList.remove('hidden');
    
    document.getElementById('final-taps').textContent = validTaps;
    document.getElementById('final-taps-per-second').textContent = avgTapsPerSecond;
    
    // Add all-time stats
    const resultsContainer = document.getElementById('key-tapping-results');
    let statsDiv = resultsContainer.querySelector('.all-time-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'all-time-stats';
        statsDiv.style.cssText = 'margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        resultsContainer.appendChild(statsDiv);
    }
    statsDiv.innerHTML = `
        <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
            <div style="display: flex; justify-content: space-around; color: #fff; font-size: 14px; flex: 1;">
                <div>
                    <div style="opacity: 0.7;">Best Taps</div>
                    <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}</div>
                </div>
                <div>
                    <div style="opacity: 0.7;">Avg Taps</div>
                    <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAvgTaps}</div>
                </div>
                <div>
                    <div style="opacity: 0.7;">Avg Rate</div>
                    <div style="font-size: 20px; font-weight: bold;">${allTimeAvgRate}/s</div>
                </div>
                <div>
                    <div style="opacity: 0.7;">Tests</div>
                    <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                </div>
            </div>
            ${allScores.length > 1 ? `<div style="flex-shrink: 0;"><img src="${graphImg}" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);" alt="Progress Graph"></div>` : ''}
        </div>
    `;
}

function restartKeyTapping() {
    resetKeyTapping();
    initKeyTapping();
}

// ========== VERBAL MEMORY TEST ==========
let verbalState = 'start';
let verbalScore = 0;
let verbalLives = 3;
let verbalSeenWords = new Set();
let verbalWordPool = [
    'apple', 'banana', 'orange', 'grape', 'melon', 'peach', 'mango', 'berry',
    'tiger', 'lion', 'elephant', 'giraffe', 'zebra', 'monkey', 'bear', 'wolf',
    'house', 'car', 'tree', 'river', 'mountain', 'ocean', 'forest', 'desert',
    'book', 'pen', 'paper', 'desk', 'chair', 'lamp', 'door', 'window',
    'happy', 'sad', 'angry', 'calm', 'excited', 'tired', 'brave', 'kind',
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white',
    'run', 'jump', 'walk', 'swim', 'fly', 'climb', 'dance', 'sing',
    'dog', 'cat', 'bird', 'fish', 'horse', 'rabbit', 'turtle', 'frog',
    'pizza', 'burger', 'pasta', 'salad', 'soup', 'bread', 'rice', 'noodles',
    'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'storm',
    'phone', 'computer', 'tablet', 'camera', 'watch', 'clock', 'radio', 'screen',
    'shirt', 'pants', 'shoes', 'hat', 'coat', 'dress', 'socks', 'gloves',
    'music', 'art', 'sport', 'game', 'movie', 'show', 'song', 'dance',
    'friend', 'family', 'parent', 'child', 'baby', 'adult', 'person', 'people',
    'love', 'hope', 'dream', 'wish', 'fear', 'pain', 'joy', 'peace',
    'time', 'space', 'world', 'earth', 'life', 'death', 'birth', 'age',
    'king', 'queen', 'prince', 'knight', 'castle', 'crown', 'throne', 'sword',
    'fire', 'water', 'earth', 'air', 'ice', 'stone', 'metal', 'wood',
    'plant', 'flower', 'grass', 'leaf', 'root', 'seed', 'fruit', 'vegetable',
    'school', 'teacher', 'student', 'class', 'lesson', 'test', 'grade', 'study'
];
let verbalCurrentWord = '';
let verbalIsNewWord = false;
let verbalWordsShown = [];

const verbalGameArea = document.getElementById('verbal-game-area');
const verbalStartScreen = document.getElementById('verbal-start-screen');
const verbalPlayArea = document.getElementById('verbal-play-area');
const verbalWordDisplay = document.getElementById('verbal-word');
const verbalScoreDisplay = document.getElementById('verbal-score');
const verbalLivesDisplay = document.getElementById('verbal-lives');
const verbalSeenBtn = document.getElementById('verbal-seen-btn');
const verbalNewBtn = document.getElementById('verbal-new-btn');

function initVerbalMemory() {
    verbalState = 'start';
    verbalScore = 0;
    verbalLives = 3;
    verbalSeenWords = new Set();
    verbalWordsShown = [];
    
    verbalStartScreen.classList.remove('hidden');
    verbalPlayArea.classList.add('hidden');
    
    verbalStartScreen.onclick = startVerbalMemory;
}

function resetVerbalMemory() {
    verbalState = 'start';
    verbalScore = 0;
    verbalLives = 3;
    verbalSeenWords = new Set();
    verbalWordsShown = [];
    verbalStartScreen.onclick = null;
}

function startVerbalMemory() {
    verbalState = 'playing';
    verbalStartScreen.classList.add('hidden');
    verbalPlayArea.classList.remove('hidden');
    
    updateVerbalStats();
    showNextWord();
}

function updateVerbalStats() {
    verbalScoreDisplay.textContent = verbalScore;
    verbalLivesDisplay.textContent = verbalLives;
}

function showNextWord() {
    // 30% chance to show a seen word after 3 words have been shown
    if (verbalWordsShown.length >= 3 && Math.random() < 0.3 && verbalSeenWords.size > 0) {
        // Show a word we've seen before
        const seenWordsArray = Array.from(verbalSeenWords);
        verbalCurrentWord = seenWordsArray[Math.floor(Math.random() * seenWordsArray.length)];
        verbalIsNewWord = false;
    } else {
        // Show a new word
        let newWord;
        do {
            newWord = verbalWordPool[Math.floor(Math.random() * verbalWordPool.length)];
        } while (verbalSeenWords.has(newWord));
        
        verbalCurrentWord = newWord;
        verbalIsNewWord = true;
        verbalSeenWords.add(newWord);
    }
    
    verbalWordsShown.push(verbalCurrentWord);
    verbalWordDisplay.textContent = verbalCurrentWord;
}

function handleVerbalAnswer(userSaidSeen) {
    const correct = (userSaidSeen && !verbalIsNewWord) || (!userSaidSeen && verbalIsNewWord);
    
    if (correct) {
        verbalScore++;
        updateVerbalStats();
        showNextWord();
    } else {
        verbalLives--;
        updateVerbalStats();
        
        if (verbalLives <= 0) {
            endVerbalMemory();
        } else {
            // Flash the word red briefly
            verbalWordDisplay.style.color = '#e74c3c';
            setTimeout(() => {
                verbalWordDisplay.style.color = 'white';
                showNextWord();
            }, 500);
        }
    }
}

verbalSeenBtn.addEventListener('click', () => handleVerbalAnswer(true));
verbalNewBtn.addEventListener('click', () => handleVerbalAnswer(false));

function endVerbalMemory() {
    verbalState = 'finished';
    
    // Save score
    saveScore('verbal-memory', {
        score: verbalScore,
        wordsCorrect: verbalScore,
        livesRemaining: verbalLives
    });
    
    // Get all-time stats
    const allScores = getScores('verbal-memory');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.score)) : verbalScore;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.score, 0) / allScores.length).toFixed(1) : verbalScore;
    
    const graphImg = createMiniProgressGraph('verbal-memory', { key: 'score', unit: ' words', invertBest: false });
    
    verbalPlayArea.innerHTML = `
        <div class="verbal-results">
            <h2>Game Over!</h2>
            <div class="score">${verbalScore}</div>
            <p>You correctly identified ${verbalScore} words</p>
            <div style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
                    <div style="display: flex; justify-content: space-around; color: #fff; flex: 1;">
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Best Score</div>
                            <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Avg Score</div>
                            <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}</div>
                        </div>
                        <div>
                            <div style="opacity: 0.7; font-size: 12px;">Games</div>
                            <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                        </div>
                    </div>
                    ${allScores.length > 1 ? `<div style="flex-shrink: 0;"><img src="${graphImg}" style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);" alt="Progress Graph"></div>` : ''}
                </div>
            </div>
            <button class="submit-button" onclick="restartVerbalMemory()">Try Again</button>
        </div>
    `;
}

function restartVerbalMemory() {
    verbalPlayArea.innerHTML = `
        <div id="verbal-stats" class="verbal-stats">
            <div class="verbal-stat-item">
                <span class="verbal-stat-label">Score</span>
                <span id="verbal-score" class="verbal-stat-value">0</span>
            </div>
            <div class="verbal-stat-item">
                <span class="verbal-stat-label">Lives</span>
                <span id="verbal-lives" class="verbal-stat-value">3</span>
            </div>
        </div>
        <div id="verbal-word" class="verbal-word"></div>
        <div class="verbal-buttons">
            <button id="verbal-seen-btn" class="verbal-button verbal-seen">SEEN</button>
            <button id="verbal-new-btn" class="verbal-button verbal-new">NEW</button>
        </div>
    `;
    
    // Re-assign elements
    const verbalWordDisplay = document.getElementById('verbal-word');
    const verbalScoreDisplay = document.getElementById('verbal-score');
    const verbalLivesDisplay = document.getElementById('verbal-lives');
    const verbalSeenBtn = document.getElementById('verbal-seen-btn');
    const verbalNewBtn = document.getElementById('verbal-new-btn');
    
    verbalSeenBtn.addEventListener('click', () => handleVerbalAnswer(true));
    verbalNewBtn.addEventListener('click', () => handleVerbalAnswer(false));
    
    initVerbalMemory();
}

// ========== DRAWING ACCURACY TEST ==========
let drawingState = 'start';
let drawingCanvas;
let drawingCtx;
let drawingIsDrawing = false;
let drawingUserPath = [];
let drawingCurrentShape = null;
let drawingShapePath = [];

const shapes = [
    { name: 'Circle', type: 'circle' },
    { name: 'Square', type: 'square' },
    { name: 'Triangle', type: 'triangle' },
    { name: 'Star', type: 'star' },
    { name: 'Heart', type: 'heart' },
    { name: 'Pentagon', type: 'pentagon' }
];

function initDrawingAccuracy() {
    drawingState = 'start';
    drawingUserPath = [];
    
    const drawingStartScreen = document.getElementById('drawing-start-screen');
    const drawingPlayArea = document.getElementById('drawing-play-area');
    
    drawingStartScreen.classList.remove('hidden');
    drawingPlayArea.classList.add('hidden');
    
    drawingStartScreen.onclick = startDrawingTest;
}

function resetDrawingAccuracy() {
    drawingState = 'start';
    drawingUserPath = [];
    if (drawingCanvas) {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
}

function startDrawingTest() {
    drawingState = 'drawing';
    
    const drawingStartScreen = document.getElementById('drawing-start-screen');
    const drawingPlayArea = document.getElementById('drawing-play-area');
    
    drawingStartScreen.classList.add('hidden');
    drawingPlayArea.classList.remove('hidden');
    
    // Select random shape
    drawingCurrentShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Update instruction
    const instruction = document.getElementById('drawing-instruction');
    instruction.textContent = `Draw a ${drawingCurrentShape.name}`;
    
    // Setup canvas
    drawingCanvas = document.getElementById('drawing-canvas');
    drawingCtx = drawingCanvas.getContext('2d');
    
    // Draw the outline shape
    drawShapeOutline();
    
    // Setup drawing
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch support
    drawingCanvas.addEventListener('touchstart', handleTouchStart);
    drawingCanvas.addEventListener('touchmove', handleTouchMove);
    drawingCanvas.addEventListener('touchend', stopDrawing);
    
    // Show done button
    document.getElementById('drawing-done-btn').classList.remove('hidden');
    document.getElementById('drawing-done-btn').onclick = finishDrawing;
}

function drawShapeOutline() {
    const centerX = drawingCanvas.width / 2;
    const centerY = drawingCanvas.height / 2;
    const size = 280;
    
    drawingCtx.strokeStyle = '#ddd';
    drawingCtx.lineWidth = 3;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
    
    drawingCtx.beginPath();
    drawingShapePath = [];
    
    switch (drawingCurrentShape.type) {
        case 'circle':
            drawingCtx.arc(centerX, centerY, size, 0, Math.PI * 2);
            // Sample points for comparison
            for (let i = 0; i <= 360; i += 5) {
                const angle = (i * Math.PI) / 180;
                drawingShapePath.push({
                    x: centerX + Math.cos(angle) * size,
                    y: centerY + Math.sin(angle) * size
                });
            }
            break;
            
        case 'square':
            drawingCtx.rect(centerX - size, centerY - size, size * 2, size * 2);
            // Sample points
            for (let i = 0; i <= size * 2; i += 10) {
                drawingShapePath.push({ x: centerX - size + i, y: centerY - size });
                drawingShapePath.push({ x: centerX + size, y: centerY - size + i });
                drawingShapePath.push({ x: centerX + size - i, y: centerY + size });
                drawingShapePath.push({ x: centerX - size, y: centerY + size - i });
            }
            break;
            
        case 'triangle':
            drawingCtx.moveTo(centerX, centerY - size);
            drawingCtx.lineTo(centerX - size, centerY + size);
            drawingCtx.lineTo(centerX + size, centerY + size);
            drawingCtx.closePath();
            // Sample points
            for (let i = 0; i <= 1; i += 0.05) {
                drawingShapePath.push({ x: centerX - size * (1 - i * 2), y: centerY - size + size * 2 * i });
                drawingShapePath.push({ x: centerX - size + size * 2 * i, y: centerY + size });
                drawingShapePath.push({ x: centerX + size - size * 2 * i, y: centerY + size - size * 2 * i });
            }
            break;
            
        case 'star':
            const spikes = 5;
            const outerRadius = size;
            const innerRadius = size * 0.4;
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                if (i === 0) drawingCtx.moveTo(x, y);
                else drawingCtx.lineTo(x, y);
                drawingShapePath.push({ x, y });
            }
            drawingCtx.closePath();
            break;
            
        case 'heart':
            for (let t = 0; t <= Math.PI * 2; t += 0.05) {
                const x = centerX + size * 16 * Math.pow(Math.sin(t), 3) / 16;
                const y = centerY - size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
                if (t === 0) drawingCtx.moveTo(x, y);
                else drawingCtx.lineTo(x, y);
                drawingShapePath.push({ x, y });
            }
            break;
            
        case 'pentagon':
            for (let i = 0; i <= 5; i++) {
                const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                const x = centerX + Math.cos(angle) * size;
                const y = centerY + Math.sin(angle) * size;
                if (i === 0) drawingCtx.moveTo(x, y);
                else drawingCtx.lineTo(x, y);
                drawingShapePath.push({ x, y });
            }
            break;
    }
    
    drawingCtx.stroke();
}

function startDrawing(e) {
    drawingIsDrawing = true;
    const rect = drawingCanvas.getBoundingClientRect();
    const scaleX = drawingCanvas.width / rect.width;
    const scaleY = drawingCanvas.height / rect.height;
    drawingUserPath = [{
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    }];
}

function draw(e) {
    if (!drawingIsDrawing) return;
    
    const rect = drawingCanvas.getBoundingClientRect();
    const scaleX = drawingCanvas.width / rect.width;
    const scaleY = drawingCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    drawingUserPath.push({ x, y });
    
    drawingCtx.strokeStyle = '#3498db';
    drawingCtx.lineWidth = 4;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
    
    drawingCtx.beginPath();
    const lastPoint = drawingUserPath[drawingUserPath.length - 2];
    drawingCtx.moveTo(lastPoint.x, lastPoint.y);
    drawingCtx.lineTo(x, y);
    drawingCtx.stroke();
}

function stopDrawing() {
    drawingIsDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    drawingCanvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    drawingCanvas.dispatchEvent(mouseEvent);
}

function finishDrawing() {
    if (drawingUserPath.length < 10) {
        alert('Please draw the shape before clicking Done!');
        return;
    }
    
    const accuracy = calculateDrawingAccuracy();
    showDrawingResults(accuracy);
}

function calculateDrawingAccuracy() {
    if (drawingUserPath.length === 0 || drawingShapePath.length === 0) return 0;
    
    // Calculate average distance between user path and ideal shape
    let totalDistance = 0;
    let comparisonCount = 0;
    
    // Sample user path points
    const sampleInterval = Math.max(1, Math.floor(drawingUserPath.length / 100));
    
    for (let i = 0; i < drawingUserPath.length; i += sampleInterval) {
        const userPoint = drawingUserPath[i];
        
        // Find closest point in shape path
        let minDistance = Infinity;
        for (const shapePoint of drawingShapePath) {
            const distance = Math.sqrt(
                Math.pow(userPoint.x - shapePoint.x, 2) +
                Math.pow(userPoint.y - shapePoint.y, 2)
            );
            minDistance = Math.min(minDistance, distance);
        }
        
        totalDistance += minDistance;
        comparisonCount++;
    }
    
    const avgDistance = totalDistance / comparisonCount;
    
    // Convert to percentage (closer = better)
    // Assume 100px average distance = 0% accuracy, 0px = 100%
    const maxDistance = 100;
    const accuracy = Math.max(0, Math.min(100, 100 - (avgDistance / maxDistance) * 100));
    
    return Math.round(accuracy * 10) / 10;
}

function showDrawingResults(accuracy) {
    let rating = '';
    if (accuracy >= 95) rating = 'Perfect! 🎉';
    else if (accuracy >= 90) rating = 'Excellent! 🌟';
    else if (accuracy >= 80) rating = 'Great! 👍';
    else if (accuracy >= 70) rating = 'Good! 👌';
    else if (accuracy >= 60) rating = 'Not bad! 😊';
    else rating = 'Keep practicing! 💪';
    
    // Save score
    saveScore('drawing-accuracy', {
        shape: drawingCurrentShape.name,
        accuracy: accuracy,
        rating: rating
    });
    
    // Get all-time stats
    const allScores = getScores('drawing-accuracy');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.accuracy)) : accuracy;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.accuracy, 0) / allScores.length).toFixed(1) : accuracy;
    
    const drawingPlayArea = document.getElementById('drawing-play-area');
    drawingPlayArea.innerHTML = `
        <div class="drawing-results">
            <h2>${drawingCurrentShape.name}</h2>
            <div class="accuracy-score">${accuracy}%</div>
            <div class="rating">${rating}</div>
            <p>You traced the ${drawingCurrentShape.name.toLowerCase()} with ${accuracy}% accuracy</p>
            <div style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
                <div style="display: flex; justify-content: space-around; color: #fff;">
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Best Accuracy</div>
                        <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}%</div>
                    </div>
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Avg Accuracy</div>
                        <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}%</div>
                    </div>
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Drawings</div>
                        <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                    </div>
                </div>
            </div>
            <button class="submit-button" onclick="restartDrawingAccuracy()">Try Another Shape</button>
        </div>
    `;
}

function restartDrawingAccuracy() {
    const drawingPlayArea = document.getElementById('drawing-play-area');
    drawingPlayArea.innerHTML = `
        <div id="drawing-instruction" class="drawing-instruction"></div>
        <canvas id="drawing-canvas" width="800" height="800"></canvas>
        <button id="drawing-done-btn" class="drawing-done-btn hidden">Done</button>
    `;
    
    initDrawingAccuracy();
}

// ========== SPEECH TEST ==========
let speechState = 'start';
let speechRound = 1;
let speechTotalRounds = 5;
let speechScore = 0;
let speechCurrentSentence = '';
let speechRecognition = null;
let speechScores = [];
let speechTestSentences = [];
let speechCurrentTranscript = '';

const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "She sells seashells by the seashore",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood",
    "Peter Piper picked a peck of pickled peppers",
    "I scream you scream we all scream for ice cream",
    "Unique New York unique New York you know you need unique New York",
    "Red lorry yellow lorry red lorry yellow lorry",
    "Fuzzy Wuzzy was a bear Fuzzy Wuzzy had no hair",
    "Betty Botter bought some butter but she said the butter's bitter",
    "If two witches would watch two watches which witch would watch which watch",
    "A proper copper coffee pot",
    "Six thick thistle sticks six thick thistles stick",
    "Around the rugged rocks the ragged rascal ran",
    "Fresh fried fish fish fresh fried fresh fish fried fish fresh",
    "The sixth sick sheikh's sixth sheep's sick"
];

function initSpeechTest() {
    speechState = 'start';
    speechRound = 1;
    speechScore = 0;
    speechScores = [];
    
    const speechStartScreen = document.getElementById('speech-start-screen');
    const speechPlayArea = document.getElementById('speech-play-area');
    
    speechStartScreen.classList.remove('hidden');
    speechPlayArea.classList.add('hidden');
    
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
    }
    
    speechStartScreen.onclick = startSpeechTest;
}

function resetSpeechTest() {
    speechState = 'start';
    speechRound = 1;
    speechScore = 0;
    if (speechRecognition) {
        speechRecognition.stop();
        speechRecognition = null;
    }
}

function startSpeechTest() {
    speechState = 'playing';
    
    const speechStartScreen = document.getElementById('speech-start-screen');
    const speechPlayArea = document.getElementById('speech-play-area');
    
    speechStartScreen.classList.add('hidden');
    speechPlayArea.classList.remove('hidden');
    
    // Select 5 random unique sentences for this test
    const shuffled = [...sentences].sort(() => 0.5 - Math.random());
    speechTestSentences = shuffled.slice(0, 5);
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-US';
    
    showNextSentence();
}

function showNextSentence() {
    if (speechRound > speechTotalRounds) {
        showSpeechResults();
        return;
    }
    
    // Use pre-selected sentence for this round
    speechCurrentSentence = speechTestSentences[speechRound - 1];
    speechCurrentTranscript = '';
    
    // Update UI
    document.getElementById('speech-sentence').textContent = speechCurrentSentence;
    document.getElementById('speech-round').textContent = `${speechRound}/${speechTotalRounds}`;
    document.getElementById('speech-score').textContent = speechScore;
    
    const micBtn = document.getElementById('speech-mic-btn');
    const doneBtn = document.getElementById('speech-done-btn');
    const transcript = document.getElementById('speech-transcript');
    
    micBtn.classList.remove('listening');
    micBtn.querySelector('.mic-text').textContent = 'Click to Speak';
    doneBtn.classList.add('hidden');
    transcript.classList.add('hidden');
    
    micBtn.onclick = startListening;
}

function startListening() {
    const micBtn = document.getElementById('speech-mic-btn');
    const doneBtn = document.getElementById('speech-done-btn');
    const transcript = document.getElementById('speech-transcript');
    
    micBtn.classList.add('listening');
    micBtn.querySelector('.mic-text').textContent = 'Listening...';
    doneBtn.classList.remove('hidden');
    transcript.classList.remove('hidden');
    transcript.textContent = 'Speak now...';
    
    speechCurrentTranscript = '';
    
    speechRecognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        if (finalTranscript) {
            speechCurrentTranscript += finalTranscript;
        }
        
        const displayText = speechCurrentTranscript + interimTranscript;
        transcript.textContent = `You said: "${displayText.trim()}"`;
    };
    
    speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
            micBtn.classList.remove('listening');
            doneBtn.classList.add('hidden');
            micBtn.querySelector('.mic-text').textContent = 'Try Again';
            transcript.textContent = 'Error: Could not recognize speech. Click to try again.';
        }
    };
    
    speechRecognition.onend = () => {
        // Restart recognition if still in listening mode and not stopped manually
        if (micBtn.classList.contains('listening')) {
            try {
                speechRecognition.start();
            } catch (e) {
                // Already started
            }
        }
    };
    
    doneBtn.onclick = finishSpeaking;
    
    try {
        speechRecognition.start();
    } catch (e) {
        console.error('Could not start speech recognition:', e);
    }
}

function finishSpeaking() {
    const micBtn = document.getElementById('speech-mic-btn');
    const doneBtn = document.getElementById('speech-done-btn');
    const transcript = document.getElementById('speech-transcript');
    
    // Stop recognition
    micBtn.classList.remove('listening');
    doneBtn.classList.add('hidden');
    
    try {
        speechRecognition.stop();
    } catch (e) {
        // Already stopped
    }
    
    if (!speechCurrentTranscript.trim()) {
        transcript.textContent = 'No speech detected. Click microphone to try again.';
        micBtn.querySelector('.mic-text').textContent = 'Try Again';
        return;
    }
    
    // Calculate accuracy
    const accuracy = calculateSpeechAccuracy(speechCurrentSentence, speechCurrentTranscript.trim());
    speechScore += accuracy;
    speechScores.push({ sentence: speechCurrentSentence, spoken: speechCurrentTranscript.trim(), accuracy });
    
    micBtn.querySelector('.mic-text').textContent = `${accuracy}% Match!`;
    
    setTimeout(() => {
        speechRound++;
        showNextSentence();
    }, 2500);
}

function calculateSpeechAccuracy(original, spoken) {
    // Normalize strings
    const orig = original.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const spok = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    
    const origWords = orig.split(/\s+/);
    const spokWords = spok.split(/\s+/);
    
    // Calculate word-level accuracy
    let matches = 0;
    const maxLength = Math.max(origWords.length, spokWords.length);
    
    for (let i = 0; i < origWords.length; i++) {
        if (spokWords.includes(origWords[i])) {
            matches++;
        }
    }
    
    const accuracy = (matches / origWords.length) * 100;
    return Math.round(accuracy);
}

function showSpeechResults() {
    speechState = 'finished';
    
    const avgScore = Math.round(speechScore / speechTotalRounds);
    
    let rating = '';
    if (avgScore >= 95) rating = 'Perfect! 🎉';
    else if (avgScore >= 85) rating = 'Excellent! 🌟';
    else if (avgScore >= 75) rating = 'Great! 👍';
    else if (avgScore >= 65) rating = 'Good! 👌';
    else if (avgScore >= 50) rating = 'Not bad! 😊';
    else rating = 'Keep practicing! 💪';
    
    // Save score
    saveScore('speech-recognition', {
        averageAccuracy: avgScore,
        totalScore: speechScore,
        totalRounds: speechTotalRounds,
        rating: rating
    });
    
    // Get all-time stats
    const allScores = getScores('speech-recognition');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.averageAccuracy)) : avgScore;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.averageAccuracy, 0) / allScores.length).toFixed(1) : avgScore;
    
    const speechPlayArea = document.getElementById('speech-play-area');
    speechPlayArea.innerHTML = `
        <div class="speech-results">
            <h2>Test Complete!</h2>
            <div class="final-score">${avgScore}%</div>
            <div class="accuracy-breakdown">${rating}</div>
            <p>Average accuracy across ${speechTotalRounds} sentences</p>
            <div style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
                <div style="display: flex; justify-content: space-around; color: #fff;">
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Best Accuracy</div>
                        <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}%</div>
                    </div>
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Avg Accuracy</div>
                        <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}%</div>
                    </div>
                    <div>
                        <div style="opacity: 0.7; font-size: 12px;">Tests</div>
                        <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
                    </div>
                </div>
            </div>
            <button class="submit-button" onclick="restartSpeechTest()">Try Again</button>
        </div>
    `;
}

function restartSpeechTest() {
    const speechPlayArea = document.getElementById('speech-play-area');
    speechPlayArea.innerHTML = `
        <div class="speech-header">
            <div class="speech-score-display">
                <span class="speech-label">Score</span>
                <span id="speech-score" class="speech-score-value">0</span>
            </div>
            <div class="speech-round-display">
                <span class="speech-label">Round</span>
                <span id="speech-round" class="speech-round-value">1/5</span>
            </div>
        </div>
        <div id="speech-sentence" class="speech-sentence"></div>
        <div class="speech-controls">
            <button id="speech-mic-btn" class="speech-mic-btn">
                <span class="mic-icon">🎤</span>
                <span class="mic-text">Click to Speak</span>
            </button>
            <button id="speech-done-btn" class="speech-done-btn hidden">Done Speaking</button>
        </div>
        <div id="speech-transcript" class="speech-transcript hidden"></div>
    `;
    
    initSpeechTest();
}

// ========== HAND STABILITY TEST ==========
let stabilityStream = null;
let stabilityTimer = null;
let stabilityStartTime = null;
let stabilityDuration = 30000; // 30 seconds
let stabilityHandModel = null;
let stabilityDetectionInterval = null;
let stabilityInCircleTime = 0;
let stabilityTotalTime = 0;
let stabilityCanvas = null;
let stabilityCanvasCtx = null;
let stabilityVideo = null;

function initHandStability() {
    document.getElementById('stability-start-screen').classList.remove('hidden');
    document.getElementById('stability-play-area').classList.add('hidden');
    document.getElementById('stability-results').classList.add('hidden');
}

function resetHandStability() {
    stopStabilityCamera();
    stabilityMovementData = [];
    initHandStability();
}

async function startStabilityTest() {
    document.getElementById('stability-start-screen').classList.add('hidden');
    document.getElementById('stability-play-area').classList.remove('hidden');
    
    const statusElement = document.getElementById('stability-status-value');
    statusElement.textContent = 'Starting camera...';
    
    try {
        // Get camera access
        stabilityStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            } 
        });
        
        stabilityVideo = document.getElementById('stability-video');
        stabilityCanvas = document.getElementById('stability-canvas');
        stabilityCanvasCtx = stabilityCanvas.getContext('2d');
        
        stabilityVideo.srcObject = stabilityStream;
        await stabilityVideo.play();
        
        // Set canvas size to match video
        stabilityCanvas.width = stabilityVideo.videoWidth || 640;
        stabilityCanvas.height = stabilityVideo.videoHeight || 480;
        
        statusElement.textContent = 'Loading hand detector...';
        
        // Load hand detection model
        stabilityHandModel = await handpose.load();
        
        statusElement.textContent = 'Point your finger at circle!';
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        runStabilityTest();
        
    } catch (error) {
        console.error('Camera or model error:', error);
        statusElement.textContent = 'Camera access required!';
        setTimeout(() => resetHandStability(), 3000);
    }
}

function runStabilityTest() {
    stabilityInCircleTime = 0;
    stabilityTotalTime = 0;
    stabilityStartTime = Date.now();
    
    const targetRadius = 75; // Circle radius in pixels
    const centerX = stabilityCanvas.width / 2;
    const centerY = stabilityCanvas.height / 2;
    
    // Detect finger and check if in circle
    const detectFinger = async () => {
        if (!stabilityHandModel || !stabilityVideo) return;
        
        try {
            const predictions = await stabilityHandModel.estimateHands(stabilityVideo);
            
            // Clear canvas
            stabilityCanvasCtx.clearRect(0, 0, stabilityCanvas.width, stabilityCanvas.height);
            
            if (predictions.length > 0) {
                const hand = predictions[0];
                // Get index finger tip (landmark 8)
                const indexFingerTip = hand.landmarks[8];
                const fingerX = indexFingerTip[0];
                const fingerY = indexFingerTip[1];
                
                // Calculate distance from center
                const distance = Math.sqrt(
                    Math.pow(fingerX - centerX, 2) + 
                    Math.pow(fingerY - centerY, 2)
                );
                
                // Draw finger position
                stabilityCanvasCtx.beginPath();
                stabilityCanvasCtx.arc(fingerX, fingerY, 8, 0, 2 * Math.PI);
                stabilityCanvasCtx.fillStyle = distance <= targetRadius ? '#2ecc71' : '#e74c3c';
                stabilityCanvasCtx.fill();
                
                // Check if finger is in circle
                if (distance <= targetRadius) {
                    stabilityInCircleTime += 100;
                    document.getElementById('stability-status-value').textContent = 'Keep it steady!';
                } else {
                    document.getElementById('stability-status-value').textContent = 'Move to circle!';
                }
                
                stabilityTotalTime += 100;
                
                // Update accuracy
                const accuracy = Math.round((stabilityInCircleTime / stabilityTotalTime) * 100);
                document.getElementById('stability-accuracy-value').textContent = accuracy + '%';
            } else {
                document.getElementById('stability-status-value').textContent = 'Show your finger!';
            }
        } catch (error) {
            console.error('Detection error:', error);
        }
    };
    
    // Run detection every 100ms
    stabilityDetectionInterval = setInterval(detectFinger, 100);
    
    // Update timer display
    updateStabilityTimer();
    
    // End test after duration
    setTimeout(() => {
        endStabilityTest();
    }, stabilityDuration);
}

function runStabilityTestWithMotion() {
    stabilityMovementData = [];
    stabilityStartTime = Date.now();
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleStabilityMotion);
        
        // Update timer display
        updateStabilityTimer();
        
        // End test after duration
        setTimeout(() => {
            endStabilityTest();
        }, stabilityDuration);
    } else {
        document.getElementById('stability-status-value').textContent = 'Motion sensors not supported';
    }
}

function handleStabilityMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    
    if (acceleration) {
        const timestamp = Date.now() - stabilityStartTime;
        
        stabilityMovementData.push({
            timestamp,
            x: acceleration.x || 0,
            y: acceleration.y || 0,
            z: acceleration.z || 0
        });
    }
}

function handleStabilityOrientation(event) {
    // Backup using orientation events
    const timestamp = Date.now() - stabilityStartTime;
    
    // Scale orientation values to be similar to acceleration (roughly -10 to 10)
    stabilityMovementData.push({
        timestamp,
        x: (event.beta || 0) / 9,   // front-to-back tilt (-180 to 180 -> scaled down)
        y: (event.gamma || 0) / 9,  // left-to-right tilt (-90 to 90 -> scaled down)
        z: (event.alpha || 0) / 36  // compass direction (0 to 360 -> scaled down)
    });
}

function updateStabilityTimer() {
    const timerElement = document.getElementById('stability-timer-value');
    
    stabilityTimer = setInterval(() => {
        const elapsed = Date.now() - stabilityStartTime;
        const remaining = Math.max(0, stabilityDuration - elapsed);
        const seconds = (remaining / 1000).toFixed(1);
        
        timerElement.textContent = seconds + 's';
        
        if (remaining <= 0) {
            clearInterval(stabilityTimer);
        }
    }, 50);
}

function endStabilityTest() {
    clearInterval(stabilityTimer);
    clearInterval(stabilityDetectionInterval);
    
    // Stop camera
    if (stabilityStream) {
        stabilityStream.getTracks().forEach(track => track.stop());
        stabilityStream = null;
    }
    
    // Calculate stability score
    const score = calculateStabilityScore();
    displayStabilityResults(score);
}

function calculateStabilityScore() {
    if (stabilityTotalTime === 0) {
        return {
            score: 0,
            rating: 'No finger detected',
            variance: '0s in circle'
        };
    }
    
    // Calculate accuracy percentage
    const accuracy = (stabilityInCircleTime / stabilityTotalTime) * 100;
    const score = Math.round(accuracy);
    
    // Determine rating based on accuracy
    let rating;
    if (score >= 95) rating = 'Perfect Stability!';
    else if (score >= 85) rating = 'Excellent Control';
    else if (score >= 75) rating = 'Very Stable';
    else if (score >= 65) rating = 'Good Stability';
    else if (score >= 50) rating = 'Moderate Tremor';
    else if (score >= 30) rating = 'High Tremor';
    else rating = 'Very Shaky';
    
    const timeInCircle = (stabilityInCircleTime / 1000).toFixed(1);
    
    return {
        score,
        rating,
        variance: timeInCircle + 's in circle'
    };
}

function calculateVariance(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
}

function displayStabilityResults(result) {
    // Save score
    saveScore('hand-stability', {
        stabilityScore: result.score,
        rating: result.rating,
        timeInCircle: stabilityInCircleTime / 1000,
        totalTime: stabilityTotalTime / 1000,
        accuracy: result.score
    });
    
    // Get all-time stats
    const allScores = getScores('hand-stability');
    const allTimeBest = allScores.length > 0 ? Math.max(...allScores.map(s => s.stabilityScore)) : result.score;
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.stabilityScore, 0) / allScores.length).toFixed(1) : result.score;
    
    document.getElementById('stability-play-area').classList.add('hidden');
    document.getElementById('stability-results').classList.remove('hidden');
    
    document.querySelector('.stability-results .stability-score').textContent = result.score;
    document.querySelector('.stability-results .rating').textContent = result.rating;
    
    const detailsText = `Movement variance: ${result.variance} | Data points: ${stabilityMovementData.length}`;
    document.querySelector('.stability-results .details').textContent = detailsText;
    
    // Add all-time stats
    const resultsContainer = document.getElementById('stability-results');
    let statsDiv = resultsContainer.querySelector('.all-time-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'all-time-stats';
        statsDiv.style.cssText = 'margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        resultsContainer.appendChild(statsDiv);
    }
    statsDiv.innerHTML = `
        <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
        <div style="display: flex; justify-content: space-around; color: #fff; font-size: 14px;">
            <div>
                <div style="opacity: 0.7;">Best Score</div>
                <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}%</div>
            </div>
            <div>
                <div style="opacity: 0.7;">Avg Score</div>
                <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}%</div>
            </div>
            <div>
                <div style="opacity: 0.7;">Tests</div>
                <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
            </div>
        </div>
    `;
}

function stopStabilityCamera() {
    if (stabilityStream) {
        stabilityStream.getTracks().forEach(track => track.stop());
        stabilityStream = null;
    }
}

function restartStabilityTest() {
    resetHandStability();
    startStabilityTest();
}

// ========== TUG TEST (Timed Up and Go) ==========
let tugStream = null;
let tugPose = null;
let tugCanvas = null;
let tugCanvasCtx = null;
let tugVideo = null;
let tugStartTime = null;
let tugTurnStartTime = null;
let tugTurnEndTime = null;
let tugTestComplete = false;
let tugPhase = 'waiting'; // waiting, approaching, turning, returning, complete
let tugPreviousHipPosition = null;
let tugTurnSteps = 0;
let tugFrameCount = 0;
let tugDetectionActive = false;

function initTugTest() {
    tugPhase = 'waiting';
    tugTestComplete = false;
    tugTurnSteps = 0;
    tugFrameCount = 0;
    tugDetectionActive = false;
    
    document.getElementById('tug-start-screen').classList.remove('hidden');
    document.getElementById('tug-play-area').classList.add('hidden');
    document.getElementById('tug-results').classList.add('hidden');
    
    document.getElementById('tug-start-screen').onclick = startTugTest;
}

function resetTugTest() {
    tugDetectionActive = false;
    if (tugStream) {
        tugStream.getTracks().forEach(track => track.stop());
        tugStream = null;
    }
    if (tugPose) {
        tugPose.close();
        tugPose = null;
    }
    document.getElementById('tug-start-screen').onclick = null;
    initTugTest();
}

async function startTugTest() {
    document.getElementById('tug-start-screen').classList.add('hidden');
    document.getElementById('tug-play-area').classList.remove('hidden');
    
    const statusElement = document.getElementById('tug-status-value');
    statusElement.textContent = 'Starting camera...';
    
    try {
        // Get camera access
        tugStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            } 
        });
        
        tugVideo = document.getElementById('tug-video');
        tugCanvas = document.getElementById('tug-canvas');
        tugCanvasCtx = tugCanvas.getContext('2d');
        
        tugVideo.srcObject = tugStream;
        await tugVideo.play();
        
        // Set canvas size to match video
        tugCanvas.width = tugVideo.videoWidth || 640;
        tugCanvas.height = tugVideo.videoHeight || 480;
        
        statusElement.textContent = 'Loading pose detector...';
        
        // Initialize MediaPipe Pose
        if (typeof Pose === 'undefined') {
            throw new Error('MediaPipe Pose not loaded. Please check the library.');
        }
        
        tugPose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });
        
        tugPose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        
        tugPose.onResults(onTugPoseResults);
        
        // Wait for pose to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        statusElement.textContent = 'Stand 3 meters away!';
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        statusElement.textContent = 'Start walking now!';
        tugStartTime = Date.now();
        tugPhase = 'approaching';
        tugDetectionActive = true;
        
        // Start pose detection loop
        detectTugPose();
        
    } catch (error) {
        console.error('Camera or pose error:', error);
        statusElement.textContent = 'Error: ' + error.message;
        
        // Show helpful message
        if (error.message.includes('MediaPipe')) {
            statusElement.textContent = 'MediaPipe not loaded - Check internet connection';
        } else if (error.name === 'NotAllowedError') {
            statusElement.textContent = 'Camera permission denied';
        }
        
        setTimeout(() => resetTugTest(), 3000);
    }
}

async function detectTugPose() {
    if (!tugDetectionActive || !tugVideo || !tugPose) return;
    
    try {
        await tugPose.send({ image: tugVideo });
        tugFrameCount++;
        
        // Continue detection loop
        requestAnimationFrame(detectTugPose);
    } catch (error) {
        console.error('Pose detection error:', error);
    }
}

function onTugPoseResults(results) {
    if (!tugDetectionActive) return;
    
    // Clear canvas
    tugCanvasCtx.clearRect(0, 0, tugCanvas.width, tugCanvas.height);
    
    if (results.poseLandmarks) {
        // Draw skeleton
        drawTugPoseLandmarks(tugCanvasCtx, results.poseLandmarks);
        
        // Analyze movement
        analyzeTugMovement(results.poseLandmarks);
    }
    
    // Update timer
    if (tugStartTime && !tugTestComplete) {
        const elapsed = ((Date.now() - tugStartTime) / 1000).toFixed(1);
        document.getElementById('tug-timer-value').textContent = elapsed + 's';
    }
}

function drawTugPoseLandmarks(ctx, landmarks) {
    // Draw key points
    const keyPoints = [23, 24, 25, 26, 27, 28]; // Hips, knees, ankles
    
    ctx.fillStyle = '#2ecc71';
    for (const index of keyPoints) {
        const landmark = landmarks[index];
        if (landmark) {
            ctx.beginPath();
            ctx.arc(landmark.x * tugCanvas.width, landmark.y * tugCanvas.height, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    // Draw connections (hip to ankle lines)
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    
    // Left leg
    drawLine(ctx, landmarks[23], landmarks[25], landmarks[27]);
    // Right leg
    drawLine(ctx, landmarks[24], landmarks[26], landmarks[28]);
}

function drawLine(ctx, ...points) {
    if (!points[0]) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x * tugCanvas.width, points[0].y * tugCanvas.height);
    
    for (let i = 1; i < points.length; i++) {
        if (points[i]) {
            ctx.lineTo(points[i].x * tugCanvas.width, points[i].y * tugCanvas.height);
        }
    }
    ctx.stroke();
}

function analyzeTugMovement(landmarks) {
    // Get hip and ankle positions
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    
    if (!leftHip || !rightHip || !leftAnkle || !rightAnkle) return;
    
    // Calculate center hip position (for distance tracking)
    const hipCenter = {
        x: (leftHip.x + rightHip.x) / 2,
        y: (leftHip.y + rightHip.y) / 2,
        z: (leftHip.z + rightHip.z) / 2
    };
    
    // Phase detection based on movement
    if (tugPhase === 'approaching') {
        // User is walking toward camera (getting larger)
        if (hipCenter.z > -0.3) { // Close to camera
            console.log('Phase change: approaching -> turning');
            tugPhase = 'turning';
            tugTurnStartTime = Date.now();
            document.getElementById('tug-phase-value').textContent = 'Turning';
            document.getElementById('tug-status-value').textContent = 'Turn around!';
        }
    } else if (tugPhase === 'turning') {
        // Detect rotation and count steps
        if (tugPreviousHipPosition) {
            const rotation = Math.abs(leftHip.x - rightHip.x);
            const movement = Math.abs(hipCenter.x - tugPreviousHipPosition.x);
            
            // Count small movements as steps during turn
            if (movement > 0.02) {
                tugTurnSteps++;
            }
        }
        
        // Check if turn complete (moving away from camera)
        if (hipCenter.z < -0.5) {
            console.log('Phase change: turning -> returning');
            tugPhase = 'returning';
            tugTurnEndTime = Date.now();
            document.getElementById('tug-phase-value').textContent = 'Returning';
            document.getElementById('tug-status-value').textContent = 'Walk back!';
        }
    } else if (tugPhase === 'returning') {
        // User walking away (getting smaller)
        if (hipCenter.z < -1.0) { // Far from camera
            console.log('Phase change: returning -> complete');
            tugPhase = 'complete';
            tugTestComplete = true;
            endTugTest();
        }
    }
    
    // Debug: Log hip position every 30 frames
    if (tugFrameCount % 30 === 0) {
        console.log(`Phase: ${tugPhase}, Hip Z: ${hipCenter.z.toFixed(2)}`);
    }
    
    tugPreviousHipPosition = { ...hipCenter };
}

function endTugTest() {
    tugDetectionActive = false;
    
    if (tugStream) {
        tugStream.getTracks().forEach(track => track.stop());
    }
    
    const totalTime = ((Date.now() - tugStartTime) / 1000).toFixed(1);
    const turnTime = tugTurnEndTime && tugTurnStartTime ? 
        ((tugTurnEndTime - tugTurnStartTime) / 1000).toFixed(1) : '0.0';
    
    // Calculate assessment
    let assessment, rating;
    if (parseFloat(totalTime) < 10) {
        assessment = 'Excellent mobility - Low fall risk';
        rating = 'Excellent';
    } else if (parseFloat(totalTime) < 12) {
        assessment = 'Normal mobility';
        rating = 'Good';
    } else if (parseFloat(totalTime) < 20) {
        assessment = 'Mild difficulty - Monitor for changes';
        rating = 'Fair';
    } else {
        assessment = 'High fall risk - Consider medical consultation';
        rating = 'Needs Attention';
    }
    
    // Save score
    saveScore('tug-test', {
        totalTime: parseFloat(totalTime),
        turnTime: parseFloat(turnTime),
        turnSteps: tugTurnSteps,
        rating: rating,
        assessment: assessment
    });
    
    // Get all-time stats
    const allScores = getScores('tug-test');
    const allTimeBest = allScores.length > 0 ? Math.min(...allScores.map(s => s.totalTime)) : parseFloat(totalTime);
    const allTimeAverage = allScores.length > 0 ? 
        (allScores.reduce((sum, s) => sum + s.totalTime, 0) / allScores.length).toFixed(1) : totalTime;
    
    // Display results
    document.getElementById('tug-play-area').classList.add('hidden');
    document.getElementById('tug-results').classList.remove('hidden');
    
    document.querySelector('.tug-results .tug-score').textContent = totalTime + 's';
    document.querySelector('.tug-results .rating').textContent = rating;
    document.getElementById('tug-total-time').textContent = totalTime + 's';
    document.getElementById('tug-turn-time').textContent = turnTime + 's';
    document.getElementById('tug-turn-steps').textContent = tugTurnSteps;
    document.getElementById('tug-assessment').textContent = assessment;
    
    // Add all-time stats
    const resultsContainer = document.getElementById('tug-results');
    let statsDiv = resultsContainer.querySelector('.all-time-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'all-time-stats';
        statsDiv.style.cssText = 'margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        resultsContainer.appendChild(statsDiv);
    }
    statsDiv.innerHTML = `
        <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">📊 All-Time Statistics</div>
        <div style="display: flex; justify-content: space-around; color: #fff; font-size: 14px;">
            <div>
                <div style="opacity: 0.7;">Best Time</div>
                <div style="font-size: 20px; font-weight: bold; color: #ffd700;">${allTimeBest}s</div>
            </div>
            <div>
                <div style="opacity: 0.7;">Avg Time</div>
                <div style="font-size: 20px; font-weight: bold; color: #3498db;">${allTimeAverage}s</div>
            </div>
            <div>
                <div style="opacity: 0.7;">Tests</div>
                <div style="font-size: 20px; font-weight: bold;">${allScores.length}</div>
            </div>
        </div>
    `;
}

function restartTugTest() {
    resetTugTest();
    startTugTest();
}
