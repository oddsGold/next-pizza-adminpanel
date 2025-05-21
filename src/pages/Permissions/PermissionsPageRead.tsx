import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link } from 'react-router-dom';
import {
  useDeletePermissionByRoleAndResourceMutation,
  useGetAllPermissionsQuery
} from '../../redux/permissions/permissionsApiSlice.ts';
import Loader from '../../common/Loader';
import errorHandler from '../../utils/errorHandler.ts';
import useConfirmDelete from '../../hooks/useConfirmDelete.tsx';

type DeletePayload = {
  roleId: string;
  resourceId: string;
};

const PermissionsPageRead = () => {
  const { data: response, isLoading } = useGetAllPermissionsQuery();
  const [deletePermission] = useDeletePermissionByRoleAndResourceMutation();

  const groupedPermissions = response?.map(group => ({
    key: `${group.roleId}-${group.resourceId}`,
    roleName: group.roleName,
    resourceLabel: group.resourceLabel,
    actions: group.permissions.map(p => p.label).join(', '),
    rawActions: group.permissions,
    resourceId: group.resourceId,
    roleId: group.roleId,
  }));

  const { confirm, modal } = useConfirmDelete<DeletePayload>({
    onDelete: async ({ roleId, resourceId }) => {
      try {
        await deletePermission({ roleId, resourceId }).unwrap();
      } catch (err) {
        errorHandler('Щось пішло не так!');
      }
    },
  });
  return (
    isLoading ? (
      <Loader />
      ) : (
      <>
        <Breadcrumb pageName="Permissions list" />

        <div className="grid grid-cols-1 gap-9">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Permissions list</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Розділ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {groupedPermissions?.map(item => (
                  <tr key={item.key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.resourceLabel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.actions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {item.roleName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/admin/permissions/edit/${item.roleId}/${item.resourceId}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirm({
                          roleId: item.roleId,
                          resourceId: item.resourceId
                        })}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {modal}
      </>
      )
  );
};

export default PermissionsPageRead;
