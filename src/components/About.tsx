import { Users, Award, Target, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import hammadImage from '@/assets/hammad.jpeg';
import abdullahImage from '@/assets/abdullah.jpeg';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, ensuring transparent communication throughout the development process.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering high-quality software that exceeds expectations and drives business growth.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every line of code we write and every solution we deliver.'
    }
  ];

  const team = [
    {
      name: 'Hammad Ali',
      role: 'CEO & UI/UX Designer',
      image: hammadImage,
      experience: '3+ years'
    },
    {
      name: 'Abdullah',
      role: 'CTO & Lead Developer',
      image: abdullahImage,
      experience: '3+ years'
    },
  ];

  return (
    <section id="about" className="section-padding section--alternate-2">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building the <span className="gradient-text">Future</span> Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded in 2021, Eco Fusion has grown from a small startup to a trusted technology partner 
            for businesses worldwide. We specialize in AI & Automation, IoT Solutions, and Full-Stack Development, 
            delivering innovative solutions that drive business growth and digital transformation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Story</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              What started as a passion project between university friends has evolved into a full-service 
              technology development company. We've helped over 5 companies transform their ideas into 
              successful digital products, specializing in AI & Automation, IoT Solutions, and Full-Stack Development.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our team combines deep technical knowledge with a genuine understanding of business needs, 
              ensuring that every solution we build drives real value for our clients through innovative technology.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">20+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">5</div>
                <div className="text-muted-foreground">Team Members</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-card rounded-3xl p-8 glow-on-hover">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gradient-primary rounded-2xl opacity-20" aria-hidden="true"></div>
                <div className="h-32 bg-secondary/20 rounded-2xl" aria-hidden="true"></div>
                <div className="h-32 bg-secondary/20 rounded-2xl" aria-hidden="true"></div>
                <div className="h-32 bg-gradient-primary rounded-2xl opacity-20" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elegant text-center group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Meet Our Team</h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {team.map((member, index) => (
                <Card key={index} className="card-elegant text-center group">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={`${member.name} - ${member.role}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;