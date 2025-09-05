"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "../ui/ThemeProvider";

export default function Header() {
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
    <header className="fixed top-0 left-0 w-full h-28 bg-layout1 text-foreground shadow-lg z-40 flex items-center px-4 transition-colors duration-300">
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
            className="h-auto w-[15rem]"
          />
        </a>
        <div className="text-base text-layoutText2 font-semibold uppercase mr-5">
          <h2>
            {fullName ? `Welcome, ${fullName}` : ""}
          </h2>
        </div>
      </div>
    </header>
  );
}
