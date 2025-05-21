import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import errorHandler from '../../utils/errorHandler.ts';
import useConfirmDelete from '../../hooks/useConfirmDelete.tsx';
import { useDeleteRoleMutation, useRolesQuery } from '../../redux/roles/rolesApiSlice.ts';

type DeletePayload = {
  id: string;
};

const PermissionsPageRead = () => {
  const { data: roles, isLoading: isRolesLoading } = useRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();

    const { confirm, modal } = useConfirmDelete<DeletePayload>({
    onDelete: async (id) => {
      try {
        await deleteRole(id).unwrap();
      } catch (err) {
        errorHandler('Щось пішло не так!');
      }
    },
  });
  return (
    isRolesLoading ? (
      <Loader />
      ) : (
      <>
        <Breadcrumb pageName="Roles list" />

        <div className="grid grid-cols-1 gap-9">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Roles list</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {roles?.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <Link
                        to={`/admin/roles/edit/${item._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirm({ id: item._id })}
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
