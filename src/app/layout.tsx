import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riyadshauk.com'),
  title: "Riyad Shauk - Software Consultant & Programming Tutor | Los Angeles & Remote | riyadshauk.com",
  description: "Experienced software engineer offering software consulting and programming tutoring services. From 1-on-1 coding lessons to full-stack development projects, I help students and businesses succeed with technology in Los Angeles and worldwide.",
  keywords: [
    // Consulting Keywords
    "freelance full stack developer los angeles",
    "hire web developer los angeles",
    "solo software consultant la",
    "freelance next.js developer",
    "freelance website developer for small business",
    "independent software engineer los angeles",
    "personalized software solutions santa monica",
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

    // Tutoring Keywords
    "programming tutor",
    "computer science tutor",
    "coding tutor",
    "learn to code",
    "programming help",
    "coding for kids",
    "coding for teens",
    "programming help for adults",
    "computer science tutoring",
    "python tutor",
    "javascript tutor",
    "java tutor",
    "algorithm tutor",
    "data structures tutor",
    "leetcode tutor",
    "SWE interview prep",
    "coding bootcamp tutor",
    "private programming tutor",
    "Los Angeles programming tutor",
    "Beverly Hills tutor",
    "Santa Monica tutor",
    "Brentwood tutor",
    "Pacific Palisades tutor",
    "La Cañada tutor",
    "San Marino tutor",
    "90210 tutor",
    "90402 tutor",
    "90049 tutor",
    "90272 tutor",
    "91011 tutor",
    "91108 tutor",
    "Beverly Hills programming tutor",
    "Santa Monica coding tutor",
    "Brentwood computer science tutor",
    "Pacific Palisades algorithm tutor",
    "La Cañada SWE interview prep",
    "San Marino programming tutor",
    "Los Angeles coding tutor",
    "remote tutoring",
    "online programming tutor",
    "computer science help",
    
    // General Keywords
    "Riyad Shauk",
    "tutoring",
    "consulting",
    "private tutor",
    "software consultant",
    "academic help",
    "homework help",
    "test preparation",
    "in-person tutoring",
    "local tutor",
    "Los Angeles area tutor",
    "patient tutor",
    "experienced tutor",
    "one-on-one tutoring",
    "web development",
    "software development",
    "full-stack development",
    "mvp development",
    "technical consulting"
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
    url: "https://riyadshauk.com",
    title: "Riyad Shauk - Software Consultant & Programming Tutor | Los Angeles & Remote",
    description: "Experienced software engineer offering software consulting and programming tutoring services. From 1-on-1 coding lessons to full-stack development projects, I help students and businesses succeed with technology.",
    siteName: "Riyad Shauk",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riyad Shauk - Programming Tutor & Software Consultant in Los Angeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyad Shauk - Software Consultant & Programming Tutor | Los Angeles & Remote",
    description: "Experienced software engineer offering software consulting and programming tutoring services. From 1-on-1 coding lessons to full-stack development projects, I help students and businesses succeed with technology.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://riyadshauk.com",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Riyad Shauk",
              "jobTitle": "Software Consultant & Programming Tutor",
              "description": "Experienced software engineer offering software consulting and programming tutoring services. From 1-on-1 coding lessons to full-stack development projects.",
              "url": "https://riyadshauk.com",
              "telephone": "+1-310-866-6284",
              "email": "riyad.shauk@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "knowsAbout": [
                "Programming",
                "Computer Science",
                "Web Development",
                "Software Engineering",
                "Algorithms",
                "Data Structures",
                "React",
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Python",
                "JavaScript"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Programming Tutoring",
                      "description": "1-on-1 programming and computer science tutoring for students of all ages",
                      "serviceType": "Educational Service",
                      "price": "150",
                      "priceCurrency": "USD",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "150",
                        "priceCurrency": "USD",
                        "unitText": "hour"
                      }
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Software Consulting",
                      "description": "Software development and technical consulting for individuals and small teams",
                      "serviceType": "Professional Service",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "priceCurrency": "USD",
                        "unitText": "project"
                      }
                    }
                  }
                ]
              },
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
                  "description": "Remote services available"
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}