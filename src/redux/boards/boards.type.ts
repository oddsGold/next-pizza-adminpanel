export interface Users {
  id: number;
  username: string;
  email: string;
  position?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role_id?: number;
}

export interface BoardsResponse {
  id: number;
  name: string;
  owner_id: number;
  users: Users[];
}

export interface Cards {
  id: number;
  name: string;
  position: number;
  description: string;
  priority_id: number;
  list_id: number;
  created_at: any;
  updated_at: any;
  users: Users[];
}

export interface Lists{
  id: number;
  name: string;
  board_id: number;
  position: number;
  cards: Cards[];
}

export interface BoardDetailsResponse{
  id: number;
  name: string;
  owner_id: number;
  users: Users[];
  lists: Lists[];
}

