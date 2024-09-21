export interface Menu {
  id: number;
  name: string;
  url: string;
  parent_id: number | null;
  resource_id: number | null;
}

interface Role {
  id: number;
  name: string;
  label: string;
  menus: Menu[];
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
  avatar_url: string;
  is_online: boolean;
  role: Role;
}

export interface UserRequest {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
}

export interface customMenu extends Menu {
  children: Menu[];
}