"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Consulting() {
  // Removed: const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="container px-4 py-16 sm:py-24 mx-auto text-center mobile-section">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <Image
            src="/profile-placeholder.png"
            alt="Riyad Shauk profile photo"
            width={112}
            height={112}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary shadow-lg mb-6 mobile-image"
          />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl xl:text-7xl leading-tight mobile-heading">
            Software Consulting
            <span className="text-primary block mt-2">Let&apos;s build something amazing together</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mobile-text">
            From MVPs to production applications, I help individuals and small teams bring their software ideas to life. 
            Whether you&apos;re building a web app, mobile app, or automation tool, I&apos;m here to guide you through the process.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#contact">Discuss Your Project</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Freelance Development Services</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Independent web development and consulting services for startups and small businesses. From MVPs to production applications, I help bring your ideas to life with clean, maintainable code.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mobile-grid">
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">MVP Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Get your idea to market quickly with a minimum viable product. 
                Focus on core features that deliver value to your users.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Rapid prototyping</li>
                <li>• Core feature development</li>
                <li>• User feedback integration</li>
                <li>• Scalable architecture</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Business Websites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Professional websites that convert visitors into customers. 
                Modern design, fast performance, and SEO optimization.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Custom design & branding</li>
                <li>• Mobile-first responsive</li>
                <li>• SEO optimization</li>
                <li>• Content management</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow h-full md:col-span-2 lg:col-span-1 card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Technical Consulting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Expert guidance on architecture, performance, and best practices. 
                Code reviews, optimization, and technical strategy.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Architecture reviews</li>
                <li>• Performance optimization</li>
                <li>• Code quality audits</li>
                <li>• Technical strategy</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Technology Stack</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Modern, proven technologies for building robust web applications & APIs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8 mobile-grid">
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚛️</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">React & Next.js</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Modern frontend framework with server-side rendering and static generation
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📘</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">TypeScript</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Type-safe JavaScript for better code quality and developer experience
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🐘</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">PostgreSQL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Robust, scalable database with advanced features and reliability
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Utility-first CSS framework for rapid, consistent UI development
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍓</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">Raspberry Pi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Cost-effective web hosting and deployment solutions for small projects
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">☁️</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">Cloud & Serverless</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                AWS (Lambda, SQS, DynamoDB, EC2, Route53) for scalable cloud-native solutions
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛠️</span>
              </div>
              <CardTitle className="text-base sm:text-lg mobile-heading">Also Comfortable With</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mobile-text">
                Python + Django, Golang, Docker, Nginx, Redis, Linux server administration
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container px-4 py-16 sm:py-24 mx-auto bg-primary text-primary-foreground mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto mobile-text">
            As an independent software engineer, I work directly with startups and small businesses to bring their web projects to life. Let&apos;s discuss your requirements and get started.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mobile-grid">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 mobile-heading">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3 text-lg">📧</span>
                <span className="text-sm sm:text-base mobile-text">Email: riyad.shauk@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3 text-lg">📱</span>
                <span className="text-sm sm:text-base mobile-text">Phone: (310) 866-6284</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3 text-lg">📍</span>
                <span className="text-sm sm:text-base mobile-text">Location: Los Angeles & Remote</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3 text-lg">⏰</span>
                <span className="text-sm sm:text-base mobile-text">Availability: Flexible scheduling</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 mobile-heading">Freelance Project Process</h4>
              <div className="space-y-2 text-primary-foreground/80 text-sm sm:text-base mobile-text">
                <p>• Free initial consultation & project assessment</p>
                <p>• Transparent project planning & timeline</p>
                <p>• Regular progress updates & communication</p>
                <p>• Flexible payment terms for small businesses</p>
                <p>• Post-launch support & maintenance options</p>
              </div>
            </div>
          </div>
          
          <Card className="bg-background text-foreground mobile-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Start Your Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base mobile-text">Name</Label>
                  <Input id="name" name="name" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base mobile-text">Email</Label>
                  <Input type="email" id="email" name="email" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-type" className="text-sm sm:text-base mobile-text">Project Type</Label>
                  <Select name="project-type">
                    <SelectTrigger className="h-12 text-base mobile-input">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mvp">MVP Development</SelectItem>
                      <SelectItem value="website">Business Website</SelectItem>
                      <SelectItem value="webapp">Web Application</SelectItem>
                      <SelectItem value="consulting">Technical Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base mobile-text">Project Details</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    placeholder="Tell me about your project requirements..."
                    required 
                    className="text-base resize-none mobile-textarea"
                  />
                </div>
                
                <Button type="submit" className="w-full h-12 text-base mobile-button touch-target">
                  Send Project Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container px-4 py-12 mx-auto mobile-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mobile-grid">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 mobile-heading">Riyad Shauk</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Independent full-stack web developer and software consultant helping startups and small businesses bring their ideas to life with modern, scalable solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Tutoring Services</Link></li>
                <li><Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">About</Link></li>
                <li><Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Contact</Link></li>
                <li><a href="https://github.com/riyadshauk/riyadshauk.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Source Code
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground text-xs sm:text-sm mobile-text">
                <p>Email: riyad.shauk@gmail.com</p>
                <p>Phone: (310) 866-6284</p>
                <p>Los Angeles & Remote</p>
                <p>Flexible project-based pricing</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center">
            <p className="text-muted-foreground text-xs sm:text-sm mobile-text">
              © 2025 Riyad Shauk. All rights reserved. | 
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Tutoring Services</Link> | 
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Privacy Policy</a> | 
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 