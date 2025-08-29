# 🎯 Cloud IDE Demo Guide

## 🚀 Quick Demo

Your Cloud IDE is now running! Here's how to test it:

### 1. **Open the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### 2. **Test the Complete Flow**

#### Step 1: Chat Interface
- Type in the chat panel: **"build me a hello world website"**
- Click the send button or press Enter
- Watch the AI generate your website

#### Step 2: Live Preview
- The generated website appears in the right panel
- Use the view mode buttons to test responsive design:
  - 🖥️ Desktop view
  - 📱 Mobile view  
  - 💻 Tablet view

#### Step 3: Code View
- Click the "Code" button to see the generated HTML/CSS/JS
- Copy the code with the "Copy" button
- Click "Preview" to return to the live view

#### Step 4: Iterate
- Ask for changes: **"make it more colorful"**
- **"add a contact form"**
- **"make it responsive for mobile"**

### 3. **Example Prompts to Try**

```
✅ "build me a hello world website"
✅ "create a modern landing page with a hero section"
✅ "make a portfolio website with dark theme"
✅ "build a restaurant website with menu"
✅ "create a blog with navigation and sidebar"
✅ "make an e-commerce product page"
```

### 4. **Features to Test**

- **Responsive Design**: Switch between desktop/tablet/mobile views
- **Real-time Updates**: See changes instantly in the preview
- **Code Generation**: Toggle between preview and generated code
- **Chat History**: All conversations are saved in the session
- **Loading States**: Beautiful loading animations during generation

### 5. **Troubleshooting**

#### If the website doesn't generate:
1. Check if you have an OpenAI API key in `backend/.env`
2. Restart the backend server: `cd backend && npm run dev`
3. Check the browser console for errors

#### If the preview doesn't show:
1. Refresh the page
2. Check if both servers are running (ports 3000 and 3001)
3. Try a different prompt

### 6. **Performance Tips**

- **Short, clear prompts** work best
- **Specific requests** get better results
- **Iterative changes** build upon previous generations
- **Refresh preview** if the iframe gets stuck

---

## 🎉 Demo Complete!

You've successfully tested:
- ✅ AI-powered website generation
- ✅ Real-time live preview
- ✅ Responsive design testing
- ✅ Code generation and viewing
- ✅ Chat-based interface

**Next Steps:**
1. Set your OpenAI API key for full functionality
2. Deploy to the cloud using the provided scripts
3. Customize the UI and add more features

**Happy coding! 🚀**
