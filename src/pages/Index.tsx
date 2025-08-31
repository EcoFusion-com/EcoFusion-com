import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { ChatbotWidget } from '@/components/ChatbotWidget';

// Lazy load components below the fold
const HowWeWork = lazy(() => import('@/components/HowWeWork'));
const Services = lazy(() => import('@/components/Services'));
const TechStack = lazy(() => import('@/components/TechStack'));
const Differentiators = lazy(() => import('@/components/Differentiators'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <HowWeWork />
          <Services />
          <TechStack />
          <Differentiators />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
        <Footer />
      </Suspense>
      
      {/* Chatbot Widget - Available on all pages */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
