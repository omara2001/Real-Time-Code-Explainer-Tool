# 🚀 Real-Time Code Explainer

<div align="center">

<img src="https://img.shields.io/badge/Powered%20by-Groq%20AI-blue?style=for-the-badge&logo=ai&logoColor=white" alt="Powered by Groq">
<img src="https://img.shields.io/badge/Model-Llama3--70B-green?style=for-the-badge&logo=meta&logoColor=white" alt="Llama3 70B">
<img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
<img src="https://img.shields.io/badge/FastAPI-0.104-teal?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License">

<p align="center">
  <b>Understand any code instantly with AI-powered line-by-line explanations</b><br>
  <i>Perfect for code reviews, learning new languages, and understanding complex algorithms</i>
</p>

</div>

---

## ✨ Features

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Idea-Dark.svg" width="48" height="48" alt="AI Explanation">
      <br><b>AI-Powered Explanations</b><br>
      <sub>Groq's Llama3-70B model provides detailed, accurate explanations</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Lightning-Dark.svg" width="48" height="48" alt="Real-time">
      <br><b>Real-Time Analysis</b><br>
      <sub>Get instant line-by-line breakdowns of your code</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CodePen-Dark.svg" width="48" height="48" alt="Multi-language">
      <br><b>Multi-Language Support</b><br>
      <sub>Supports 15+ programming languages with auto-detection</sub>
    </td>
  </tr>
</table>

## 🎯 What You Get

<div align="center">
  <img src="https://github.com/omara2001/Real-Time-Code-Explainer-Tool/WhatYouGet.png" alt="Feature Breakdown" width="800">
</div>

### 📊 Comprehensive Analysis
- **Overall Explanation**: High-level overview of what the code does
- **Purpose**: The main goal and use cases of the code
- **Complexity Rating**: Simple, Moderate, or Complex with justification
- **Line-by-Line Breakdown**: Detailed explanation of each line
- **Key Concepts**: Programming concepts and patterns used
- **Best Practices**: What the code does well
- **Improvements**: Suggestions for better code quality
- **Example Usage**: How to use the code in practice

### 🎯 Perfect For
- 👨‍💻 **Developers**: Understanding unfamiliar codebases
- 👨‍🎓 **Students**: Learning new programming languages
- 👥 **Code Reviews**: Getting quick insights during reviews
- 🔍 **Debugging**: Understanding complex algorithms
- 📚 **Documentation**: Creating explanations for your code

## 🚀 Quick Start

### Prerequisites

<table>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Python-Dark.svg" width="48" height="48" alt="Python">
    </td>
    <td>
      <b>Python 3.11+</b><br>
      <sub>Required for backend</sub>
    </td>
    <td>
      <img src="https://console.groq.com/favicon.ico" width="48" height="48" alt="Groq">
    </td>
    <td>
      <b>Groq API Key</b><br>
      <sub><a href="https://console.groq.com/keys">Get it free</a></sub>
    </td>
  </tr>
</table>

### 🎯 Option 1: Use Hosted Version

<div align="center">
  <a href="https://web-production-32b71.up.railway.app/">
    <img src="https://img.shields.io/badge/Try%20Now-Live%20Demo-blue?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Try Now">
  </a>
</div>

### 🛠️ Option 2: Run Locally

<details>
<summary><b>Click for local setup instructions</b></summary>

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/omara2001/Real-Time-Code-Explainer-Tool.git
cd Real-Time-Code-Explainer-Tool
```

#### 2️⃣ Backend Setup

The backend is already deployed on Railway. You can use the hosted version at:
https://web-production-32b71.up.railway.app/

If you want to run your own backend:

```bash
# Clone the backend repository (if available separately)
# Install dependencies
pip install fastapi uvicorn pydantic groq

# Set environment variable
export GROQ_API_KEY=your_groq_api_key_here

