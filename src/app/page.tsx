"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsDisplay } from "@/components/ReviewsDisplay";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Home() {
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
            Hi, I&apos;m Riyad
            <span className="text-primary block mt-2">I help people learn and build with technology</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mobile-text">
            From tutoring students to consulting on real-world software projects, I love solving problems. 
            Whether you&apos;re learning to code or building something amazing, I&apos;m here to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#services">Explore My Services</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#projects">View My Projects</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">How I Can Help You</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Choose the service that best fits your needs - from personalized tutoring to professional software development
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mobile-grid">
          {/* Consulting Card */}
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow group">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💼</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl mobile-heading">Consulting Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-base mobile-text">
                Software development and technical consulting for individuals and small teams. 
                From MVPs to production applications, I help bring your ideas to life.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">MVP Development</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">Full-Stack Web Applications</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">Technical Consulting</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">AI Integration & Automation</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mobile-text">
                <p><strong>Available:</strong> Los Angeles & Remote Worldwide</p>
                <p><strong>Pricing:</strong> Project-based with flexible terms</p>
              </div>
              <Button asChild className="w-full mt-6 mobile-button">
                <Link href="/consulting">Learn More About Consulting</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tutoring Card */}
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow group">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📚</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl mobile-heading">Tutoring Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-base mobile-text">
                1-on-1 programming and computer science tutoring for students of all ages. 
                Build confidence and real understanding through hands-on practice.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">LeetCode & Algorithm Practice</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">SWE Interview Preparation</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">Computer Science Fundamentals</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                  <span className="text-sm sm:text-base mobile-text">Personalized Learning Paths</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mobile-text">
                <p><strong>Available:</strong> Los Angeles (in-person) & Worldwide (remote)</p>
                <p><strong>Rate:</strong> $150/hour (in-person) or $100/hour (remote)</p>
              </div>
              <Button asChild className="w-full mt-6 mobile-button">
                <Link href="/tutoring">Learn More About Tutoring</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">About Me</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Experienced software engineer and patient educator helping students and businesses succeed with technology
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src="/profile-placeholder.png"
              alt="Riyad Shauk profile photo"
              width={128}
              height={128}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary shadow-lg mb-6 mobile-image"
            />
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center lg:text-left mobile-heading">My Approach</h3>
            <p className="text-muted-foreground mb-6 text-center lg:text-left mobile-text">
              I combine industry experience with proven teaching methods to help both students and businesses excel. My approach focuses on:
            </p>
            <ul className="space-y-4 w-full">
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Hands-on practice with real-world problems and projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Building strong foundational knowledge and problem-solving skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Modern, scalable solutions using proven technologies</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Personalized guidance based on your specific goals and needs</span>
              </li>
            </ul>
          </div>
          
          <Card className="w-full mobile-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-grid">
                <Card className="hover:shadow-lg transition-shadow card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base mobile-heading">Programming</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">Python, JavaScript, TypeScript, React, Next.js, Go</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base mobile-heading">Algorithms</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">LeetCode Problems, Algorithm Design, Optimization</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base mobile-heading">Web Development</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">Full-Stack Applications, APIs, Database Design</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base mobile-heading">AI & Automation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">OpenAI Integration, Process Automation, ML</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Featured Projects</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            See examples of my work - from iOS apps to web applications and automation tools
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* iOS Resume App */}
            <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="text-lg sm:text-xl mobile-heading">iOS Resume Tailoring App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                  Tailors resume/cover letter from job descriptions, auto-generates PDF/DOCX files using AI.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-muted-foreground"><strong>Stack:</strong> Swift + CoreData + Go backend</p>
                  <p className="text-xs text-muted-foreground"><strong>Status:</strong> In development, submitting to App Store</p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">✅ Demo</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">🔗 GitHub</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" asChild className="mobile-button">
            <Link href="/consulting">View More Projects & Services</Link>
          </Button>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Get in Touch</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 mobile-text">
            Let&apos;s figure out how I can help. Just describe what you&apos;re working on — whether you need tutoring or tech guidance.
          </p>
          
          <Card className="mobile-shadow">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base mobile-text">Name</Label>
                    <Input id="name" name="name" required className="h-12 text-base mobile-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base mobile-text">Email</Label>
                    <Input type="email" id="email" name="email" required className="h-12 text-base mobile-input" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-type" className="text-sm sm:text-base mobile-text">I&apos;m interested in</Label>
                  <Select name="service-type">
                    <SelectTrigger className="h-12 text-base mobile-input">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting">💼 Consulting Services</SelectItem>
                      <SelectItem value="tutoring">📚 Tutoring Services</SelectItem>
                      <SelectItem value="both">Both - Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base mobile-text">Tell me about your needs</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    placeholder="Describe what you're working on or what you need help with..."
                    required 
                    className="text-base resize-none mobile-textarea"
                  />
                </div>
                
                <Button type="submit" className="w-full h-12 text-base mobile-button touch-target">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Success Stories</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Hear from students and clients who have achieved their goals through our work together
          </p>
        </div>
        
        <ReviewsDisplay />
      </section>

      {/* Review Submission Section */}
      <section id="reviews" className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Share Your Experience</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Had a great experience with my tutoring or consulting? I&apos;d love to hear about it! Submit a review below.
          </p>
        </div>
        
        <ReviewForm />
      </section>

      {/* Contact Section */}
      <section id="contact" className="container px-4 py-16 sm:py-24 mx-auto bg-primary text-primary-foreground mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto mobile-text">
            Whether you need tutoring to build your programming skills or consulting to bring your software project to life, let&apos;s discuss how I can help.
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
                <span className="text-sm sm:text-base mobile-text">Location: Los Angeles & Remote Sessions</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3 text-lg">⏰</span>
                <span className="text-sm sm:text-base mobile-text">Hours: Flexible scheduling available</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 mobile-heading">Service Rates</h4>
              <div className="space-y-2 text-primary-foreground/80 text-sm sm:text-base mobile-text">
                <p>• Consulting: Project-based with flexible terms</p>
                <p>• Tutoring: $150/hour (in person) or $100/hour (remote)</p>
                <p>• Free 15-minute consultation for both services</p>
              </div>
            </div>
          </div>
          
          <Card className="bg-background text-foreground mobile-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm sm:text-base mobile-text">Name</Label>
                  <Input id="contact-name" name="contact-name" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm sm:text-base mobile-text">Email</Label>
                  <Input type="email" id="contact-email" name="contact-email" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-sm sm:text-base mobile-text">Service of Interest</Label>
                  <Select name="contact-subject">
                    <SelectTrigger className="h-12 text-base mobile-input">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting-mvp">Consulting - MVP Development</SelectItem>
                      <SelectItem value="consulting-webapp">Consulting - Web Application</SelectItem>
                      <SelectItem value="consulting-consulting">Consulting - Technical Consulting</SelectItem>
                      <SelectItem value="tutoring-fundamentals">Tutoring - Computer Science & Programming</SelectItem>
                      <SelectItem value="tutoring-algorithms">Tutoring - Data Structures & Algorithms</SelectItem>
                      <SelectItem value="tutoring-interview">Tutoring - SWE Interview Prep</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-sm sm:text-base mobile-text">Message</Label>
                  <Textarea 
                    id="contact-message" 
                    name="contact-message" 
                    rows={4}
                    placeholder="Tell me about your needs..."
                    required 
                    className="text-base resize-none mobile-textarea"
                  />
                </div>
                
                <Button type="submit" className="w-full h-12 text-base mobile-button touch-target">
                  Send Message
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
                Experienced software engineer and patient educator helping students and businesses succeed with technology through tutoring and consulting services.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">About</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Services</a></li>
                <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Projects</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Testimonials</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Contact</a></li>
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
                <p>Los Angeles (Beverly Hills 90210-12, Santa Monica 90401-05, Brentwood 90049, Pacific Palisades 90272, Bel Air 90077, Westwood 90024, West LA 90064, Culver City 90230-32, La Cañada 91011, San Marino 91108, South Pasadena 91030, Pasadena 91105-06) & Remote Sessions</p>
                <p>Consulting: Project-based pricing</p>
                <p>Tutoring: $150/hour (in person) or $100/hour (remote)</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center">
            <p className="text-muted-foreground text-xs sm:text-sm mobile-text">
              © 2025 Riyad Shauk. All rights reserved. | 
              <Link href="/consulting" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Software Consulting</Link> | 
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Privacy Policy</a> | 
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
