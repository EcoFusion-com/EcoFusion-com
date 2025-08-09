import { Code, Smartphone, Globe, Zap, Shield, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built from scratch to meet your specific business requirements and goals.',
      features: ['Full-stack Development', 'API Integration', 'Database Design', 'Testing & QA']
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications that deliver exceptional performance and user engagement.',
      features: ['Responsive Design', 'E-commerce', 'CMS Integration', 'SEO Optimization']
    },
    {
      icon: Zap,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize your business operations and reduce costs.',
      features: ['AWS & Azure', 'DevOps', 'Microservices', 'Auto-scaling']
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure data privacy compliance.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Monitoring']
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: '24/7 technical support and maintenance services to keep your systems running smoothly and efficiently.',
      features: ['24/7 Support', 'System Monitoring', 'Updates & Patches', 'Performance Optimization']
    }
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive <span className="gradient-text">Technology</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer end-to-end technology solutions to help your business thrive in the digital age. 
            From strategy to implementation and beyond.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elegant glow-on-hover group h-full">
              <CardContent className="p-0">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to discuss your project? Let's build something amazing together.
          </p>
          <button className="btn-hero">
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;