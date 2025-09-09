"use client"

import type React from "react"

import Link from "next/link"
import type { NavItem, OpenDropdowns } from "./sidebar.types"
import { getIconByName } from "./sidebar.icons"
import { ChevronRight } from "lucide-react"

interface Props {
  items: NavItem[]
  openDropdowns: OpenDropdowns
  setOpenDropdowns: React.Dispatch<React.SetStateAction<OpenDropdowns>>
  pathname: string
  level?: number
  collapsed?: boolean
  isHovered?: boolean
}

export default function SidebarTree({
  items,
  openDropdowns,
  setOpenDropdowns,
  pathname,
  level = 0,
  collapsed = false,
  isHovered = false,
}: Props) {
  const toggleDropdown = (key: string) => {
    if (collapsed && !isHovered) return
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const shouldShowContent = !collapsed || isHovered
  const isTopLevel = level === 0

  return (
    <ul className={`${level > 0 ? "ml-4 pl-4 border-l-2 border-gray-600" : ""} space-y-1`}>
      {items.map((item) => {
        const hasChildren = !!(item.children && item.children.length > 0)
        const isActive = pathname === item.URL
        const isOpen = openDropdowns[item.NAV_ITEM_CODE]

        const Icon = isTopLevel && item.ICON ? getIconByName(item.ICON) : undefined

        return (
          <li key={item.NAV_ITEM_CODE}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.NAV_ITEM_CODE)}
                  className="flex items-center justify-between w-full pl-2 py-1 text-sm text-layoutText2 hover:bg-layouthover hover:text-layoutText1 focus:outline-none transition-all duration-200 rounded-md group/item"
                  title={collapsed && !isHovered ? item.TITLE : undefined}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden />}
                    <span
                      className={`transition-all duration-200 truncate ${
                        shouldShowContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      {item.TITLE}
                    </span>
                  </span>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                      isOpen ? "rotate-90" : ""
                    } ${shouldShowContent ? "opacity-100" : "opacity-0"}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen && shouldShowContent ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {isOpen && shouldShowContent && (
                    <SidebarTree
                      items={item.children!}
                      openDropdowns={openDropdowns}
                      setOpenDropdowns={setOpenDropdowns}
                      pathname={pathname}
                      level={level + 1}
                      collapsed={collapsed}
                      isHovered={isHovered}
                    />
                  )}
                </div>
              </>
            ) : (
              <Link
                href={item.URL}
                className={`flex items-center gap-2 pl-2 py-1 text-sm rounded-md transition-all duration-200 group/link ${
                  isActive
                    ? "bg-layouthover text-layoutText1 font-semibold"
                    : "text-layoutText2 hover:bg-layouthover hover:text-layoutText1"
                }`}
                title={collapsed && !isHovered ? item.TITLE : undefined}
              >
                {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden />}
                <span
                  className={`transition-all duration-200 truncate ${
                    shouldShowContent ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.TITLE}
                </span>
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
