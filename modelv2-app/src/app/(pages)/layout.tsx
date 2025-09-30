"use client"

import type React from "react"
import { useEffect, useState } from "react";
import Header from "../../components/layout/header"
import Sidebar from "../../components/layout/sidebar/sidebar"
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar/sidebarContext"

type LayoutProps = {
  children: React.ReactNode
}

function LayoutBody({ children }: LayoutProps) {
  const { collapsed } = useSidebar()
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 200); // small delay to trigger transition
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative min-h-screen transition-opacity duration-500 ease-in-out `+ (fadeIn ? 'opacity-100' : 'opacity-0')}>
      <Header />
      <Sidebar />
      <main
        className={`mt-32 p-6 bg-bg min-h-[calc(100vh-4rem)] transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutBody>{children}</LayoutBody>
    </SidebarProvider>
  )
}