# Run the server
uvicorn main:app --reload
```

#### 3️⃣ Frontend Setup

```bash
# From the project root
python -m http.server 8000
```

Open http://localhost:8000 in your browser!

#### 4️⃣ Using the Application

1. Enter your code in the input area
2. Select the programming language (or use auto-detect)
3. Choose the explanation level (beginner, intermediate, expert)
4. Click "Explain Code" button
5. View the detailed explanation

</details>

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="https://github.com/omara2001/Real-Time-Code-Explainer-Tool/InputScreen.png" alt="Input Screen">
        <p align="center"><b>Clean Code Input Interface</b></p>
      </td>
      <td width="50%">
        <img src="https://github.com/omara2001/Real-Time-Code-Explainer-Tool/ExplanationScreen.png" alt="Explanation Screen">
        <p align="center"><b>Detailed Code Explanations</b></p>
      </td>
    </tr>
  </table>
</div>

## 🌐 Supported Languages

<div align="center">
  <table>
    <tr>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Python-Dark.svg" width="40" height="40" alt="Python">
        <br>Python
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg" width="40" height="40" alt="JavaScript">
        <br>JavaScript
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg" width="40" height="40" alt="TypeScript">
        <br>TypeScript
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Java-Dark.svg" width="40" height="40" alt="Java">
        <br>Java
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CPP.svg" width="40" height="40" alt="C++">
        <br>C++
      </td>
    </tr>
    <tr>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CS.svg" width="40" height="40" alt="C#">
        <br>C#
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/GoLang.svg" width="40" height="40" alt="Go">
        <br>Go
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Rust.svg" width="40" height="40" alt="Rust">
        <br>Rust
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Ruby.svg" width="40" height="40" alt="Ruby">
        <br>Ruby
      </td>
      <td align="center" width="120">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PHP-Dark.svg" width="40" height="40" alt="PHP">
        <br>PHP
      </td>
    </tr>
  </table>
</div>

And more: Swift, Kotlin, HTML, CSS, SQL, R, MATLAB, Scala, Haskell

## 🛠️ Tech Stack

<div align="center">
  <table>
    <tr>
      <th align="center" width="50%">Backend</th>
      <th align="center" width="50%">Frontend</th>
    </tr>
    <tr>
      <td>
        <div align="center">
          <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
          <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
          <img src="https://img.shields.io/badge/Groq-FF6B6B?style=for-the-badge&logo=ai&logoColor=white" alt="Groq">
        </div>
        <ul>
          <li>🚀 <b>FastAPI</b>: High-performance Python web framework</li>
          <li>🧠 <b>Groq API</b>: Lightning-fast Llama3-70B inference</li>
          <li>✅ <b>Pydantic</b>: Data validation and parsing</li>
          <li>🔄 <b>CORS</b>: Cross-origin resource sharing</li>
        </ul>
      </td>
      <td>
        <div align="center">
          <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
          <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
        </div>
        <ul>
          <li>🎨 <b>Modern UI</b>: Dark theme with gradient accents</li>
          <li>📱 <b>Responsive</b>: Works on all device sizes</li>
          <li>⚡ <b>Real-time</b>: Instant code analysis</li>
          <li>✨ <b>Animations</b>: Smooth transitions and effects</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 📖 API Documentation

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status and model info |
| `/explain` | POST | Get detailed code explanation |
| `/explain-simple` | POST | Get quick code explanation |
| `/supported-languages` | GET | List of supported languages |
| `/health` | GET | Health check endpoint |

### Request Format

```json
{
  "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)",
  "language": "python",
  "explanation_level": "beginner"
}
```

### Response Format

```json
{
  "overall_explanation": "This function calculates the factorial of a number...",
  "purpose": "To compute the product of all positive integers up to n",
  "complexity": "Simple - Uses basic recursion",
  "line_by_line": [
    {
      "line_number": 1,
      "code": "def factorial(n):",
      "explanation": "Defines a function named 'factorial' that takes one parameter 'n'",
      "concepts": ["function definition", "parameters"]
    }
  ],
  "key_concepts": ["recursion", "base case", "factorial"],
  "best_practices": ["Clear function name", "Proper base case"],
  "potential_improvements": ["Add input validation", "Consider iterative approach"],
  "example_usage": "result = factorial(5)  # Returns 120"
}
```

## 🚀 Deployment

### Railway Deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/code-explainer)

1. Click the deploy button
2. Add your `GROQ_API_KEY` environment variable
3. Railway automatically deploys your app

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key | ✅ |
| `PORT` | Server port (auto-set by Railway) | ❌ |

## 🔧 Configuration

### Customization Options

- **Explanation Levels**: Beginner, Intermediate, Expert
- **Language Support**: Add more languages in `supported-languages` endpoint
- **UI Theme**: Modify CSS variables for custom themes
- **API Rate Limiting**: Configure in backend middleware

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<div align="center">
  <a href="https://github.com/omara2001/Real-Time-Code-Explainer-Tool/issues/new?template=bug_report.md">
    <img src="https://img.shields.io/badge/🐛%20Report%20Bug-red?style=for-the-badge" alt="Report Bug">
  </a>
  <a href="https://github.com/omara2001/Real-Time-Code-Explainer-Tool/issues/new?template=feature_request.md">
    <img src="https://img.shields.io/badge/✨%20Request%20Feature-blue?style=for-the-badge" alt="Request Feature">
  </a>
</div>

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Examples

### Python Example
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

### JavaScript Example
```javascript
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
```

## 🐛 Troubleshooting

<details>
<summary><b>Common Issues</b></summary>

### API Connection Errors
- Verify your Groq API key is correct
- Check if the backend server is running
- Ensure CORS is properly configured

### No Explanation Generated
- Check if code is properly formatted
- Verify language selection
- Try with a simpler code example

### Slow Response
- Groq API might be under heavy load
- Try reducing code complexity
- Check your internet connection

</details>

## � Recent Updates

### Frontend Improvements
- ✅ **Separated CSS and JavaScript**: Improved code organization with external files
- ✅ **Enhanced Error Handling**: Better error messages and debugging
- ✅ **Improved API Integration**: More robust communication with the backend
- ✅ **CORS Support**: Added proper cross-origin resource sharing
- ✅ **Responsive Design**: Works well on all device sizes

## �🔮 Roadmap

- [ ] Add support for more programming languages
- [ ] Implement code syntax highlighting
- [ ] Add explanation history and bookmarks
- [ ] Support for file uploads
- [ ] Export explanations as PDF/Markdown
- [ ] Add collaborative features
- [ ] Implement user accounts
- [ ] Add API rate limiting
- [ ] Create browser extension
- [ ] Add voice explanations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://console.groq.com/favicon.ico" width="40" height="40" alt="Groq">
        <br><b>Groq</b><br>
        <sub>Lightning-fast inference</sub>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Meta.svg" width="40" height="40" alt="Meta">
        <br><b>Meta</b><br>
        <sub>Llama3 model</sub>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/FastAPI.svg" width="40" height="40" alt="FastAPI">
        <br><b>FastAPI</b><br>
        <sub>Backend framework</sub>
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <p>
    <b>Built with ❤️ for developers by developers</b><br>
    <sub>If you find this helpful, please give it a ⭐</sub>
  </p>

  <img src="https://img.shields.io/badge/Made%20with-Love-red?style=for-the-badge" alt="Made with Love by Omara">
</div>
