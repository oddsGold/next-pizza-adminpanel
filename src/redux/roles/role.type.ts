
export interface Menus {
  id: number;
  name: "string";
  url: "string";
  parent_id: number;
  resource_id: number;
}

export interface Role {
  id: number;
  name: "string";
  label: "string";
  menus: Menus[];
}