import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { Navigation } from './components/Navigation/index';
import { dark } from "@clerk/themes";



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Valentine\'s Day Proposal Page',
  description: 'Create your perfect proposal with our beautiful, personalized cards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <main className="min-h-screen bg-gradient-to-b from-pink-50 via-red-50 to-pink-100 dark:from-pink-950 dark:via-red-900 dark:to-pink-900 relative overflow-hidden">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <Navigation />
              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>

  );
}