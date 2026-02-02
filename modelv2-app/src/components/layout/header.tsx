"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "../ui/ThemeProvider";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState("");

  const logoSrc =
    theme === "light"
      ? "/modellogocolored.png"
      : "/modellogowhite.png";

  useEffect(() => {
    const storedName = sessionStorage.getItem("fullName") || "";
    setFullName(storedName);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-28 bg-layout1 text-foreground shadow-lg z-50 flex items-center px-4 transition-colors duration-300 ease-in-out ${className}`}
    >
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-3/4 h-full bg-layout3 opacity-50"
          style={{
            clipPath: "polygon(100% 44%, 100% 0%, 25.6% 0%)",
          }}
        ></div>
      </div>

      <div className="flex justify-between items-center w-full z-10">
        <a href="/dashboard">
          <Image
            src={logoSrc}
            alt="MODEL Logo"
            width={240}
            height={80}
            className="h-auto w-auto transition-opacity duration-300 ease-in-out"
          />
        </a>
        <div className="mr-6">
          {fullName && (
            <span className="px-4 py-2 rounded-lg text-sm md:text-base lg:text-lg text-layoutText2 tracking-wide uppercase shadow-sm backdrop-blur-sm transition-colors duration-300 ease-in-out">
              Welcome,&nbsp;
              <span className="text-primary font-bold">{fullName}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
