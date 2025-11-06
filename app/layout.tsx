import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import CalendlyScript from "./components/CalendlyScript";
import MetaPixel from "./components/MetaPixel";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#35c4dd',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ecomsharks.com'),
  title: "ECOM SHARKS - Ecommerce Solutions for Amazon, Shopify, TikTok & Walmart",
  description: "Empower your ecommerce business with ECOM SHARKS. Expert solutions for Amazon, Shopify, TikTok, and Walmart. Scale smarter, sell faster with our dedicated team.",
  keywords: ["ecommerce", "amazon fba", "shopify", "tiktok shop", "walmart marketplace", "online selling", "digital marketing"],
  authors: [{ name: "ECOM SHARKS" }],
  creator: "ECOM SHARKS",
  publisher: "ECOM SHARKS",
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
    type: 'website',
    locale: 'en_US',
    url: 'https://ecomsharks.com',
    title: 'ECOM SHARKS - Ecommerce Solutions',
    description: 'Empower your ecommerce business with ECOM SHARKS. Expert solutions for Amazon, Shopify, TikTok, and Walmart.',
    siteName: 'ECOM SHARKS',
    images: [
      {
        url: '/favicon.ico',
        width: 32,
        height: 32,
        alt: 'ECOM SHARKS - Ecommerce Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECOM SHARKS - Ecommerce Solutions',
    description: 'Empower your ecommerce business with ECOM SHARKS. Expert solutions for Amazon, Shopify, TikTok, and Walmart.',
    images: ['/favicon.ico'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=6', sizes: 'any' },
      { url: '/favicon-16x16.png?v=6', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=6', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=6', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg?v=6', color: '#35c4dd' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for search engines */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/bi-vid.jpeg" as="image" />
        <link rel="preload" href="/images/quote-logo.png" as="image" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Calendly CSS */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tpooyzv40l");
            `,
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
        
        {/* Meta Pixel for tracking */}
        <MetaPixel />
    
        {/* Calendly Script with optimization */}
        <CalendlyScript />
      </body>
    </html>
  );
}
