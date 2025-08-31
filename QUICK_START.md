# Quick Start Guide - Eco Fusion Chatbot

## 🚀 Get Started in 4 Steps

### 1. Create Environment File

Create a `.env` file in the Eco Fusion project root with this content:

```env
# Rasa Server Configuration
VITE_RASA_SERVER_URL=http://localhost:5005

# Chatbot UI Settings
VITE_CHATBOT_AUTO_OPEN=false
VITE_CHATBOT_SHOW_WELCOME=true
```

### 2. Train Enhanced Chatbot Model

In your `eco-fusion-chatbot` directory:

```bash
# Train the enhanced model with comprehensive knowledge
python train_enhanced_model.py

# Or manually:
rasa train
```

### 3. Start Your Rasa Server

In your `eco-fusion-chatbot` directory:

```bash
# Terminal 1: Start Rasa server
rasa run --enable-api --cors "*"

# Terminal 2: Start Rasa actions server
rasa run actions
```

### 4. Start the React App

In your `Eco-Fusion` directory:

```bash
npm run dev
```

## ✅ What You Should See

1. **React app running** at `http://localhost:5173`
2. **Enhanced chatbot widget** in the bottom-right corner
3. **"Start Your Project" button** in the hero section opens the chat
4. **Newsletter subscription** in footer opens the chat
5. **Comprehensive responses** about Eco Fusion's projects, technologies, and services

## 🎯 Enhanced Chatbot Capabilities

The chatbot now has comprehensive knowledge about Eco Fusion:

### 📋 **Company Information**
- When Eco Fusion was founded (2021)
- Company mission and vision
- Working hours and contact information
- Team expertise and values

### 🚀 **Project Portfolio**
- 20+ successful projects delivered
- AI & Automation projects (chatbots, RPA, analytics)
- IoT solutions (smart home, industrial, agricultural)
- Full-stack applications (SaaS, e-commerce, dashboards)

### 💻 **Technology Stack**
- **Programming Languages:** Python, JavaScript, TypeScript, Java, C#, PHP, Go
- **Frameworks:** React, Vue.js, Angular, Django, Express.js, ASP.NET Core
- **Cloud Platforms:** AWS, Azure, Google Cloud Platform
- **Databases:** PostgreSQL, MongoDB, MySQL, Redis
- **DevOps:** Docker, Kubernetes, CI/CD

### 🎯 **Services & Solutions**
- **AI & Automation:** Chatbots, RPA, Predictive Analytics
- **IoT Solutions:** Smart Home, Industrial IoT, Energy Monitoring
- **Full-Stack Development:** Web Apps, Mobile Apps, SaaS Platforms

## 🔧 Troubleshooting

### Chatbot not appearing?
- Check browser console for errors
- Verify `.env` file exists and has correct values
- Make sure Rasa server is running on port 5005

### Cannot connect to Rasa?
- Ensure Rasa server is running: `rasa run --enable-api --cors "*"`
- Check if port 5005 is available
- Verify CORS settings in `credentials.yml`

### Chatbot giving generic responses?
- Make sure you've trained the enhanced model: `python train_enhanced_model.py`
- Restart the Rasa server after training
- Check that the model was trained successfully

### Setup script not working?
- The project uses ES modules, so the setup script needs to be updated
- For now, create the `.env` file manually (see step 1)

## 🧪 Test the Enhanced Chatbot

Try these questions to test the new capabilities:

### 📊 **Project & Portfolio**
- "Can you show me your projects?"
- "What projects have you completed?"
- "Show me your portfolio"
- "Can I see your GitHub?"
- "What's your GitHub profile?"

### 💻 **Technologies**
- "What programming languages do you use?"
- "Tell me about frameworks you use"
- "Can you make project in C#?"
- "What cloud technologies do you use?"

### 🏢 **Company Information**
- "When was Eco Fusion founded?"
- "What are your working hours?"
- "Tell me about Eco Fusion"

### 🎯 **Services & Consultation**
- "Can I get free consultation?"
- "What services do you provide?"
- "Do you create smart home systems?"

### 🤖 **AI & Specific Projects**
- "Tell me about your AI projects"
- "What mobile apps have you built?"
- "Show me your machine learning work"

## 📚 Next Steps

- Read `CHATBOT_INTEGRATION.md` for detailed documentation
- Test the chatbot with various questions about Eco Fusion
- Try the "Start Your Project" button in the hero section
- Check out the newsletter subscription in the footer
- Customize responses in `domain.yml` if needed

## 🎉 Features to Test

- ✅ Enhanced knowledge about Eco Fusion
- ✅ Comprehensive project portfolio
- ✅ Detailed technology stack information
- ✅ Company information and working hours
- ✅ Service descriptions and capabilities
- ✅ Free consultation information
- ✅ Floating chat widget
- ✅ Message sending and receiving
- ✅ Session persistence (refresh page)
- ✅ Error handling (disconnect Rasa server)
- ✅ Button integrations
- ✅ Responsive design (mobile/desktop)

The enhanced chatbot is now fully integrated with comprehensive knowledge about Eco Fusion! 🚀
