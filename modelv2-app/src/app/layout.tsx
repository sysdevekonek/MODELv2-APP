// layout.tsx
'use client';

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Roboto, Montserrat } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { toastInfo } from "@/components/utils/customToasts";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

function AutoLogoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = sessionStorage.getItem("accessToken");
      const now = Date.now();

      const idleTime = now - lastActivity;
      if (idleTime >= 900000) { // 15 minutes
        sessionStorage.clear();
        toastInfo("Session expired due to inactivity");
        router.push("/login");
        return;
      }

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

          if (isExpired) {
            sessionStorage.clear();
            toastInfo("Session expired");
            router.push("/login");
            console.clear();
          }
        } catch (err) {
          console.warn("Invalid token format:", err);
          sessionStorage.clear();
          router.push("/login");
        }
      }
    };

    const interval = setInterval(checkAuthStatus, 30000);
    return () => clearInterval(interval);
  }, [router, lastActivity]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${montserrat.variable} bg-bg text-text1`}>
        <ThemeProvider>
          <AutoLogoutWrapper>
            {children}
          </AutoLogoutWrapper>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.750rem',
                background: '#fff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: '#f0fdf4',
                },
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#f0fdf4',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fef2f2',
                },
              },
            }}
          />

          <div className="fixed object-bottom-right bottom-4 right-4 z-50">
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}