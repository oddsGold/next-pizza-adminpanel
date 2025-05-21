import React, { useState } from 'react';
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
  useGetClientUsersQuery
} from '../../redux/users/usersApiSlice.ts';
import Loader from '../../common/Loader';
import {
  UserClientResponse,
} from '../../redux/users/userInfo.type.ts';
import { uk } from 'date-fns/locale';
import { format } from 'date-fns';
import useSort from '../../hooks/useSort.ts';
import { Link } from 'react-router-dom';

const Users: React.FC = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSort();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: adminUsers,
    error: isAdminUserError,
    isLoading: isAdminUserLoading,
  } = useGetAdminUsersQuery({ page, perPage, sortBy, sortOrder });
  const {
    data: clientUsers,
    error: isClientUserError,
    isLoading: isClientUserLoading,
  } = useGetClientUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  if (isAdminUserError || isClientUserError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-red-500">
          Виникла помилка під чаз завантаження даних користувача.
        </p>
      </div>
    );
  }

  const isUserLoading = isAdminUserLoading && isClientUserLoading;

  const handleSort = (field:string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = async (userId:string) => {
    try {
      await deleteUser(userId).unwrap();
      console.log('Пользователь удален');
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  return isUserLoading ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Користувачі</h1>

      {/* Admin Users */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 pb-2">
          👑 Адміністратори
        </h2>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('role')}
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="shadow-md divide-y divide-gray-200">
            {adminUsers?.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Адміністратор
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/users/edit/${user._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Client Users */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 pb-2">
          👥 Клієнти
        </h2>
        {isClientUserError ? (
          <p className="text-red-500">
            Помилка при завантаженні клієнтських користувачів.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientUsers?.map((user: UserClientResponse) => (
              <div
                key={user.id}
                className="bg-gray-50 shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.fullName}
                </h3>
                <p className="text-gray-500">{user.email}</p>
                {user.verified && (
                  <span className="text-xs inline-block mt-2 text-blue-600 font-medium">
                    Verified -{' '}
                    {format(new Date(user.verified), 'dd.MM.yyyy, HH:mm', {
                      locale: uk,
                    })}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Users;
