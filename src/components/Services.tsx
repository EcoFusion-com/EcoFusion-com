import { Brain, Cpu, Layers, Code, Zap, Shield, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI & Automation',
      description:
        'Harness the power of Artificial Intelligence to streamline workflows, improve decision-making, and unlock new business opportunities.',
      features: [
        'AI Agents & Chatbots',
        'Predictive Analytics',
        'Robotic Process Automation (RPA)',
        'Generative AI Solutions',
      ],
    },
    {
      icon: Cpu,
      title: 'IoT Solutions',
      description:
        'End-to-end IoT systems for smart homes, industries, and energy optimization — connecting devices to drive intelligence and efficiency.',
      features: [
        'Smart Home Systems',
        'Industrial IoT',
        'Energy & Resource Monitoring',
        'IoT Data Dashboards',
      ],
    },
    {
      icon: Layers,
      title: 'Full-Stack Development',
      description:
        'Robust and scalable digital platforms tailored to your business needs — from startups to enterprise-grade applications.',
      features: [
        'SaaS Platforms',
        'Custom Enterprise Apps',
        'API Development & Integration',
        'Cloud-native Architectures',
      ],
    },
    {
      icon: Zap,
      title: 'Cloud Solutions',
      description:
        'Scalable, secure, and cost-efficient cloud infrastructure to power your digital transformation.',
      features: [
        'AWS, Azure & GCP',
        'DevOps & CI/CD',
        'Microservices Architecture',
        'Auto-scaling Deployments',
      ],
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description:
        'Advanced protection strategies to safeguard your systems, networks, and customer data from modern threats.',
      features: [
        'Penetration Testing',
        'Security Audits',
        'Data Privacy Compliance',
        '24/7 Monitoring',
      ],
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description:
        'Dedicated technical support to keep your business operations running smoothly with minimal downtime.',
      features: [
        '24/7 Support',
        'Proactive Monitoring',
        'System Updates & Patches',
        'Performance Optimization',
      ],
    },
  ];

  return (
    <section id="services" className="section-padding section--alternate-1">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Future-Ready <span className="gradient-text">Technology</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We specialize in building intelligent systems that combine AI, IoT, and full-stack solutions.
            From strategy to implementation, we empower businesses to innovate and scale faster.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elegant glow-on-hover group h-full">
              <CardContent className="p-6">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2" role="list">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full mr-3"
                        aria-hidden="true"
                      ></div>
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
            Ready to innovate with AI, IoT, and full-stack solutions? Let’s create something extraordinary together.
          </p>
          <button className="btn-hero" aria-label="Get free consultation for your project">
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
