export interface availablePermission {
  resource: string;
  action: string;
  label: string;
}

export interface AvailablePermissionState {
  permissions: availablePermission[];
}

export interface Permission {
  _id: string;
  label: string;
  action: string;
}