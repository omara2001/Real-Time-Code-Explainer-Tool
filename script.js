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
        // Based on the Postman screenshot
        const requestBody = {
            code: code,
            language: language === 'auto' ? null : language,
            explanation_level: level
        };

        console.log('Sending request to API:', requestBody);

        const response = await fetch(`${API_URL}/explain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            mode: 'cors', // Enable CORS
            credentials: 'same-origin' // Include credentials only for same-origin requests
        });

        // Log the response status and headers for debugging
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers]));

        if (!response.ok) {
            // Try to get error details from the response
            const errorText = await response.text();
            console.error('Error response:', errorText);

            let errorMessage = 'Failed to explain code';
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (e) {
                // If parsing fails, use the raw text
                if (errorText) {
                    errorMessage = `Server error: ${errorText.substring(0, 100)}${errorText.length > 100 ? '...' : ''}`;
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
        showError('Error: ' + error.message);
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
function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
