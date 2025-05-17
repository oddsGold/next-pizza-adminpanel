import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useUserQuery } from '../redux/users/usersApiSlice.ts';
import { useAvailablePermissionsQuery } from '../redux/permissions/permissionsApiSlice.ts';
import Loader from '../common/Loader';
import { useDispatch } from 'react-redux';
import { setPermissions } from '../redux/permissions/slice.ts';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useUserQuery();

  const {
    data: permissions,
    error: permissionsError,
    isLoading: isPermissionsLoading
  } = useAvailablePermissionsQuery();

  useEffect(() => {
    if (permissions) {
      dispatch(setPermissions(permissions));
    }
  }, [permissions]);


  const isLoading = isUserLoading || isPermissionsLoading;
  const isError = !!userError || !!permissionsError;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-red-500">
          Виникла помилка під час завантаження даних.
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            user={user}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
