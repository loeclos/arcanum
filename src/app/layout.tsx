import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { EventProvider } from '@/contexts/event-detail-context';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const InstrumentSerif = Instrument_Serif({
    variable: '--font-inst-serif',
    subsets: ['latin'],
    weight: ['400'],
});

export const metadata: Metadata = {
    title: 'WOB Arcanum - Brandon Sanderson\'s arcanum managed by fans',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${InstrumentSerif.variable} antialiased bg-zinc-50 font-sans dark:bg-black selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <EventProvider>{children}</EventProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
