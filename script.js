// API endpoint configuration
const API_URL = 'https://web-production-32b71.up.railway.app';

// DOM elements
const codeInput = document.getElementById('codeInput');
const languageSelect = document.getElementById('language');
const levelSelect = document.getElementById('level');
const explainBtn = document.getElementById('explainBtn');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');
const outputContent = document.getElementById('outputContent');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add click event for explain button
    explainBtn.addEventListener('click', handleExplainCode);

    // Add keyboard shortcut (Ctrl+Enter or Cmd+Enter)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            explainBtn.click();
        }
    });

    // Auto-resize textarea
    codeInput.addEventListener('input', () => {
        codeInput.style.height = 'auto';
        codeInput.style.height = codeInput.scrollHeight + 'px';
    });
});

// Main function to handle code explanation
async function handleExplainCode() {
    const code = codeInput.value.trim();
    const language = languageSelect.value;
    const level = levelSelect.value;

    if (!code) {
        showError('Please enter some code to explain');
        return;
    }

    // Show loading state
    loadingElement.style.display = 'block';
    explainBtn.disabled = true;
    errorElement.style.display = 'none';

    try {
        // Format the request body according to the API's expected format
        const requestBody = {
            code: code,
            language: language, // Send 'auto' as a string instead of null
            explanation_level: level
        };

        console.log('Sending request to API:', requestBody);
        console.log('Language selected:', language);

        // First try the /explain endpoint
        let response;
        try {
            response = await fetch(`${API_URL}/explain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            mode: 'cors', // Enable CORS
            credentials: 'same-origin' // Include credentials only for same-origin requests
            });
        } catch (error) {
            console.error('Error with /explain endpoint:', error);
            console.log('Falling back to /explain-simple endpoint...');

            // If the main endpoint fails, try the simpler endpoint
            response = await fetch(`${API_URL}/explain-simple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody),
                mode: 'cors',
                credentials: 'same-origin'
            });
        }

        // Log the response status and headers for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers]));

        if (!response.ok) {
            // Try to get error details from the response
            const errorText = await response.text();
            console.error('Error response:', errorText);
            console.error('Response status:', response.status);

            let errorMessage = 'Failed to explain code';

            // Handle specific HTTP status codes with user-friendly messages
            if (response.status === 422) {
                errorMessage = 'The server couldn\'t process your code. It might be in an unsupported format.';
            } else if (response.status === 400) {
                errorMessage = 'There was an issue with your request. Please check your code and try again.';
            } else if (response.status === 500) {
                errorMessage = 'The server encountered an internal error. Our team has been notified.';
            } else if (response.status === 503) {
                errorMessage = 'The explanation service is temporarily unavailable. Please try again later.';
            } else if (response.status === 429) {
                errorMessage = 'Too many requests. Please wait a moment before trying again.';
            } else {
                // Try to parse the error response for more details
                try {
                    const errorData = JSON.parse(errorText);
                    console.error('Error data:', errorData);

                    // Handle Pydantic validation errors
                    if (Array.isArray(errorData.detail)) {
                        // Create a more user-friendly validation error message
                        errorMessage = 'There was an issue with your request format.';
                        console.log('Validation errors:', errorData.detail);
                    } else {
                        errorMessage = errorData.detail || errorData.message || errorMessage;
                    }
                } catch (e) {
                    // If parsing fails, use the raw text but make it user-friendly
                    console.error('Error parsing error response:', e);
                    if (errorText) {
                        // Don't expose raw error text to users
                        errorMessage = `The server returned an error (${response.status})`;
                    }
                }
            }

            throw new Error(errorMessage);
        }

        // Parse the successful response
        const responseText = await response.text();
        console.log('Response text:', responseText.substring(0, 200) + '...');

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Error parsing JSON response:', e);
            throw new Error('Invalid response format from server');
        }

        displayExplanation(result);

    } catch (error) {
        console.error('Error:', error);

        // Create a user-friendly error message
        let userMessage = '';
        let showTrySimpleButton = false;

        if (error.message.includes('json')) {
            userMessage = 'The server encountered a technical issue processing your code.';
            showTrySimpleButton = true;
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            userMessage = 'Unable to connect to the explanation service. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
            userMessage = 'The request took too long to process. Please try again with a smaller code sample.';
            showTrySimpleButton = true;
        } else if (error.message.includes('Validation error')) {
            userMessage = 'There was an issue with your request format. Please try again with different options.';
        } else if (error.message.includes('Server error') || error.message.includes('422')) {
            userMessage = 'The server encountered an error processing your request. This might be due to an issue with the code format or language detection.';
            showTrySimpleButton = true;
        } else {
            // If we can't determine a specific error, provide a generic but friendly message
            userMessage = 'Something went wrong while explaining your code. Please try again or try with a different code sample.';
            showTrySimpleButton = true;
        }

        showError(userMessage, showTrySimpleButton);
    } finally {
        loadingElement.style.display = 'none';
        explainBtn.disabled = false;
    }
}

