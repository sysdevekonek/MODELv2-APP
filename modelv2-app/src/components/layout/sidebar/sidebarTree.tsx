import Link from 'next/link';
import { NavItem, OpenDropdowns } from './sidebar.types';

interface Props {
  items: NavItem[];
  openDropdowns: OpenDropdowns;
  setOpenDropdowns: React.Dispatch<React.SetStateAction<OpenDropdowns>>;
  pathname: string;
  level?: number;
}

export default function SidebarTree({ items, openDropdowns, setOpenDropdowns, pathname, level = 0 }: Props) {
  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ul className={`${level > 0 ? 'ml-4 pl-4 border-l-2 border-gray-600' : ''} space-y-1`}>
      {items.map(item => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = pathname === item.URL;

        return (
          <li key={item.NAV_ITEM_CODE}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.NAV_ITEM_CODE)}
                  className="flex items-center justify-between w-full pl-2 py-1 hover:bg-gray-700 hover:text-gray-300 focus:outline-none transition duration-200"
                >
                  <span>{item.TITLE}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdowns[item.NAV_ITEM_CODE] ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {openDropdowns[item.NAV_ITEM_CODE] && (
                  <SidebarTree
                    items={item.children!}
                    openDropdowns={openDropdowns}
                    setOpenDropdowns={setOpenDropdowns}
                    pathname={pathname}
                    level={level + 1}
                  />
                )}
              </>
            ) : (
              <Link
                href={item.URL}
                className={`block pl-2 py-1 rounded-md transition duration-200 ${
                  isActive
                    ? 'bg-gray-700 text-white font-semibold'
                    : 'hover:bg-gray-700 hover:text-gray-300'
                }`}
              >
                {item.TITLE}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
