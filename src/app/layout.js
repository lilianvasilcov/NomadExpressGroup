import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.nomadexpressgroup.com'),
  title: {
    default: 'Nomad Express Group - Your Trusted Flatbed Trucking Company',
    template: '%s | Nomad Express Group'
  },
  description: 'Professional flatbed trucking services with reliable delivery, experienced drivers, and modern fleet. Get a quote today!',
  alternates: {
    canonical: '/' 
  },
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  openGraph: {
    title: 'Nomad Express Group - Your Trusted Flatbed Trucking Company',
    description: 'Professional flatbed trucking services with reliable delivery, experienced drivers, and modern fleet. Get a quote today!',
    url: 'https://www.nomadexpressgroup.com',
    siteName: 'Nomad Express Group',
    images: [
      { url: '/logo.png', width: 1200, height: 630, alt: 'Nomad Express Group' }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomad Express Group - Your Trusted Flatbed Trucking Company',
    description: 'Professional flatbed trucking services with reliable delivery, experienced drivers, and modern fleet. Get a quote today!',
    images: ['/logo.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Nomad Express Group',
              url: 'https://www.nomadexpressgroup.com',
              logo: 'https://www.nomadexpressgroup.com/logo.png',
              sameAs: [
                'https://www.facebook.com/',
                'https://www.linkedin.com/'
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+1-555-123-4567',
                  contactType: 'customer service',
                  areaServed: 'US'
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
