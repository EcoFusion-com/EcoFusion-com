# Eco Fusion - Intelligent Technology Solutions

A modern React application built with Vite, TypeScript, and shadcn-ui components for Eco Fusion's technology services. Specializing in AI & Automation, IoT Solutions, and Full-Stack Development.

## 🚀 Core Services

### 🤖 **AI & Automation**
- **AI Agents & Chatbots**: Intelligent conversational interfaces
- **Predictive Analytics**: Data-driven insights and forecasting
- **RPA (Robotic Process Automation)**: Automated workflow solutions
- **CRM/ERP Integration**: Seamless system connectivity

### 🌐 **IoT Solutions**
- **Smart Home Systems**: Connected home automation
- **Industrial IoT**: Manufacturing and industrial monitoring
- **Energy Monitoring**: Real-time energy management
- **Real-time Data Analytics**: Live data processing and insights

### 💻 **Full-Stack Development**
- **SaaS Platforms**: Scalable software-as-a-service solutions
- **Custom Enterprise Apps**: Tailored business applications
- **Web & Mobile Development**: Cross-platform solutions
- **API Development**: Robust backend services

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components
- **React Router** - Client-side routing

### **Backend & AI**
- **Rasa** - Conversational AI framework
- **Python** - AI/ML and backend development
- **Hugging Face** - Advanced language models
- **Node.js** - Server-side JavaScript

### **DevOps & Tools**
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Vercel/Netlify** - Deployment platforms

## 📁 Project Structure

```
Eco-Fusion/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Hero.tsx        # Landing page hero section
│   │   ├── Services.tsx    # Core services showcase
│   │   ├── About.tsx       # Company information
│   │   ├── TechStack.tsx   # Technology capabilities
│   │   ├── Contact.tsx     # Contact form and info
│   │   ├── Footer.tsx      # Site footer
│   │   └── ChatbotWidget.tsx # AI chatbot interface
│   ├── contexts/           # React contexts
│   │   └── ChatbotContext.tsx # Chatbot state management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── pages/              # Page components
├── eco-fusion-chatbot/     # Rasa chatbot backend
│   ├── actions/            # Custom actions
│   ├── data/               # Training data
│   └── models/             # Trained models
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+ (for chatbot)
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone <YOUR_REPOSITORY_URL>
cd eco-fusion-website
```

2. **Install frontend dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
# Create .env file
cp .env.example .env

# Configure chatbot server URL
VITE_RASA_SERVER_URL=http://localhost:5005
```

4. **Start the development server**:
```bash
npm run dev
```

### Chatbot Setup

1. **Navigate to chatbot directory**:
```bash
cd eco-fusion-chatbot
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Set up environment**:
```bash
# Create .env file with your Hugging Face token
echo "HF_TOKEN=your_hugging_face_token_here" > .env
```

5. **Train the model**:
```bash
python train_enhanced_model.py
```

6. **Start Rasa servers**:
```bash
# Terminal 1: Start Rasa server
rasa run --enable-api --cors "*"

# Terminal 2: Start actions server
rasa run actions
```

## 🎯 Features

### **Frontend Features**
- ✅ **Modern Design**: Clean, professional UI with dark theme
- ✅ **Responsive Layout**: Works on all devices
- ✅ **Interactive Components**: Smooth animations and transitions
- ✅ **SEO Optimized**: Meta tags and structured data
- ✅ **Accessibility**: ARIA labels and keyboard navigation

### **Chatbot Features**
- ✅ **AI-Powered**: Advanced language model integration
- ✅ **Context Aware**: Remembers conversation history
- ✅ **Project Requirements**: Intelligent form filling
- ✅ **Real-time**: Instant responses
- ✅ **Multi-platform**: Works on web and mobile

### **Business Features**
- ✅ **Service Showcase**: Detailed service descriptions
- ✅ **Portfolio Display**: Project examples and case studies
- ✅ **Contact Integration**: Multiple contact methods
- ✅ **Lead Generation**: Newsletter and consultation booking

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run setup-chatbot` - Setup chatbot configuration

## 🌐 Deployment

### **Frontend Deployment**
This project can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure in repository settings
- **AWS S3 + CloudFront**: Upload dist folder

### **Chatbot Deployment**
- **Heroku**: Use Procfile for Rasa deployment
- **Docker**: Use provided docker-compose.yml
- **AWS/GCP**: Deploy as containerized service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## 📞 Contact & Support

- **Email**: ecofusion.net@gmail.com
- **Phone**: +92 (370) 429-0725
- **Address**: Block C 1 Phase 1 Johar Town, Lahore
- **Working Hours**: Monday - Friday, 9:00 AM - 6:00 PM PST

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Rasa** for the conversational AI framework
- **Hugging Face** for advanced language models
- **Tailwind CSS** for the utility-first CSS framework

---

**Eco Fusion** - Transforming ideas into intelligent digital solutions since 2021.
