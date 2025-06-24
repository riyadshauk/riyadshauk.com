import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Riyad Shauk - Computer Science & Programming Tutor | LeetCode & SWE Interview Prep | Los Angeles | riyadshauk.com",
  description: "Expert computer science and programming tutoring by Riyad Shauk. Specializing in LeetCode problems, SWE interview preparation, and coding fundamentals. Available in Los Angeles ($150/hr) and remotely ($100/hr).",
  keywords: [
    "computer science tutor",
    "programming tutor",
    "leetcode tutor",
    "leetcode solutions",
    "leetcode problems",
    "SWE interview prep",
    "SWE interview",
    "SWE interview preparation",
    "software engineering interview",
    "coding tutor",
    "programming help",
    "algorithm tutor",
    "data structures tutor",
    "python tutor",
    "javascript tutor",
    "java tutor",
    "golang tutor",
    "go tutor",
    "node.js tutor",
    "typescript tutor",
    "react tutor",
    "next.js tutor",
    "html tutor",
    "css tutor",
    "C++ tutor",
    "coding interview prep",
    "technical interview prep",
    "Los Angeles tutor",
    "Santa Monica tutor",
    "Highland Park tutor",
    "90402 tutor",
    "90042 tutor",
    "Santa Monica computer science tutor",
    "Highland Park programming tutor",
    "Los Angeles coding tutor",
    "remote tutoring",
    "online programming tutor",
    "computer science help",
    "coding bootcamp tutor",
    "Riyad Shauk",
    "tutoring",
    "private tutor",
    "academic help",
    "homework help",
    "test preparation",
    "in-person tutoring",
    "local tutor",
    "Los Angeles area tutor"
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
    title: "Riyad Shauk - Computer Science & Programming Tutor | LeetCode & SWE Interview Prep | Los Angeles (90402, 90042)",
    description: "Expert computer science and programming tutoring by Riyad Shauk. Specializing in LeetCode problems, SWE interview preparation, and coding fundamentals. Available in Los Angeles (90402 Santa Monica, 90042 Highland Park) and remotely.",
    siteName: "Riyad Shauk Tutoring",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riyad Shauk - Computer Science & Programming Tutor in Los Angeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyad Shauk - Computer Science & Programming Tutor | LeetCode & SWE Interview Prep | Los Angeles (90402, 90042)",
    description: "Expert computer science and programming tutoring by Riyad Shauk. Specializing in LeetCode problems, SWE interview preparation, and coding fundamentals. Available in Los Angeles (90402 Santa Monica, 90042 Highland Park) and remotely.",
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalService",
              "name": "Riyad Shauk Computer Science Tutoring",
              "description": "Expert computer science and programming tutoring specializing in LeetCode problems, SWE interview preparation, and coding fundamentals.",
              "url": "https://riyadshauk.com",
              "telephone": "+1-310-866-6284",
              "email": "riyad.shauk@gmail.com",
              "priceRange": "$100-$150/hour",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, PayPal",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Santa Monica",
                  "postalCode": "90402"
                },
                {
                  "@type": "City", 
                  "name": "Highland Park",
                  "postalCode": "90042"
                },
                {
                  "@type": "City",
                  "name": "Los Angeles"
                }
              ],
              "serviceType": [
                "Computer Science Tutoring",
                "Programming Tutoring", 
                "LeetCode Problem Solving",
                "SWE Interview Preparation",
                "Algorithm Tutoring",
                "Data Structures Tutoring"
              ],
              "provider": {
                "@type": "Person",
                "name": "Riyad Shauk",
                "jobTitle": "Computer Science Tutor",
                "description": "Experienced software engineer and computer science tutor"
              },
              "offers": {
                "@type": "Offer",
                "price": "150",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "100",
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
                      "@type": "City",
                      "name": "Santa Monica",
                      "postalCode": "90402"
                    },
                    {
                      "@type": "City",
                      "name": "Highland Park", 
                      "postalCode": "90042"
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
