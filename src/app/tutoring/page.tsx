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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function TutoringPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            Learn to Code with a
            <span className="text-primary block mt-2">Patient, Real-World Tutor</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mobile-text">
            I offer 1-on-1 tutoring in programming and computer science for kids, teens, college students, and adult learners. 
            Whether you&apos;re just getting started or need help with university-level coursework, I&apos;ll help you build confidence and real understanding. 
            Available in Los Angeles (Beverly Hills, Santa Monica, Brentwood, Pacific Palisades, Bel Air, Westwood, West LA, Culver City, La Cañada, San Marino, South Pasadena, Pasadena) and online.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#contact">Book Your Session</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base py-6 px-8 mobile-button touch-target">
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">About Me</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Experienced software engineer and patient educator helping students of all ages master programming and computer science. 
            Beyond tutoring, I also build full-stack web applications — feel free to learn more on my <Link href="/consulting" className="text-primary hover:underline">consulting page</Link>.
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
              I combine industry experience with proven teaching methods to help students of all ages excel in programming. My approach focuses on:
            </p>
            <ul className="space-y-4 w-full">
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Hands-on coding practice with real-world problems and LeetCode challenges</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Building strong algorithmic thinking and problem-solving skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">SWE interview preparation with mock interviews and technical questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1 text-lg">✓</span>
                <span className="text-sm sm:text-base mobile-text">Personalized learning paths based on your current skill level and goals</span>
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
                    <p className="text-sm text-muted-foreground mobile-text">Python, JavaScript, Java, C++, Data Structures</p>
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
                    <CardTitle className="text-base mobile-heading">Interview Prep</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">SWE Interviews, Technical Questions, System Design</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base mobile-heading">Computer Science</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mobile-text">CS Fundamentals, Theory, Best Practices</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Tutoring Services</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Comprehensive programming and computer science tutoring designed to meet you where you are and help you succeed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mobile-grid">
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">LeetCode & Algorithm Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Master algorithmic problem-solving with hands-on LeetCode practice. 
                Learn efficient solutions, time complexity analysis, and coding best practices.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• LeetCode problem walkthroughs</li>
                <li>• Algorithm optimization techniques</li>
                <li>• Time & space complexity analysis</li>
                <li>• Multiple solution approaches</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow h-full card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">SWE Interview Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Comprehensive preparation for software engineering interviews. 
                Practice technical questions, system design, and behavioral interviews.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Mock technical interviews</li>
                <li>• Resume & portfolio review</li>
                <li>• System design practice</li>
                <li>• Behavioral interview coaching</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow h-full md:col-span-2 lg:col-span-1 card-hover mobile-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <CardTitle className="text-lg sm:text-xl mobile-heading">Computer Science Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
                Build a strong foundation in computer science concepts, 
                data structures, and programming principles.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Data structures & algorithms</li>
                <li>• Programming languages</li>
                <li>• Software engineering principles</li>
                <li>• Best practices & design patterns</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Areas Served Section */}
      <section id="areas" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Areas Served</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            In-person tutoring available in Los Angeles&apos; most prestigious neighborhoods
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mobile-grid">
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Beverly Hills</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90210, 90211, 90212</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Santa Monica</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90402, 90401, 90403, 90405</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Brentwood</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90049</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Pacific Palisades</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90272</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Bel Air</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90077</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Westwood</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90024</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">West Los Angeles</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90064</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Culver City</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">90232, 90230</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">La Cañada Flintridge</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">91011</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">San Marino</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">91108</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">South Pasadena</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">91030</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow card-hover mobile-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg mobile-heading">Pasadena</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">91105, 91106</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mobile-text">
                In-person tutoring available
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mobile-text">
            <strong>Remote tutoring available worldwide</strong> - Same premium quality, flexible scheduling
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container px-4 py-16 sm:py-24 mx-auto mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Student Success Stories</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Hear from students who have achieved their academic goals through our tutoring sessions
          </p>
        </div>
        
        <ReviewsDisplay />
      </section>

      {/* Review Submission Section */}
      <section id="reviews" className="container px-4 py-16 sm:py-24 mx-auto bg-muted/50 mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Share Your Experience</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mobile-text">
            Had a great experience with my tutoring? I&apos;d love to hear about it! Submit a review below.
          </p>
        </div>
        
        <ReviewForm />
      </section>

      {/* Contact Section */}
      <section id="contact" className="container px-4 py-16 sm:py-24 mx-auto bg-primary text-primary-foreground mobile-section">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 mobile-heading">Get Started Today</h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-3xl mx-auto mobile-text">
            Ready to build your programming skills? Contact me to schedule your first session.
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
              <h4 className="text-lg font-semibold mb-4 mobile-heading">Session Rates</h4>
              <div className="space-y-2 text-primary-foreground/80 text-sm sm:text-base mobile-text">
                <p>• All Services: $150/hour (in person) or $100/hour (remote)</p>
                <p>• Package discounts available</p>
                <p>• Free 15-minute consultation</p>
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
                  <Label htmlFor="name" className="text-sm sm:text-base mobile-text">Name</Label>
                  <Input id="name" name="name" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base mobile-text">Email</Label>
                  <Input type="email" id="email" name="email" required className="h-12 text-base mobile-input" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm sm:text-base mobile-text">Subject of Interest</Label>
                  <Select name="subject">
                    <SelectTrigger className="h-12 text-base mobile-input">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fundamentals">Computer Science & Programming Fundamentals</SelectItem>
                      <SelectItem value="ds-algo">Data Structures & Algorithms</SelectItem>
                      <SelectItem value="leetcode">LeetCode / HackerRank / CodeSignal</SelectItem>
                      <SelectItem value="interview-prep">SWE Interview Prep</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript / Node.js / TypeScript</SelectItem>
                      <SelectItem value="golang">Golang</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base mobile-text">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    placeholder="Tell me about your tutoring needs..."
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
                Patient, experienced programming tutor dedicated to helping students of all ages build confidence and succeed in computer science.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Home</Link></li>
                <li><Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">About</Link></li>
                <li><Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Services</Link></li>
                <li><Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text">Testimonials</Link></li>
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
                <p>Los Angeles (Beverly Hills 90210-12, Santa Monica 90401-05, Brentwood 90049, Pacific Palisades 90272, Bel Air 90077, Westwood 90024, West LA 90064, Culver City 90230-32, La Cañada 91011, San Marino 91108, South Pasadena 91030, Pasadena 91105-06) & Remote Sessions</p>
                <p>Rate: $150/hour (in person) or $100/hour (remote)</p>
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