import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useChatbotContext } from '@/contexts/ChatbotContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { openChat } = useChatbotContext();

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Implement newsletter subscription
      console.log('Newsletter subscription for:', email);
      setEmail('');
      // Open chat to confirm subscription
      openChat();
    }
  };
     const services = [
     'AI & Automation',
     'IoT Solutions',
     'Full-Stack Development',
     'Cloud Solutions',
     'Cybersecurity',
     'Technical Support'
   ];

  const company = [
    'About Us',
    'Our Team',
    'Careers',
    'Portfolio',
    'Blog',
    'Contact'
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/EcoFusion-com', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/ecofusion-com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
                         <div className="space-y-6">
               <div className="flex items-center space-x-2">
                 <img 
                   src="/Black and Grey Clean Modern Minimalist Creative Technology Logo (2).png" 
                   alt="Eco Fusion Logo" 
                   className="w-8 h-8 object-contain rounded-lg"
                   aria-label="Eco Fusion Logo"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                   }}
                 />
                 <span className="text-xl font-bold gradient-text">Eco Fusion</span>
               </div>
              <p className="text-muted-foreground">
                Transforming ideas into sustainable digital solutions. 
                Your trusted technology partner for eco-conscious innovation and growth.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>ecofusion.net@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>+92 (370) 429-0725</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Block C 1 Phase 1 Johar Town, Lahore,</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3" role="list">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 focus-ring rounded-md px-1 py-1"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3" role="list">
                {company.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 focus-ring rounded-md px-1 py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest tech insights and company updates.
              </p>
              <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus-ring transition-colors duration-200"
                  aria-label="Email address for newsletter subscription"
                  required
                />
                <button 
                  type="submit"
                  className="btn-hero w-full" 
                  aria-label="Subscribe to newsletter"
                  disabled={!email.trim()}
                >
                  Subscribe
                </button>
              </form>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group focus-ring"
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2021 Eco Fusion. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;