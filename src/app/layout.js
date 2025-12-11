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
    default: 'Nomad Express Group - Professional Trucking Company | Flatbed & Freight Services',
    template: '%s | Nomad Express Group'
  },
  description: 'Nomad Express Group is a leading trucking company providing professional freight transportation services nationwide. Specializing in flatbed, refrigerated, and heavy haul trucking across all 48 states. Get your free quote today!',
  keywords: [
    'Nomad Express',
    'Nomad Express Group',
    'trucking company',
    'freight transportation',
    'flatbed trucking',
    'trucking services',
    'freight company',
    'logistics company',
    'trucking carrier',
    'freight carrier',
    'flatbed freight',
    'refrigerated trucking',
    'heavy haul trucking',
    'nationwide trucking',
    'professional trucking',
    'trucking services USA',
    'freight shipping',
    'trucking logistics'
  ],
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
    title: 'Nomad Express Group - Professional Trucking Company | Flatbed & Freight Services',
    description: 'Nomad Express Group is a leading trucking company providing professional freight transportation services nationwide. Specializing in flatbed, refrigerated, and heavy haul trucking across all 48 states.',
    url: 'https://www.nomadexpressgroup.com',
    siteName: 'Nomad Express Group',
    images: [
      { url: '/logo.png', width: 1200, height: 630, alt: 'Nomad Express Group - Professional Trucking Company' }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomad Express Group - Professional Trucking Company | Flatbed & Freight Services',
    description: 'Nomad Express Group is a leading trucking company providing professional freight transportation services nationwide. Specializing in flatbed, refrigerated, and heavy haul trucking.',
    images: ['/logo.png']
  },
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
              '@type': 'TruckingCompany',
              '@id': 'https://www.nomadexpressgroup.com',
              name: 'Nomad Express Group',
              alternateName: 'Nomad Express',
              url: 'https://www.nomadexpressgroup.com',
              logo: 'https://www.nomadexpressgroup.com/logo.png',
              description: 'Nomad Express Group is a leading trucking company providing professional freight transportation services nationwide. Specializing in flatbed, refrigerated, and heavy haul trucking across all 48 states.',
              foundingDate: '2018',
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                value: '50+'
              },
              areaServed: {
                '@type': 'Country',
                name: 'United States'
              },
              serviceType: [
                'Flatbed Trucking',
                'Refrigerated Transportation',
                'Heavy Haul Services',
                'Full Truckload (FTL)',
                'Less Than Truckload (LTL)',
                'Expedited Freight',
                'Logistics Solutions'
              ],
              sameAs: [
                'https://www.facebook.com/',
                'https://www.linkedin.com/'
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+1-555-123-4567',
                  contactType: 'customer service',
                  areaServed: 'US',
                  availableLanguage: 'English'
                }
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '150'
              }
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
