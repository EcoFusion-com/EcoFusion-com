# Eco Fusion - Intelligent Technology Solutions

A modern, production-ready React application built with Vite, TypeScript, and shadcn/ui components for Eco Fusion's technology services. Specializing in AI & Automation, IoT Solutions, and Full-Stack Development with an integrated AI chatbot.

## 🚀 Live Demo

- **Frontend**: [https://ecofusion.vercel.app](https://ecofusion.vercel.app)
- **API Documentation**: [https://ecofusion-api.herokuapp.com/docs](https://ecofusion-api.herokuapp.com/docs)

## 🎯 Core Services

### 🤖 **AI & Automation**
- **AI Agents & Chatbots**: Intelligent conversational interfaces with Rasa integration
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
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Accessible, customizable component library
- **React Router v6** - Client-side routing with data loading
- **React Query** - Server state management and caching
- **Framer Motion** - Smooth animations and transitions

### **Backend & AI**
- **Node.js + Express** - RESTful API server
- **Rasa** - Conversational AI framework with custom actions
- **Python 3.8+** - AI/ML and backend development
- **Hugging Face** - Advanced language models integration
- **Mailjet** - Email service integration

### **DevOps & Tools**
- **Docker** - Containerization for consistent deployments
- **GitHub Actions** - CI/CD pipeline with automated testing
- **Vercel** - Frontend deployment platform
- **Heroku** - Backend deployment platform
- **ESLint + Prettier** - Code quality and formatting

## 📁 Project Structure

```
Eco-Fusion/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── logo.png
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui base components
│   │   ├── Hero.tsx       # Landing page hero section
│   │   ├── Services.tsx   # Core services showcase
│   │   ├── About.tsx      # Company information
│   │   ├── TechStack.tsx  # Technology capabilities
│   │   ├── Contact.tsx    # Contact form and info
│   │   ├── Footer.tsx     # Site footer
│   │   ├── ChatbotWidget.tsx # AI chatbot interface
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── contexts/          # React contexts
│   │   └── ChatbotContext.tsx # Chatbot state management
│   ├── hooks/             # Custom React hooks
│   │   ├── useChatbot.ts  # Chatbot API integration
│   │   ├── useApi.ts      # Generic API hook
│   │   └── useLocalStorage.ts # Local storage hook
│   ├── services/          # External service integrations
│   │   └── logger.ts      # Centralized logging
│   ├── utils/             # Utility functions
│   │   └── sanitize.ts    # XSS protection
│   ├── config/            # Configuration files
│   │   ├── environment.ts # Environment configuration
│   │   └── chatbot.ts     # Chatbot configuration
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   └── NotFound.tsx   # 404 page
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── server/                # Backend API server
│   ├── index.ts          # Express server
│   └── validation.ts     # Input validation
├── scripts/              # Build and setup scripts
│   └── setup-chatbot.js  # Chatbot configuration
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/eco-fusion-frontend.git
cd eco-fusion-frontend
```

2. **Install dependencies**:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

3. **Set up environment variables**:
```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your configuration
VITE_RASA_SERVER_URL=http://localhost:5005
VITE_CHATBOT_AUTO_OPEN=false
VITE_CHATBOT_SHOW_WELCOME=true
VITE_API_BASE_URL=http://localhost:8787
```

4. **Start the development server**:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

5. **Open your browser**:
Navigate to `http://localhost:8080` to see the application.

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development environment |
| `npm run build:preview` | Build for preview environment |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run server:dev` | Start backend server in development |
| `npm run setup-chatbot` | Setup chatbot configuration |

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend Configuration
VITE_RASA_SERVER_URL=http://localhost:5005
VITE_CHATBOT_AUTO_OPEN=false
VITE_CHATBOT_SHOW_WELCOME=true
VITE_DEBUG_CHATBOT=false

# API Configuration
VITE_API_BASE_URL=http://localhost:8787
VITE_APP_VERSION=1.0.0

# Server Configuration (for Eco-Fusion/server/index.ts)
PORT=8787
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
MJ_API_KEY=your_mailjet_api_key
MJ_API_SECRET=your_mailjet_api_secret
MJ_SENDER=your_sender_email@example.com
CONTACT_TO_EMAIL=your_recipient_email@example.com
MJ_LIST_ID=your_mailjet_list_id
RATE_LIMIT_NEWSLETTER=10
RATE_LIMIT_CONTACT=3
NODE_ENV=development
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Electric Blue (#4F9DFF) - Brand color for CTAs and highlights
- **Secondary**: Neon Purple (#A16BFF) - Accent color for gradients
- **Accent**: Cyber Lime (#C6FF00) - Success states and highlights
- **Background**: Dark (#0E0E10) - Primary background
- **Card**: Dark Gray (#1A1B1E) - Secondary background for cards

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Headings**: Bold, modern typography
- **Body**: Clean, readable text

### **Components**
- **shadcn/ui** base components
- **Custom design system** built on Tailwind CSS
- **Responsive design** for all screen sizes
- **Dark theme** optimized for tech industry

## 🤖 Chatbot Integration

The application includes a fully integrated AI chatbot powered by Rasa:

### **Features**
- **Real-time messaging** with typing indicators
- **Context-aware responses** with conversation memory
- **Project requirements collection** with intelligent form filling
- **Instant quote generation** based on project specifications
- **Multi-language support** with fallback to Hugging Face models
- **Error handling** with graceful degradation

### **Setup**
1. **Start the Rasa server** (see chatbot repository)
2. **Configure environment variables** in `.env`
3. **Test the integration** by opening the chatbot widget

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### **Breakpoints**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Deployment

### **Frontend Deployment (Vercel)**

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

```bash
# Manual deployment
vercel --prod
```

### **Backend Deployment (Heroku)**

1. **Create a Heroku app**:
```bash
heroku create eco-fusion-api
```

2. **Set environment variables**:
```bash
heroku config:set NODE_ENV=production
heroku config:set MJ_API_KEY=your_key
# ... other variables
```

3. **Deploy**:
```bash
git push heroku main
```

### **Docker Deployment**

```bash
# Build the image
docker build -t eco-fusion-frontend .

# Run the container
docker run -p 3000:3000 eco-fusion-frontend
```

## 🧪 Testing

### **Unit Tests**
```bash
npm run test
```

### **E2E Tests**
```bash
npm run test:e2e
```

### **Linting**
```bash
npm run lint
```

### **Type Checking**
```bash
npm run type-check
```

## 📊 Performance

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **Optimizations**
- **Code splitting** with React.lazy()
- **Image optimization** with WebP format
- **Bundle analysis** with Vite bundle analyzer
- **Tree shaking** for smaller bundle sizes
- **Service worker** for offline functionality

## 🔒 Security

### **Implemented Security Measures**
- **XSS Protection** with input sanitization
- **CSRF Protection** with token validation
- **Content Security Policy** (CSP) headers
- **Input validation** with Zod schemas
- **Rate limiting** on API endpoints
- **Environment variable** protection

### **Security Headers**
```typescript
// Security headers in server configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run the test suite**: `npm run test`
5. **Run linting**: `npm run lint`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Submit a pull request**

### **Code Style**
- **ESLint** configuration for code quality
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional commits** for commit messages

## 📞 Support & Contact

- **Email**: ecofusion.net@gmail.com
- **Phone**: +92 (370) 429-0725
- **Address**: Block C 1 Phase 1 Johar Town, Lahore
- **Working Hours**: Monday - Friday, 9:00 AM - 6:00 PM PST
- **GitHub Issues**: [Create an issue](https://github.com/your-username/eco-fusion-frontend/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Rasa** for the conversational AI framework
- **Hugging Face** for advanced language models
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool
- **React** team for the amazing framework

---

**Eco Fusion** - Transforming ideas into intelligent digital solutions since 2021.

*Built with ❤️ by the Eco Fusion team*