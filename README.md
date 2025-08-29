# 🚀 Cloud IDE with LLM Integration

A modern, AI-powered cloud IDE that generates websites based on natural language descriptions. Built with React, Node.js, and OpenAI's GPT models.

## ✨ Features

- **AI-Powered Website Generation**: Describe what you want to build in plain English
- **Real-time Live Preview**: See your generated website instantly
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Code View**: Toggle between preview and generated HTML/CSS/JS code
- **Multiple View Modes**: Desktop, tablet, and mobile preview options
- **Modern UI**: Beautiful, dark theme with smooth animations

## 🏗️ Architecture

- **Frontend**: React 18 with modern hooks and functional components
- **Backend**: Node.js + Express.js REST API
- **LLM Integration**: OpenAI GPT-3.5-turbo for website generation
- **Real-time Preview**: Iframe-based live website rendering
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cloud-ide-llm
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp env.example .env
   ```
   
       Edit `.env` and add your OpenAI API key:
    ```env
    OPENAI_API_KEY=your_actual_openai_api_key_here
    PORT=3001
    ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend (port 5000) and frontend (port 3000) servers concurrently.

### Alternative: Run separately

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm start
```

**Note:** Backend runs on port 3001, frontend on port 3000

## 🌐 Usage

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Describe your website** in the chat panel on the left
   - Example: "build me a hello world website"
   - Example: "create a modern landing page with a contact form"
3. **View the generated website** in the live preview panel on the right
4. **Toggle between preview and code** using the "Code" button
5. **Switch view modes** (desktop/tablet/mobile) using the view mode buttons

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Backend server port | 3001 |
| `NODE_ENV` | Environment mode | development |

### OpenAI API Setup

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the key to your `.env` file

## 📁 Project Structure

```
cloud-ide-llm/
├── backend/                 # Node.js + Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── env.example         # Environment variables template
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── App.js          # Main App component
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json with scripts
└── README.md               # This file
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### End-to-End Testing
```bash
# Start the application
npm run dev

# Test the complete flow:
# 1. Open http://localhost:3000
# 2. Type "build me a hello world website"
# 3. Verify website generation and preview
# 4. Test responsive design and view modes
```

## 🚀 Deployment

### Local Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production backend
cd ../backend
npm start
```

### Cloud Deployment

#### Option 1: Render.com (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

#### Option 2: Heroku
```bash
# Add Heroku remote
heroku create your-app-name

# Deploy
git push heroku main
```

#### Option 3: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔒 Security Considerations

- **API Key Protection**: Never commit your `.env` file
- **CORS Configuration**: Backend is configured for development; adjust for production
- **Input Validation**: User inputs are sanitized before sending to OpenAI
- **Sandbox Mode**: Preview iframe uses sandbox attributes for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- React team for the amazing framework
- Express.js for the robust backend framework
- Lucide React for beautiful icons

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/cloud-ide-llm/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Happy coding! 🎉**
