export interface NavItem {
    displayName: string;
    expanded?: boolean;
    iconName: string;
    route: string;
    children?: NavItemChild[];
}

export type NavItemChild = Omit<NavItem, 'children' | 'expanded'>;