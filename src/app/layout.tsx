import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Adcin Templo Central",
  description: "Bem-vindos à Adcin Templo Central. Uma igreja evangélica em Ananindeua, fundamentada na Palavra, amando pessoas. Conheça nossos cultos e faça parte da família.",
  openGraph: {
    type: "website",
    url: "https://adcintemplocentral.com.br/",
    title: "Adcin Templo Central | Uma família para pertencer",
    description: "Uma igreja evangélica em Ananindeua - PA construída para pessoas reais que buscam e amam a Deus. Venha nos visitar.",
    images: [
      {
        url: "https://adcintemplocentral.com.br/_MG_9831.jpg",
        width: 1200,
        height: 630,
        alt: "Adcin Templo Central",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) para SEO local no Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "Adcin Templo Central",
    "image": "https://adcintemplocentral.com.br/_MG_9831.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. SN 06, 100",
      "addressLocality": "Ananindeua",
      "addressRegion": "PA",
      "postalCode": "67130-820",
      "addressCountry": "BR"
    },
    "telephone": "(91) 3235-4568",
    "url": "https://adcintemplocentral.com.br/"
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
