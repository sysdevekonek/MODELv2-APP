import { NavItem, OpenDropdowns } from './sidebar.types';

export function buildNavTree(items: NavItem[]): NavItem[] {
  const map: { [key: string]: NavItem & { children: NavItem[] } } = {};
  const tree: NavItem[] = [];

  items.forEach(item => {
    map[item.NAV_ITEM_CODE] = { ...item, children: [] };
  });

  items.forEach(item => {
    if (item.PARENT_NAV_CODE && map[item.PARENT_NAV_CODE]) {
      map[item.PARENT_NAV_CODE].children!.push(map[item.NAV_ITEM_CODE]);
    } else {
      tree.push(map[item.NAV_ITEM_CODE]);
    }
  });

  return tree;
}

export function expandOpenDropdowns(items: NavItem[], currentPath: string): OpenDropdowns {
  const open: OpenDropdowns = {};

  const walk = (list: NavItem[], parentKeys: string[] = []) => {
    for (const item of list) {
      if (item.URL === currentPath) {
        parentKeys.forEach(key => (open[key] = true));
      }

      if (item.children && item.children.length > 0) {
        walk(item.children, [...parentKeys, item.NAV_ITEM_CODE]);
      }
    }
  };

  walk(items);
  return open;
}
