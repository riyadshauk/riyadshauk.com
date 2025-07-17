import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riyadshauk.com'),
  title: "Riyad Shauk - Private Programming & Computer Science Tutor | Kids to Adults | Los Angeles (90210, 90402, 90049, 90272, 90077, 90024, 90064, 90230-32, 91011, 91108, 91030, 91105-06) & Online | riyadshauk.com",
  description: "Patient, experienced programming tutor helping students of all ages build confidence in coding and computer science. From elementary school logic to advanced algorithms, I offer personalized 1-on-1 tutoring in Los Angeles (Beverly Hills, Santa Monica, Brentwood, Pacific Palisades, Bel Air, Westwood, West LA, Culver City, La Cañada, San Marino, South Pasadena, Pasadena) and online.",
  keywords: [
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
    "Riyad Shauk",
    "tutoring",
    "private tutor",
    "academic help",
    "homework help",
    "test preparation",
    "in-person tutoring",
    "local tutor",
    "Los Angeles area tutor",
    "patient tutor",
    "experienced tutor",
    "one-on-one tutoring"
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
    title: "Riyad Shauk - Private Programming & Computer Science Tutor | Kids to Adults | Los Angeles (90210, 90402, 90049, 90272, 90077, 90024, 90064, 90230-32, 91011, 91108, 91030, 91105-06) & Online",
    description: "Patient, experienced programming tutor helping students of all ages build confidence in coding and computer science. From elementary school logic to advanced algorithms, I offer personalized 1-on-1 tutoring in Los Angeles (Beverly Hills, Santa Monica, Brentwood, Pacific Palisades, Bel Air, Westwood, West LA, Culver City, La Cañada, San Marino, South Pasadena, Pasadena) and online.",
    siteName: "Riyad Shauk Tutoring",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riyad Shauk - Patient Programming & Computer Science Tutor in Los Angeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyad Shauk - Private Programming & Computer Science Tutor | Kids to Adults | Los Angeles (90210, 90402, 90049, 90272, 90077, 90024, 90064, 90230-32, 91011, 91108, 91030, 91105-06) & Online",
    description: "Patient, experienced programming tutor helping students of all ages build confidence in coding and computer science. From elementary school logic to advanced algorithms, I offer personalized 1-on-1 tutoring in Los Angeles (Beverly Hills, Santa Monica, Brentwood, Pacific Palisades, Bel Air, Westwood, West LA, Culver City, La Cañada, San Marino, South Pasadena, Pasadena) and online.",
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
              "@type": "EducationalService",
              "name": "Riyad Shauk Private Programming Tutoring",
              "description": "Patient, experienced programming tutor helping students of all ages build confidence in coding and computer science. From elementary school logic to advanced algorithms, I offer personalized 1-on-1 tutoring.",
              "url": "https://riyadshauk.com",
              "telephone": "+1-310-866-6284",
              "email": "riyad.shauk@gmail.com",
              "priceRange": "$100-$150/hour",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, PayPal",
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
              ],
              "serviceType": [
                "Computer Science Tutoring",
                "Programming Tutoring", 
                "LeetCode Problem Solving",
                "SWE Interview Preparation",
                "Algorithm Tutoring",
                "Data Structures Tutoring",
                "SAT/AP Computer Science Tutoring",
                "Test Preparation"
              ],
              "provider": {
                "@type": "Person",
                "name": "Riyad Shauk",
                "jobTitle": "Private Programming Tutor",
                "description": "Patient, experienced software engineer and programming tutor helping students of all ages build confidence and understanding in coding"
              },
              "offers": {
                "@type": "Offer",
                "price": "150",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "150",
                  "priceCurrency": "USD",
                  "unitText": "hour"
                }
              },
              "availableChannel": [
                {
                  "@type": "ServiceChannel",
                  "serviceType": "Online Service",
                  "name": "Remote Tutoring"
                },
                {
                  "@type": "ServiceChannel", 
                  "serviceType": "In-Person Service",
                  "name": "In-Person Tutoring",
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
      </body>
    </html>
  );
}
