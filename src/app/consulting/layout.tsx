import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance Full Stack Developer – Web Consulting in Los Angeles | Riyad Shauk | Next.js, PostgreSQL, Raspberry Pi Hosting | Beverly Hills, Santa Monica, Brentwood, Pacific Palisades, Bel Air, Westwood, West LA, Culver City, La Cañada, San Marino, South Pasadena, Pasadena & Remote",
  description: "Need a reliable freelance web developer in Los Angeles? I offer consulting services for startups and small businesses—Next.js, PostgreSQL, Raspberry Pi hosting, and more. Independent software engineer available in Beverly Hills (90210), Santa Monica (90402), Brentwood (90049), Pacific Palisades (90272), Bel Air (90077), Westwood (90024), West LA (90064), Culver City (90230-32), La Cañada (91011), San Marino (91108), South Pasadena (91030), Pasadena (91105-06) and remote worldwide.",
  keywords: [
    // Primary Focus Keywords (ChatGPT's suggestions)
    "freelance full stack developer los angeles",
    "hire web developer los angeles",
    "solo software consultant la",
    "freelance next.js developer",
    "freelance website developer for small business",
    "independent software engineer los angeles",
    "personalized software solutions santa monica",
    
    // Secondary/Supportive Keywords
    "custom web app development",
    "next.js and postgres consulting",
    "frontend/backend help for startups",
    "raspberry pi web hosting expert",
    "elixir or nodejs consulting",
    "devops help for small teams",
    "remote full stack development",
    "aws consulting los angeles",
    "serverless development consultant",
    "cloud migration help",
    "aws lambda developer",
    "aws ec2 deployment",
    "aws dynamodb consultant",
    "aws route53 setup",
    "cloud-native development",
    "serverless architecture consultant",
    "python developer los angeles",
    "django consultant",
    "golang developer",
    "docker consultant",
    "nginx configuration",
    "redis consultant",
    "linux server administration",
    "microservices development",
    "backend api development",
    
    // Additional Freelance/Independent Keywords
    "freelance web developer",
    "independent web developer",
    "solo developer los angeles",
    "freelance software consultant",
    "contract web developer",
    "freelance full stack developer",
    "hire freelance developer",
    "small business web developer",
    "startup web developer",
    "freelance react developer",
    "freelance typescript developer",
    "freelance postgresql developer",
    "raspberry pi hosting",
    "raspberry pi web server",
    "raspberry pi deployment",
    
    // Existing Keywords (keep these)
    "full-stack web developer",
    "software consultant",
    "web development Los Angeles",
    "React developer Los Angeles",
    "Next.js developer Los Angeles",
    "TypeScript developer Los Angeles",
    "PostgreSQL developer Los Angeles",
    "MVP development Los Angeles",
    "business website development Los Angeles",
    "technical consulting Los Angeles",
    "software development consultant",
    "web application development",
    "custom website development",
    "Beverly Hills web developer",
    "Santa Monica web developer",
    "Brentwood web developer",
    "Pacific Palisades web developer",
    "Bel Air web developer",
    "Westwood web developer",
    "West LA web developer",
    "Culver City web developer",
    "La Cañada web developer",
    "San Marino web developer",
    "South Pasadena web developer",
    "Pasadena web developer",
    "90210 web developer",
    "90402 web developer",
    "90049 web developer",
    "90272 web developer",
    "90077 web developer",
    "90024 web developer",
    "90064 web developer",
    "90230 web developer",
    "90232 web developer",
    "91011 web developer",
    "91108 web developer",
    "91030 web developer",
    "91105 web developer",
    "91106 web developer",
    "remote web developer",
    "remote software consultant",
    "remote React developer",
    "remote Next.js developer",
    "remote TypeScript developer",
    "remote PostgreSQL developer",
    "remote MVP development",
    "remote business website development",
    "remote technical consulting",
    "React.js development",
    "Next.js development",
    "TypeScript development",
    "PostgreSQL development",
    "full-stack development",
    "web application consultant",
    "software architecture consultant",
    "code review consultant",
    "performance optimization consultant",
    "technical strategy consultant",
    "Riyad Shauk",
    "web development consultant",
    "software development services",
    "custom web applications",
    "modern web development",
    "scalable web applications",
    "professional web development",
    "enterprise web development",
    "startup web development",
    "e-commerce development",
    "content management systems",
    "API development",
    "database design",
    "cloud deployment",
    "DevOps consulting",
    "agile development",
    "project management",
    "technical leadership",
    "code quality",
    "best practices",
    "modern frameworks",
    "responsive design",
    "mobile-first development",
    "progressive web apps",
    "single page applications",
    "server-side rendering",
    "static site generation",
    "JAMstack development",
    "headless CMS",
    "microservices architecture",
    "RESTful APIs",
    "GraphQL development",
    "database optimization",
    "performance tuning",
    "security consulting",
    "SEO optimization",
    "accessibility consulting",
    "testing strategies",
    "continuous integration",
    "continuous deployment"
  ],
  authors: [{ name: "Riyad Shauk" }],
  creator: "Riyad Shauk",
  publisher: "Riyad Shauk",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riyadshauk.com/consulting",
    title: "Freelance Full Stack Developer – Web Consulting in Los Angeles | Riyad Shauk",
    description: "Need a reliable freelance web developer in Los Angeles? I offer consulting services for startups and small businesses—Next.js, PostgreSQL, Raspberry Pi hosting, and more.",
    siteName: "Riyad Shauk Consulting",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riyad Shauk - Freelance Full Stack Developer in Los Angeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Full Stack Developer – Web Consulting in Los Angeles | Riyad Shauk",
    description: "Need a reliable freelance web developer in Los Angeles? I offer consulting services for startups and small businesses—Next.js, PostgreSQL, Raspberry Pi hosting, and more.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://riyadshauk.com/consulting",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function ConsultingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Full-Stack Web Development & Consulting",
            "description": "Expert full-stack web development and software consulting services specializing in React, Next.js, TypeScript, and PostgreSQL. Available in Los Angeles and remote worldwide.",
            "url": "https://riyadshauk.com/consulting",
            "telephone": "+1-310-866-6284",
            "email": "riyad.shauk@gmail.com",
            "priceRange": "Project-based pricing",
            "currenciesAccepted": "USD",
            "paymentAccepted": "Cash, Credit Card, PayPal, Bank Transfer",
            "areaServed": [
              {
                "@type": "Place",
                "name": "Beverly Hills",
                "postalCode": "90210"
              },
              {
                "@type": "Place",
                "name": "Beverly Hills",
                "postalCode": "90211"
              },
              {
                "@type": "Place",
                "name": "Beverly Hills",
                "postalCode": "90212"
              },
              {
                "@type": "Place",
                "name": "Santa Monica",
                "postalCode": "90402"
              },
              {
                "@type": "Place",
                "name": "Santa Monica",
                "postalCode": "90401"
              },
              {
                "@type": "Place",
                "name": "Santa Monica",
                "postalCode": "90403"
              },
              {
                "@type": "Place",
                "name": "Santa Monica",
                "postalCode": "90405"
              },
              {
                "@type": "Place",
                "name": "Brentwood",
                "postalCode": "90049"
              },
              {
                "@type": "Place",
                "name": "Pacific Palisades",
                "postalCode": "90272"
              },
              {
                "@type": "Place",
                "name": "Bel Air",
                "postalCode": "90077"
              },
              {
                "@type": "Place",
                "name": "Westwood",
                "postalCode": "90024"
              },
              {
                "@type": "Place",
                "name": "West Los Angeles",
                "postalCode": "90064"
              },
              {
                "@type": "Place",
                "name": "Culver City",
                "postalCode": "90232"
              },
              {
                "@type": "Place",
                "name": "Culver City",
                "postalCode": "90230"
              },
              {
                "@type": "Place",
                "name": "La Cañada Flintridge",
                "postalCode": "91011"
              },
              {
                "@type": "Place",
                "name": "San Marino",
                "postalCode": "91108"
              },
              {
                "@type": "Place",
                "name": "South Pasadena",
                "postalCode": "91030"
              },
              {
                "@type": "Place",
                "name": "Pasadena",
                "postalCode": "91105"
              },
              {
                "@type": "Place",
                "name": "Pasadena",
                "postalCode": "91106"
              },
              {
                "@type": "Place",
                "name": "Worldwide",
                "description": "Remote consulting and development services"
              }
            ],
            "serviceType": [
              "Full-Stack Web Development",
              "MVP Development",
              "Business Website Development",
              "Technical Consulting",
              "Software Architecture",
              "Code Review",
              "Performance Optimization",
              "React Development",
              "Next.js Development",
              "TypeScript Development",
              "PostgreSQL Development",
              "API Development",
              "Database Design",
              "Cloud Deployment",
              "DevOps Consulting"
            ],
            "provider": {
              "@type": "Person",
              "name": "Riyad Shauk",
              "jobTitle": "Full-Stack Web Developer & Software Consultant",
              "description": "Experienced software engineer and full-stack web developer specializing in modern web technologies and scalable applications"
            },
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceCurrency": "USD",
                "unitText": "project"
              }
            },
            "availableChannel": [
              {
                "@type": "ServiceChannel",
                "serviceType": "Online Service",
                "name": "Remote Development & Consulting"
              },
              {
                "@type": "ServiceChannel", 
                "serviceType": "In-Person Service",
                "name": "Local Development & Consulting",
                "areaServed": [
                  {
                    "@type": "Place",
                    "name": "Beverly Hills",
                    "postalCode": "90210"
                  },
                  {
                    "@type": "Place",
                    "name": "Beverly Hills",
                    "postalCode": "90211"
                  },
                  {
                    "@type": "Place",
                    "name": "Beverly Hills",
                    "postalCode": "90212"
                  },
                  {
                    "@type": "Place",
                    "name": "Santa Monica",
                    "postalCode": "90402"
                  },
                  {
                    "@type": "Place",
                    "name": "Santa Monica",
                    "postalCode": "90401"
                  },
                  {
                    "@type": "Place",
                    "name": "Santa Monica",
                    "postalCode": "90403"
                  },
                  {
                    "@type": "Place",
                    "name": "Santa Monica",
                    "postalCode": "90405"
                  },
                  {
                    "@type": "Place",
                    "name": "Brentwood",
                    "postalCode": "90049"
                  },
                  {
                    "@type": "Place",
                    "name": "Pacific Palisades",
                    "postalCode": "90272"
                  },
                  {
                    "@type": "Place",
                    "name": "Bel Air",
                    "postalCode": "90077"
                  },
                  {
                    "@type": "Place",
                    "name": "Westwood",
                    "postalCode": "90024"
                  },
                  {
                    "@type": "Place",
                    "name": "West Los Angeles",
                    "postalCode": "90064"
                  },
                  {
                    "@type": "Place",
                    "name": "Culver City",
                    "postalCode": "90232"
                  },
                  {
                    "@type": "Place",
                    "name": "Culver City",
                    "postalCode": "90230"
                  },
                  {
                    "@type": "Place",
                    "name": "La Cañada Flintridge",
                    "postalCode": "91011"
                  },
                  {
                    "@type": "Place",
                    "name": "San Marino",
                    "postalCode": "91108"
                  },
                  {
                    "@type": "Place",
                    "name": "South Pasadena",
                    "postalCode": "91030"
                  },
                  {
                    "@type": "Place",
                    "name": "Pasadena",
                    "postalCode": "91105"
                  },
                  {
                    "@type": "Place",
                    "name": "Pasadena",
                    "postalCode": "91106"
                  }
                ]
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
} 