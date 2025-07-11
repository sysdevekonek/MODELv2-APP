'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { buildNavTree, expandOpenDropdowns } from './sidebar.utils';
import { NavItem, OpenDropdowns } from './sidebar.types';
import SidebarTree from './sidebarTree';

export default function Sidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<OpenDropdowns>({});
  const [navTree, setNavTree] = useState<NavItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const navListRaw = sessionStorage.getItem('navigation');
    const navList: NavItem[] = navListRaw ? JSON.parse(navListRaw) : [];
    const tree = buildNavTree(navList);
    setNavTree(tree);
    const expanded = expandOpenDropdowns(tree, pathname);
    setOpenDropdowns(expanded);
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <aside className="fixed top-32 left-0 w-72 h-[calc(100vh-8rem)] bg-mainDef3 text-white shadow-lg z-30 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-full h-full bg-mainDef2 opacity-20"
            style={{
              clipPath: "polygon(70.2% 85%, 100% 75%, 100% 100%, 0% 100%, 0% 75%)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-full h-full bg-mainDef1 opacity-15"
            style={{
              clipPath: "polygon(65.2% 90%, 100% 80%, 100% 100%, 0% 100%, 0% 75%)",
            }}
          />
        </div>

        <div className="relative h-full flex flex-col z-10">
          <nav className="flex-1 overflow-y-auto px-2 pt-2 pb-20 custom-scrollbar">
            <SidebarTree
              items={navTree}
              openDropdowns={openDropdowns}
              setOpenDropdowns={setOpenDropdowns}
              pathname={pathname}
            />

            <button
              onClick={handleLogout}
              className="mt-4 px-2 py-1 text-left text-white hover:bg-gray-700 w-full"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6b7280 transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
          border-radius: 4px;
          border: 1px solid #374151;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9ca3af 0%, #6b7280 100%);
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </>
  );
}
