export interface MenuItem {
  _id: string;
  name: string;
  urn: string | null;
  parent_id: string | null;
  resource_id: string | null;
  permission_id: string | null;
  children?: MenuItem[];
}

export interface menuRequest {
  name:string;
  parent_id: string | null;
  permission_id: string | null;
  resource_id: string | null;
  urn: string | null;
}