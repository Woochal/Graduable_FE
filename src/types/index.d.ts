export interface MenuItemActiveType {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}
  
export interface MenuItemType {
    name: string;
    path: string;
} 