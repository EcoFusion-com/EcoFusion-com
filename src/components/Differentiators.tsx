import { Eye, Target, Zap, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useChatbotContext } from '@/contexts/ChatbotContext';

const Differentiators = () => {
  const differentiators = [
    {
      icon: Eye,
      title: 'Transparent Processes',
      description: 'Weekly demos, tight feedback loops',
      details: 'We believe in complete transparency. You\'ll see your project evolve in real-time with weekly demos and regular feedback sessions, ensuring you\'re always in the loop.'
    },
    {
      icon: Target,
      title: 'Measurable Results',
      description: 'Metric-driven outcomes',
      details: 'Every project starts with clear success metrics. We track performance, user engagement, and business impact to ensure your investment delivers measurable returns.'
    },
    {
      icon: Zap,
      title: 'Rapid Delivery',
      description: 'MVP-ready in weeks',
      details: 'We specialize in rapid prototyping and iterative development. Get your minimum viable product in weeks, not months, and start validating your ideas immediately.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Ongoing improvement',
      details: 'Our relationship doesn\'t end at launch. We provide ongoing support, maintenance, and continuous improvement to ensure your solution evolves with your business.'
    }
  ];

  const { openChat } = useChatbotContext();

  return (
    <section className="section-padding section--alternate-2">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Sets Us <span className="gradient-text">Apart</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just build software—we build partnerships. Our unique approach 
            combines technical excellence with business acumen and environmental consciousness.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <Card key={index} className="card-elegant group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-primary font-medium mb-4 text-lg">
                  {item.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {item.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">95%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">2-4</div>
            <div className="text-muted-foreground">Weeks to MVP</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">100%</div>
            <div className="text-muted-foreground">Code Transparency</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the difference? Let's discuss your project.
          </p>
          <button className="btn-hero" aria-label="Start your project with Eco Fusion" onClick={openChat}>
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
