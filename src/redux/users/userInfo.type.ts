export interface Menu {
  id: number;
  name: string;
  url: string;
  parent_id: number | null;
  resource_id: number | null;
}

export interface UserAdminResponse {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface UserClientResponse {
  id: number;
  fullName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  verified: string | null;
  provider: string | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface customMenu extends Menu {
  children: Menu[];
}