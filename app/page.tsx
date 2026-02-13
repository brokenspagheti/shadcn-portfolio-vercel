"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, Linkedin, Code2, Palette, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [rickrollActive, setRickrollActive] = useState(false);
  const [astronautPos, setAstronautPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Set initial astronaut position
    setAstronautPos({
      x: window.innerWidth / 2 - 60,
      y: window.innerHeight / 2 - 60
    });

    // Whirlpool canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const whirlpools: any[] = [];
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown && !isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
          whirlpools.push({
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            maxRadius: 150,
            opacity: 1,
            rotation: 0,
            particles: Array.from({ length: 30 }, (_, i) => ({
              angle: (Math.PI * 2 / 30) * i,
              distance: 0,
              speed: Math.random() * 2 + 1
            }))
          });
          lastX = e.clientX;
          lastY = e.clientY;
        }
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = whirlpools.length - 1; i >= 0; i--) {
        const w = whirlpools[i];

        if (w.radius < w.maxRadius) {
          w.radius += 3;
        } else {
          w.opacity -= 0.02;
        }

        w.rotation += 0.1;

        w.particles.forEach((p: any) => {
          p.distance += p.speed;
          p.angle += 0.05;
        });

        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.rotate(w.rotation);

        ctx.beginPath();
        for (let j = 0; j < 360; j += 10) {
          const angle = (j * Math.PI) / 180;
          const radius = (w.radius / 360) * j;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(139, 92, 246, ${w.opacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        w.particles.forEach((p: any) => {
          const x = Math.cos(p.angle) * p.distance;
          const y = Math.sin(p.angle) * p.distance;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${w.opacity})`;
          ctx.fill();
        });

        ctx.restore();

        if (w.opacity <= 0) {
          whirlpools.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const handleAstronautClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      setRickrollActive(true);
      setClickCount(0);
    }

    setTimeout(() => {
      setClickCount(0);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Whirlpool Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* Rickroll Overlay */}
      {rickrollActive && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center flex-col">
          <h2 className="text-4xl font-bold text-primary mb-4 animate-pulse">
            🎵 Never Gonna Give You Up! 🎵
          </h2>
          <iframe
            className="w-[80%] max-w-[800px] aspect-video rounded-lg shadow-2xl"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button
            onClick={() => setRickrollActive(false)}
            className="mt-8"
            size="lg"
          >
            Close (You've Been Rick Rolled! 😄)
          </Button>
        </div>
      )}

      {/* Astronaut */}
      <div
        className="fixed z-[999] cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
        style={{
          left: `${astronautPos.x}px`,
          top: `${astronautPos.y}px`,
          width: '120px',
          height: '120px'
        }}
        onClick={handleAstronautClick}
      >
        <div className={`w-full h-full relative ${rickrollActive ? 'animate-bounce' : ''}`}>
          {/* Helmet */}
          <div className="absolute top-2 left-8 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full border-2 border-primary backdrop-blur-sm">
            <div className="absolute top-3 left-2 w-8 h-5 bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-80" />
          </div>
          {/* Body */}
          <div className="absolute top-8 left-7 w-14 h-20 bg-gradient-to-br from-slate-200 to-slate-400 rounded-2xl shadow-lg shadow-primary/50" />
          {/* Jetpack */}
          <div className="absolute top-10 left-9 w-10 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg -z-10">
            <div className="absolute bottom-[-15px] left-2 w-2 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full animate-pulse" />
            <div className="absolute bottom-[-15px] right-2 w-2 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-primary/20 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              nikhil<span className="text-primary">XD</span>
            </h1>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Hi, I'm <span className="text-primary">Nikhil</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Developer | Designer | Creator
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Building digital experiences that matter
            </p>
            <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button size="lg" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate developer with a love for creating beautiful and functional web experiences. 
                  With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design. 
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-lg border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <CardHeader>
                  <Code2 className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Frontend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Next.js'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-lg border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <CardHeader>
                  <Rocket className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Backend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'Express', 'MongoDB', 'MySQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-lg border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                <CardHeader>
                  <Palette className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Design & Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Adobe XD', 'Git', 'Docker', 'AWS'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'E-Commerce Platform',
                  description: 'A full-stack e-commerce solution with payment integration and admin dashboard',
                  tags: ['React', 'Node.js', 'MongoDB']
                },
                {
                  title: 'Task Management App',
                  description: 'Collaborative task management tool with real-time updates',
                  tags: ['Vue.js', 'Firebase', 'Tailwind']
                },
                {
                  title: 'Portfolio Website',
                  description: 'Modern portfolio template with smooth animations and responsive design',
                  tags: ['Next.js', 'Three.js', 'shadcn/ui']
                }
              ].map((project, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-lg border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/20">
              <CardContent className="p-8 space-y-6">
                <p className="text-lg text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <Separator />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" asChild>
                    <a href="mailto:nkndmob@gmail.com" className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Me
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#" className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground border-t border-primary/20">
          <p>&copy; 2024 nikhil XD. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}