import { Search, Palette, Code, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowWeWork = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Quick audit + feasibility review',
      details: 'We start by understanding your vision, conducting a thorough analysis of requirements, and assessing technical feasibility to ensure your project is set up for success.'
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Scope, metrics, and delivery plan',
      details: 'We create detailed wireframes, establish clear success metrics, and develop a comprehensive project roadmap with realistic timelines and milestones.'
    },
    {
      icon: Code,
      title: 'Build',
      description: 'Sprint development with weekly demos',
      details: 'Using agile methodology, we build your solution in iterative sprints with regular demos and feedback sessions to ensure we\'re always aligned with your vision.'
    },
    {
      icon: Rocket,
      title: 'Ship',
      description: 'Deploy, monitor, and iterate',
      details: 'We deploy your solution with comprehensive monitoring, provide ongoing support, and continuously iterate based on user feedback and performance metrics.'
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven development process ensures transparency, quality, and timely delivery. 
            We work closely with you at every step to bring your vision to life.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="card-elegant text-center group relative overflow-hidden">
              {/* Step Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {index + 1}
              </div>
              
              <CardContent className="p-6">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {step.description}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Indicator */}
        <div className="hidden lg:flex items-center justify-center mt-12">
          <div className="flex items-center space-x-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-primary/30 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your project? Let's begin with a discovery session.
          </p>
          <button className="btn-hero">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
