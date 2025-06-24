import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsDisplay } from "@/components/ReviewsDisplay";

// Additional metadata for this page
export const metadata: Metadata = {
  alternates: {
    canonical: "https://riyadshauk.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-8">
            <h1 className="text-2xl font-bold">Riyad Shauk</h1>
            <p className="text-sm text-muted-foreground">Computer Science & Programming Tutor</p>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="#about" className="transition-colors hover:text-foreground/80">About</a>
              <a href="#services" className="transition-colors hover:text-foreground/80">Services</a>
              <a href="#testimonials" className="transition-colors hover:text-foreground/80">Testimonials</a>
              <a href="#reviews" className="transition-colors hover:text-foreground/80">Reviews</a>
              <Button asChild>
                <a href="#contact">Contact</a>
              </Button>
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <img
            src="/profile-placeholder.png"
            alt="Riyad Shauk profile photo"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow mb-6"
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Computer Science &
            <span className="text-primary block">Programming Tutor</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Expert tutoring in computer science, programming, LeetCode problems, and SWE interview preparation. 
            Available in Los Angeles (from Santa Monica to Pasadena) and remotely. Master algorithms, data structures, and coding fundamentals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#contact">Book Your Session</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#services">View Services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container px-4 py-24 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experienced software engineer and educator helping students master computer science and programming
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src="/profile-placeholder.png"
              alt="Riyad Shauk profile photo"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow mb-6"
            />
            <h3 className="text-2xl font-semibold mb-4">My Approach</h3>
            <p className="text-muted-foreground mb-6">
              I combine industry experience with proven teaching methods to help students excel in computer science. My approach focuses on:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Hands-on coding practice with real-world problems and LeetCode challenges</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Building strong algorithmic thinking and problem-solving skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>SWE interview preparation with mock interviews and technical questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Personalized learning paths based on your current skill level and goals</span>
              </li>
            </ul>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Programming</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Python, JavaScript, Java, C++, Data Structures</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Algorithms</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">LeetCode Problems, Algorithm Design, Optimization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Interview Prep</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">SWE Interviews, Technical Questions, System Design</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Computer Science</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">CS Fundamentals, Theory, Best Practices</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container px-4 py-24 mx-auto bg-muted/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Tutoring Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive computer science and programming tutoring designed to accelerate your learning
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <CardTitle>LeetCode & Algorithm Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
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
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle>SWE Interview Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive preparation for software engineering interviews. 
                Practice technical questions, system design, and behavioral interviews.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Mock technical interviews</li>
                <li>• Resume & portfolio review</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <CardTitle>Programming Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Build strong programming foundations with personalized instruction. 
                Master data structures, programming languages, and software development concepts.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Data structures & algorithms</li>
                <li>• Programming language mastery</li>
                <li>• Software development principles</li>
                <li>• Code review & best practices</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container px-4 py-24 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Student Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from students who have achieved their academic goals through our tutoring sessions
          </p>
        </div>
        
        <ReviewsDisplay />
      </section>

      {/* Review Submission Section */}
      <section id="reviews" className="container px-4 py-24 mx-auto bg-muted/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Share Your Experience</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Had a great experience with my tutoring? I&apos;d love to hear about it! Submit a review below.
          </p>
        </div>
        
        <ReviewForm />
      </section>

      {/* Contact Section */}
      <section id="contact" className="container px-4 py-24 mx-auto bg-primary text-primary-foreground">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Get Started Today</h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            Ready to improve your programming skills? Contact me to schedule your first session.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3">📧</span>
                <span>Email: riyad.shauk@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3">📱</span>
                <span>Phone: (310) 866-6284</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3">📍</span>
                <span>Location: Los Angeles & Remote Sessions</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-foreground/70 mr-3">⏰</span>
                <span>Hours: Flexible scheduling available</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Session Rates</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>• All Services: $150/hour (in person) or $100/hour (remote)</p>
                <p>• Package discounts available</p>
                <p>• Free 15-minute consultation</p>
              </div>
            </div>
          </div>
          
          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" name="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject of Interest</Label>
                  <Select name="subject">
                    <SelectTrigger>
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
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    placeholder="Tell me about your tutoring needs..."
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Riyad Shauk</h3>
              <p className="text-muted-foreground mb-4">
                Professional computer science and programming tutor dedicated to helping students achieve their career goals.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: riyad.shauk@gmail.com</p>
                <p>Phone: (310) 866-6284</p>
                <p>Los Angeles (90402 Santa Monica, 90042 Highland Park) & Remote Sessions</p>
                <p>Rate: $150/hour (in person) or $100/hour (remote)</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2025 Riyad Shauk. All rights reserved. | 
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Privacy Policy</a> | 
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
