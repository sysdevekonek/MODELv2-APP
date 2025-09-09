"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { buildNavTree, expandOpenDropdowns } from "./sidebar.utils"
import type { NavItem, OpenDropdowns } from "./sidebar.types"
import SidebarTree from "./sidebarTree"
import {Menu, ChevronLeft, LogOut, CircleChevronRight, CircleChevronLeft } from "lucide-react"
import { useSidebar } from "./sidebarContext";

export default function Sidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<OpenDropdowns>({})
  const [navTree, setNavTree] = useState<NavItem[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()
  const { collapsed, toggleCollapsed } = useSidebar()

  useEffect(() => {
    const navListRaw = sessionStorage.getItem("navigation")
    const navList: NavItem[] = navListRaw ? JSON.parse(navListRaw) : []
    const tree = buildNavTree(navList)
    setNavTree(tree)
    const expanded = expandOpenDropdowns(tree, pathname)
    setOpenDropdowns(expanded)
  }, [pathname])

  useEffect(() => {
    if (collapsed && !isHovered) {
      setOpenDropdowns({})
    }
  }, [collapsed, isHovered])

  const handleLogout = () => {
    sessionStorage.clear()
    window.location.href = "/login"
  }

  const shouldShowContent = !collapsed || isHovered

  return (
    <aside
      className={`fixed top-28 left-0 h-[calc(100vh-6rem)] bg-layout1 text-foreground shadow-lg z-30 overflow-visible transition-all duration-300 ease-in-out
        ${collapsed ? "w-12 hover:w-64" : "w-64"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <div className="absolute inset-0 pointer-events-none z-0">
  <div
    className="absolute top-0 right-0 w-full h-full bg-layout3 opacity-50 transition-all duration-300"
    style={{
      clipPath: collapsed
        ? "polygon(95% 92%, 100% 85%, 100% 100%, 0% 100%, 0% 90%)" // 👈 tighter when collapsed
        : "polygon(85.2% 87%, 100% 75%, 100% 100%, 0% 100%, 0% 75%)",
    }}
  />
  <div
    className="absolute top-0 right-0 w-full h-full bg-layout2 opacity-50 transition-all duration-300"
    style={{
      clipPath: collapsed
        ? "polygon(97% 95%, 100% 88%, 100% 100%, 0% 100%, 0% 95%)"
        : "polygon(90.2% 90%, 100% 79%, 100% 100%, 0% 100%, 0% 83%)",
    }}
  />
</div>

  
      <button
        onClick={toggleCollapsed}
        className="absolute top-3 -right-3 transform w-6 h-6 flex items-center justify-center rounded-full bg-bg hover:bg-layout3 hover:border-gray-300 z-50 transition-all duration-200 hover:scale-110"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand Navigation" : "Collapse Navigation"}
      >
        {collapsed ? <Menu size={14} /> : <Menu size={14} className="rotate-90" />}
      </button>

      <div className="relative h-full flex flex-col">
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pt-2 pb-20 custom-scrollbar">
          <SidebarTree
          items={navTree}
          openDropdowns={openDropdowns}
          setOpenDropdowns={setOpenDropdowns}
          pathname={pathname}
          collapsed={collapsed}
          isHovered={isHovered}
        />

        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-layoutText2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {shouldShowContent && <span>Logout</span>}
          </button>
        </div>
      </div>
      <style jsx global>{`
      .custom-scrollbar {
        scrollbar-width: thin; /* Firefox */
        scrollbar-color: #94a3b8 transparent; /* thumb + track */
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
        margin: 4px 0; /* space top and bottom */
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
        border-radius: 9999px; /* pill shape */
        border: 2px solid transparent; /* spacing between thumb & track */
        background-clip: content-box; /* avoids covering border */
        transition: background 0.3s ease;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%);
      }

      .custom-scrollbar::-webkit-scrollbar-corner {
        background: transparent;
      }
    `}</style>

    </aside>

  )
}
