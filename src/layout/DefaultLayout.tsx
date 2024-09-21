import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useUserQuery } from '../redux/users/usersApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectValidatedRefreshToken } from '../redux/auth/selectors.ts';
import Loader from '../common/Loader';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const refreshToken = useSelector(selectValidatedRefreshToken);

  const {
    data: user,
    error: isUserError,
    isLoading: isUserLoading,
  } = useUserQuery(refreshToken);

  if (isUserError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-red-500">Виникла помилка під чаз завантаження даних користувача.</p>
      </div>
    );
  }

  return isUserLoading ? (
    <Loader />
  ) : (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

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