// Display the explanation in the output section
function displayExplanation(data) {
    console.log('Displaying explanation data:', data);

    // Check if we have valid data
    if (!data || typeof data !== 'object') {
        showError('Received invalid data from the server');
        return;
    }

    let html = '';

    // Check if this is a simple explanation (from /explain-simple endpoint)
    if (data.explanation && !data.overall_explanation) {
        // Simple explanation format
        html += `
            <div class="explanation-section">
                <div class="fallback-notice">
                    <div class="fallback-header">
                        <i class="fas fa-info-circle"></i> Using simplified explanation mode
                    </div>
                    <div class="fallback-details">
                        The advanced explanation engine encountered an issue, so we're using our simplified engine instead.
                        This provides basic code explanations without the detailed breakdown.
                    </div>
                </div>
                <h3><i class="fas fa-book"></i> Explanation</h3>
                <p>${data.explanation || 'No explanation provided.'}</p>
            </div>
        `;

        outputContent.innerHTML = html;
        return;
    }

    // Detailed explanation format (from /explain endpoint)
    // Overall explanation section
    html += `
        <div class="explanation-section">
            <h3><i class="fas fa-book"></i> Overview</h3>
            <p>${data.overall_explanation || 'No overall explanation provided.'}</p>
        </div>
    `;

    // Purpose section
    if (data.purpose) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-bullseye"></i> Purpose</h3>
                <p>${data.purpose}</p>
            </div>
        `;
    }

    // Complexity section
    if (data.complexity) {
        // Determine complexity class based on the text
        let complexityClass = 'moderate'; // Default
        const complexityLower = data.complexity.toLowerCase();

        if (complexityLower.includes('simple') || complexityLower.includes('easy') || complexityLower.includes('basic')) {
            complexityClass = 'simple';
        } else if (complexityLower.includes('complex') || complexityLower.includes('difficult') || complexityLower.includes('hard')) {
            complexityClass = 'complex';
        }

        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-tachometer-alt"></i> Complexity</h3>
                <span class="complexity-badge complexity-${complexityClass}">
                    ${data.complexity}
                </span>
            </div>
        `;
    }

    // Line-by-line explanation
    if (data.line_by_line && Array.isArray(data.line_by_line) && data.line_by_line.length > 0) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-list-ol"></i> Line-by-Line Explanation</h3>
                ${data.line_by_line.map(line => {
                    if (!line) return '';

                    return `
                        <div class="line-explanation">
                            <div class="line-number">Line ${line.line_number || '?'}</div>
                            <div class="line-code">${escapeHtml(line.code || '')}</div>
                            <div class="line-explanation-text">${line.explanation || 'No explanation available'}</div>
                            ${line.concepts && Array.isArray(line.concepts) && line.concepts.length > 0 ? `
                                <div class="concepts-list">
                                    ${line.concepts.map(concept => `
                                        <span class="concept-tag">${escapeHtml(concept)}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Key concepts section
    if (data.key_concepts && Array.isArray(data.key_concepts) && data.key_concepts.length > 0) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-key"></i> Key Concepts</h3>
                <div class="concepts-list">
                    ${data.key_concepts.map(concept => `
                        <span class="concept-tag">${escapeHtml(concept)}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Best practices section
    if (data.best_practices && Array.isArray(data.best_practices) && data.best_practices.length > 0) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-check-circle"></i> Best Practices</h3>
                ${data.best_practices.map(practice => `
                    <div class="list-item">${escapeHtml(practice)}</div>
                `).join('')}
            </div>
        `;
    }

    // Potential improvements section
    if (data.potential_improvements && Array.isArray(data.potential_improvements) && data.potential_improvements.length > 0) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Potential Improvements</h3>
                ${data.potential_improvements.map(improvement => `
                    <div class="list-item">${escapeHtml(improvement)}</div>
                `).join('')}
            </div>
        `;
    }

    // Example usage section
    if (data.example_usage) {
        html += `
            <div class="explanation-section">
                <h3><i class="fas fa-code"></i> Example Usage</h3>
                <div class="line-code">${escapeHtml(data.example_usage)}</div>
            </div>
        `;
    }

    outputContent.innerHTML = html;
}

// Helper function to show error messages
function showError(message, showTrySimpleButton = false) {
    // Add an icon to the error message
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-circle" style="position: absolute; left: 15px; top: 15px; font-size: 1.2rem;"></i>
        ${message}
        ${showTrySimpleButton ?
            '<div style="margin-top: 10px;"><button id="trySimpleBtn" class="retry-btn">Try Simplified Mode</button></div>' :
            '<div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">Try adjusting your code or selecting a different language.</div>'}
    `;

    errorElement.style.display = 'block';

    // If we have a "Try Simplified Mode" button, add a click handler
    const trySimpleBtn = document.getElementById('trySimpleBtn');
    if (trySimpleBtn) {
        trySimpleBtn.addEventListener('click', async () => {
            // Hide the error
            errorElement.style.display = 'none';

            // Show loading state
            loadingElement.style.display = 'block';
            explainBtn.disabled = true;

            try {
                // Get the current values
                const code = codeInput.value.trim();
                const language = languageSelect.value;
                const level = levelSelect.value;

                // Make a direct request to the explain-simple endpoint
                const requestBody = {
                    code: code,
                    language: language,
                    explanation_level: level
                };

                const response = await fetch(`${API_URL}/explain-simple`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    mode: 'cors',
                    credentials: 'same-origin'
                });

                if (!response.ok) {
                    throw new Error('Failed to get simplified explanation');
                }

                const result = await response.json();
                displayExplanation(result);

            } catch (error) {
                console.error('Error with simplified mode:', error);
                showError('Unable to get a simplified explanation. Please try again later.');
            } finally {
                loadingElement.style.display = 'none';
                explainBtn.disabled = false;
            }
        });
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

