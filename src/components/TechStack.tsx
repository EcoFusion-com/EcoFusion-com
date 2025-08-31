import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Globe, 
  Database, 
  Cloud, 
  Monitor, 
  Server, 
  Box, 
  GitBranch, 
  TestTube, 
  Settings,
  MessageSquare
} from 'lucide-react';
// Import Simple Icons for brand logos
import { 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiCplusplus, 
  SiDart,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiPostgresql,
  SiMongodb,
  SiNeo4J,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiAmazon,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiRender,
  SiTailwindcss,
  SiFramer,
  SiStorybook,
  SiVite,
  SiGraphql,
  SiSwagger,
  SiPostman,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiGitlab,
  SiJest,
  SiCypress,
  SiMqtt
} from 'react-icons/si';
// Import additional icons from other react-icons libraries
import { 
  FaJava,
  FaPlay,
  FaMicrosoft
} from 'react-icons/fa';
import { 
  TbWebhook,
  TbPalette
} from 'react-icons/tb';
import { useChatbotContext } from '@/contexts/ChatbotContext';

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const { openChat } = useChatbotContext();

  const categories = [
    {
      id: 'languages',
      name: 'Programming Languages',
      icon: Code,
      technologies: [
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'Python', icon: SiPython },
        { name: 'Java', icon: FaJava },
        { name: 'C++', icon: SiCplusplus },
        { name: 'Dart', icon: SiDart }
      ]
    },
    {
      id: 'frameworks',
      name: 'Frameworks',
      icon: Globe,
      technologies: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express', icon: SiExpress },
        { name: 'Django', icon: SiDjango },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'Flask', icon: SiFlask },
        { name: 'Flutter', icon: SiFlutter }
      ]
    },
    {
      id: 'databases',
      name: 'Database Management',
      icon: Database,
      technologies: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Neo4j', icon: SiNeo4J },
        { name: 'MySQL', icon: SiMysql },
        { name: 'Firebase', icon: SiFirebase },
        { name: 'Supabase', icon: SiSupabase }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Technologies',
      icon: Cloud,
      technologies: [
        { name: 'AWS', icon: SiAmazon },
        { name: 'Azure', icon: FaMicrosoft },
        { name: 'Google Cloud', icon: SiGooglecloud },
        { name: 'Vercel', icon: SiVercel },
        { name: 'Netlify', icon: SiNetlify },
        { name: 'Render', icon: SiRender }
      ]
    },
    {
      id: 'frontend',
      name: 'Front-end',
      icon: Monitor,
      technologies: [
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Material-UI', icon: TbPalette },
        { name: 'Framer Motion', icon: SiFramer },
        { name: 'Storybook', icon: SiStorybook },
        { name: 'Vite', icon: SiVite }
      ]
    },
    {
      id: 'backend',
      name: 'Back-end',
      icon: Server,
      technologies: [
        { name: 'GraphQL', icon: SiGraphql },
        { name: 'REST APIs', icon: MessageSquare },
        { name: 'WebSockets', icon: MessageSquare },
        { name: 'JWT', icon: Settings },
        { name: 'OAuth', icon: Settings }
      ]
    },
    {
      id: 'containerization',
      name: 'Containerization',
      icon: Box,
      technologies: [
        { name: 'Docker', icon: SiDocker },
        { name: 'Docker Compose', icon: SiDocker }
      ]
    },
    {
      id: 'cicd',
      name: 'CI/CD',
      icon: GitBranch,
      technologies: [
        { name: 'GitHub Actions', icon: SiGithubactions },
        { name: 'Jenkins', icon: SiJenkins },
        { name: 'GitLab CI', icon: SiGitlab }
      ]
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: TestTube,
      technologies: [
        { name: 'Jest', icon: SiJest },
        { name: 'Cypress', icon: SiCypress },
        { name: 'Playwright', icon: FaPlay }
      ]
    },
    {
      id: 'apis',
      name: 'APIs/REST',
      icon: MessageSquare,
      technologies: [
        { name: 'MQTT', icon: SiMqtt },
        { name: 'GraphQL', icon: SiGraphql },
        { name: 'Webhooks', icon: TbWebhook },
        { name: 'Swagger', icon: SiSwagger },
        { name: 'Postman', icon: SiPostman }
      ]
    }
  ];

  // Function to calculate circular positions
  const getCircularPosition = (index: number, total: number, radius: number = 200) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section id="tech-stack" className="section-padding section--alternate-1">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cutting-Edge <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage the latest technologies and tools to build scalable, 
            performant, and maintainable solutions for our clients.
          </p>
        </div>

        {/* Tech Stack Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-1 bg-card rounded-xl">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300"
                >
                  <category.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tech Cards - Circular Cluster Layout */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="flex justify-center items-center min-h-[600px] relative">
                <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                  {/* Center category indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-primary rounded-full p-6 shadow-lg">
                      <category.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Technology icons in circular pattern */}
                  {category.technologies.map((tech, index) => {
                    const IconComponent = tech.icon;
                    const position = getCircularPosition(index, category.technologies.length, 180);
                    
                    return (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{
                          left: `calc(50% + ${position.x}px)`,
                          top: `calc(50% + ${position.y}px)`,
                        }}
                      >
                        <div className="relative">
                          {/* Small round card */}
                          <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                            <IconComponent className="w-8 h-8 text-foreground group-hover:text-primary transition-colors duration-300" />
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-background border border-border rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                            {tech.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Need a specific technology not listed? We're always learning and adapting.
          </p>
          <button className="btn-hero" aria-label="Discuss your technology needs with our team" onClick={openChat}>
            Discuss Your Tech Needs
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
