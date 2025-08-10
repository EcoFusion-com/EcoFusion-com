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

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('languages');

  const categories = [
    {
      id: 'languages',
      name: 'Programming Languages',
      icon: Code,
      technologies: [
        { name: 'TypeScript', icon: '⚡' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'Python', icon: '🐍' },
        { name: 'Java', icon: '☕' },
        { name: 'C#', icon: '💎' },
        { name: 'Go', icon: '🔵' }
      ]
    },
    {
      id: 'frameworks',
      name: 'Frameworks',
      icon: Globe,
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express', icon: '🚂' },
        { name: 'Django', icon: '🎸' },
        { name: 'FastAPI', icon: '⚡' }
      ]
    },
    {
      id: 'databases',
      name: 'Database Management',
      icon: Database,
      technologies: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Redis', icon: '🔴' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'Supabase', icon: '⚡' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Technologies',
      icon: Cloud,
      technologies: [
        { name: 'AWS', icon: '☁️' },
        { name: 'Azure', icon: '🔷' },
        { name: 'Google Cloud', icon: '🌐' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Netlify', icon: '🟢' },
        { name: 'Heroku', icon: '💜' }
      ]
    },
    {
      id: 'frontend',
      name: 'Front-end',
      icon: Monitor,
      technologies: [
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'Material-UI', icon: '📱' },
        { name: 'Chakra UI', icon: '⚡' },
        { name: 'Framer Motion', icon: '🎬' },
        { name: 'Storybook', icon: '📚' },
        { name: 'Vite', icon: '⚡' }
      ]
    },
    {
      id: 'backend',
      name: 'Back-end',
      icon: Server,
      technologies: [
        { name: 'GraphQL', icon: '🔷' },
        { name: 'REST APIs', icon: '🌐' },
        { name: 'WebSockets', icon: '🔌' },
        { name: 'JWT', icon: '🔐' },
        { name: 'OAuth', icon: '🔑' },
        { name: 'gRPC', icon: '📡' }
      ]
    },
    {
      id: 'containerization',
      name: 'Containerization',
      icon: Box,
      technologies: [
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '⚓' },
        { name: 'Docker Compose', icon: '📦' },
        { name: 'Helm', icon: '⛵' },
        { name: 'Podman', icon: '🟦' },
        { name: 'Rancher', icon: '🐄' }
      ]
    },
    {
      id: 'cicd',
      name: 'CI/CD',
      icon: GitBranch,
      technologies: [
        { name: 'GitHub Actions', icon: '🐙' },
        { name: 'Jenkins', icon: '🤖' },
        { name: 'GitLab CI', icon: '🦊' },
        { name: 'CircleCI', icon: '⭕' },
        { name: 'Travis CI', icon: '🦎' },
        { name: 'ArgoCD', icon: '🚢' }
      ]
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: TestTube,
      technologies: [
        { name: 'Jest', icon: '🃏' },
        { name: 'Cypress', icon: '🌲' },
        { name: 'Playwright', icon: '🎭' },
        { name: 'Vitest', icon: '⚡' },
        { name: 'Testing Library', icon: '📚' },
        { name: 'MSW', icon: '🦅' }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps Tools',
      icon: Settings,
      technologies: [
        { name: 'Terraform', icon: '🏗️' },
        { name: 'Ansible', icon: '🤖' },
        { name: 'Prometheus', icon: '📊' },
        { name: 'Grafana', icon: '📈' },
        { name: 'ELK Stack', icon: '🦌' },
        { name: 'Istio', icon: '🛡️' }
      ]
    },
    {
      id: 'apis',
      name: 'APIs/REST',
      icon: MessageSquare,
      technologies: [
        { name: 'MQTT', icon: '📡' },
        { name: 'GraphQL', icon: '🔷' },
        { name: 'Webhooks', icon: '🎣' },
        { name: 'gRPC', icon: '📡' },
        { name: 'Swagger', icon: '📋' },
        { name: 'Postman', icon: '📮' }
      ]
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
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
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-1 bg-muted/50 rounded-xl">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tech Cards */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.technologies.map((tech, index) => (
                  <Card key={index} className="card-elegant text-center group hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                        {tech.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Need a specific technology not listed? We're always learning and adapting.
          </p>
          <button className="btn-hero">
            Discuss Your Tech Needs
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
