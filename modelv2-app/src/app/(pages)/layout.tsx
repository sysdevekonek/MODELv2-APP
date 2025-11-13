"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar/sidebarContext";

type LayoutProps = {
  children: React.ReactNode;
};

function LayoutBody({ children }: LayoutProps) {
  const { collapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen"
    >
      <div className="relative min-h-screen transition-opacity duration-500 ease-in-out">
        <Header className="fixed top-0 left-0 right-0 z-20" />
        <Sidebar />

       <main
          className={`pt-36 p-6 bg-bg min-h-screen transition-all duration-300 ${
            isMobile
              ? collapsed
                ? "ml-12"   // 👈 small gap for the hamburger icon on mobile
                : "ml-0"    // overlay sidebar fully covers content
              : collapsed
                ? "ml-16"   // compact desktop sidebar
                : "ml-64"   // full desktop sidebar
          }`}
        >
          {children}
        </main>

      </div>
    </motion.div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutBody>{children}</LayoutBody>
    </SidebarProvider>
  );
}
