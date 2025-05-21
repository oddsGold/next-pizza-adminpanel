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
  action: 'create' | 'read' | 'update' | 'delete' | 'upload';
}

export interface permissionRequest {
  roleId: string;
  resourceId: string;
  permissionId: string;
}

export interface GroupedPermissions {
  roleId: string;
  roleName: string;
  resourceId: string;
  resourceName: string;
  resourceLabel: string;
  permissions: {
    _id: string;
    action: 'create' | 'read' | 'update' | 'delete' | 'upload';
    label: string;
  }[];
}

export interface PermissionResponsePayload extends Omit<permissionRequest, 'permissionId'> {
  permissionId: Permission[];
}

export interface PermissionRequestPayload extends Omit<permissionRequest, 'permissionId'> {
  permissionId: string[];
}

