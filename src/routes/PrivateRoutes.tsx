import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ECommerce from '../pages/Dashboard/ECommerce.tsx';
import Settings from '../pages/Settings.tsx';
import FormLayout from '../pages/Form/FormLayout.tsx';
import FormElements from '../pages/Form/FormElements.tsx';
import Profile from '../pages/Profile.tsx';
import Users from '../pages/Users/Users.tsx';
import MenusPageCreate from '../pages/Menus/MenusPageCreate.tsx';
import PermissionsPageCreate from '../pages/Permissions/PermissionsPageCreate.tsx';
import PermissionsPageRead from '../pages/Permissions/PermissionsPageRead.tsx';
import PermissionsPageEdit from '../pages/Permissions/PermissionsPageEdit.tsx';
import MenusPageRead from '../pages/Menus/MenusPageRead.tsx';
import RolesPageCreate from '../pages/Roles/RolesPageCreate.tsx';
import RolesPageRead from '../pages/Roles/RolesPageRead.tsx';


const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ECommerce />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/form-layout" element={<FormLayout />} />
      <Route path="/form-elements" element={<FormElements />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/admin/menu/create" element={<MenusPageCreate />} />
      <Route path="/admin/menu" element={<MenusPageRead />} />
      <Route path="/admin/permission/create" element={<PermissionsPageCreate />} />
      <Route path="/admin/permission" element={<PermissionsPageRead />} />
      <Route path="/admin/permissions/edit/:roleId/:resourceId" element={<PermissionsPageEdit />} />
      <Route path="/admin/role/create" element={<RolesPageCreate />} />
      <Route path="/admin/roles" element={<RolesPageRead />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PrivateRoutes;
