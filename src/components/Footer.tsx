"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  variant?: 'main' | 'tutoring' | 'consulting' | 'messaging';
}

export default function Footer({ variant = 'main' }: FooterProps) {
  const getDescription = () => {
    switch (variant) {
      case 'tutoring':
        return "Patient, experienced programming tutor dedicated to helping students of all ages build confidence and succeed in computer science.";
      case 'consulting':
        return "Independent full-stack web developer and software consultant helping startups and small businesses bring their ideas to life with modern, scalable solutions.";
      case 'messaging':
        return "Experienced software engineer and patient educator helping students and businesses succeed with technology through tutoring and consulting services.";
      default:
        return "Experienced software engineer and patient educator helping students and businesses succeed with technology through tutoring and consulting services.";
    }
  };

  const getQuickLinks = () => {
    switch (variant) {
      case 'tutoring':
        return [
          { href: "/", label: "Home" },
          { href: "/#about", label: "About" },
          { href: "/#services", label: "Services" },
          { href: "/#testimonials", label: "Testimonials" },
          { href: "/#contact", label: "Contact" },
        ];
      case 'consulting':
        return [
          { href: "/", label: "Tutoring Services" },
          { href: "/#about", label: "About" },
          { href: "/#contact", label: "Contact" },
        ];
      case 'messaging':
        return [
          { href: "/", label: "Home" },
          { href: "/tutoring", label: "Tutoring" },
          { href: "/consulting", label: "Consulting" },
          { href: "/#contact", label: "Contact" },
        ];
      default:
        return [
          { href: "#about", label: "About" },
          { href: "#services", label: "Services" },
          { href: "#projects", label: "Projects" },
          { href: "#testimonials", label: "Testimonials" },
          { href: "#contact", label: "Contact" },
        ];
    }
  };

  const getContactInfo = () => {
    switch (variant) {
      case 'consulting':
        return [
          "Email: riyad.shauk@gmail.com",
          "Phone: (310) 866-6284",
          "Los Angeles & Remote",
          "Flexible project-based pricing",
        ];
      case 'tutoring':
        return [
          "Email: riyad.shauk@gmail.com",
          "Phone: (310) 866-6284",
          "Los Angeles (Beverly Hills 90210-12, Santa Monica 90401-05, Brentwood 90049, Pacific Palisades 90272, Bel Air 90077, Westwood 90024, West LA 90064, Culver City 90230-32, La Cañada 91011, San Marino 91108, South Pasadena 91030, Pasadena 91105-06) & Remote Sessions",
          "Rate: $150/hour (in person) or $100/hour (remote)",
        ];
      default:
        return [
          "Email: riyad.shauk@gmail.com",
          "Phone: (310) 866-6284",
          "Los Angeles (Beverly Hills 90210-12, Santa Monica 90401-05, Brentwood 90049, Pacific Palisades 90272, Bel Air 90077, Westwood 90024, West LA 90064, Culver City 90230-32, La Cañada 91011, San Marino 91108, South Pasadena 91030, Pasadena 91105-06) & Remote Sessions",
          "Consulting: Project-based pricing",
          "Tutoring: $150/hour (in person) or $100/hour (remote)",
        ];
    }
  };

  const getFooterLink = () => {
    switch (variant) {
      case 'consulting':
        return { href: "/", label: "Tutoring Services" };
      case 'tutoring':
      case 'messaging':
        return { href: "/consulting", label: "Software Consulting" };
      default:
        return { href: "/consulting", label: "Software Consulting" };
    }
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12 mx-auto mobile-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mobile-grid">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 mobile-heading">Riyad Shauk</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base mobile-text">
              {getDescription()}
            </p>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Quick Links</h4>
            <ul className="space-y-2">
              {getQuickLinks().map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href="https://github.com/riyadshauk/riyadshauk.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base mobile-text flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Source Code
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 mobile-heading">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground text-xs sm:text-sm mobile-text">
              {getContactInfo().map((info, index) => (
                <p key={index}>{info}</p>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center">
          <p className="text-muted-foreground text-xs sm:text-sm mobile-text">
            © 2025 Riyad Shauk. All rights reserved. | 
            <Link href={getFooterLink().href} className="text-muted-foreground hover:text-foreground transition-colors ml-2">
              {getFooterLink().label}
            </Link> | 
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Privacy Policy</a> | 
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}