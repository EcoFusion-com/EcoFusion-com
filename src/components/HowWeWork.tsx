import { Search, Palette, Code, Rocket, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const HowWeWork = () => {
  const steps = [
    { icon: Search, title: 'Discover', description: 'Quick audit + feasibility review', details: 'We start by understanding your vision, conducting a thorough analysis...' },
    { icon: Palette, title: 'Design', description: 'Scope, metrics, and delivery plan', details: 'We create detailed wireframes, establish clear success metrics...' },
    { icon: Code, title: 'Build', description: 'Sprint development with weekly demos', details: 'Using agile methodology, we build your solution in iterative sprints...' },
    { icon: Rocket, title: 'Ship', description: 'Deploy, monitor, and iterate', details: 'We deploy your solution with monitoring, provide ongoing support...' },
    { icon: Trophy, title: 'Success', description: 'Celebrate and scale', details: 'Your project goes live successfully — now we focus on scaling...' }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="how-we-work" className="section-padding section--alternate-2">
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
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="grid grid-cols-9 items-center">
                {/* Left side */}
                {index % 2 === 0 ? (
                  <>
                    <div className="col-span-4 flex justify-end">
                      <Card
                        className="max-w-md transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-xl">
                              <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{step.title}</h3>
                              <p className="text-primary font-medium">{step.description}</p>
                            </div>
                          </div>
                          <div
                            className={`mt-4 text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${
                              hoveredIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            {step.details}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {/* Dot */}
                    <div className="col-span-1 flex justify-center relative">
                      <div className="w-6 h-6 bg-primary rounded-full z-10" />
                    </div>
                    {/* Empty Right */}
                    <div className="col-span-4" />
                  </>
                ) : (
                  <>
                    <div className="col-span-4" />
                    {/* Dot */}
                    <div className="col-span-1 flex justify-center relative">
                      <div className="w-6 h-6 bg-primary rounded-full z-10" />
                    </div>
                    {/* Right side */}
                    <div className="col-span-4 flex justify-start">
                      <Card
                        className="max-w-md transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-xl">
                              <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{step.title}</h3>
                              <p className="text-primary font-medium">{step.description}</p>
                            </div>
                          </div>
                          <div
                            className={`mt-4 text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${
                              hoveredIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            {step.details}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your project? Let's begin with a discovery session.
          </p>
          <button className="btn-hero">Start Your Project</button>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
