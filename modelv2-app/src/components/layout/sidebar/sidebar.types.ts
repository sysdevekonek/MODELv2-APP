export interface NavItem {
  NAV_ITEM_CODE: string;
  TITLE: string;
  URL: string;
  ICON: string;
  PARENT_NAV_CODE: string | null;
  children?: NavItem[];
}

export type OpenDropdowns = { [key: string]: boolean };
