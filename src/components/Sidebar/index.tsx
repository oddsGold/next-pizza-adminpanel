import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useMenusQuery } from '../../redux/menus/menusApiSlice.ts';
import Loader from '../../common/Loader';
import SidebarHeader from './SidebarHeader.tsx';
import SidebarMenuItem from './SidebarMenuItem.tsx';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { data: menus, isLoading } = useMenusQuery();
  const { pathname } = useLocation();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const [sidebarExpanded] = useState(
    localStorage.getItem('sidebar-expanded') === 'true'
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(e.target as Node)) return;
      if (trigger.current.contains(e.target as Node)) return;
      setSidebarOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (sidebarOpen && e.key === 'Escape') setSidebarOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const body = document.querySelector('body');
    sidebarExpanded
      ? body?.classList.add('sidebar-expanded')
      : body?.classList.remove('sidebar-expanded');
  }, [sidebarExpanded]);

  const isActive = (path: string, includeChildren = false) => {
    if (includeChildren) {
      if (path === '/') return pathname === '/';
      return pathname.startsWith(path);
    }
    return pathname === path;
  };

  const renderMenuItem = (to: string, text: string, matchChildren = false) => (
    <li>
      <NavLink
        to={to}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          isActive(to, matchChildren)
            ? 'bg-graydark text-bodydark1 dark:bg-meta-4'
            : 'text-bodydark2'
        }`}
      >
        {text}
      </NavLink>
    </li>
  );

  const renderParentMenuItem = (menu: any, handleClick: () => void, open: boolean) => (
    <SidebarMenuItem menu={menu} handleClick={handleClick} open={open} />
  );

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <SidebarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {renderMenuItem('/', 'Dashboard')}
              {renderMenuItem('/users', 'Users', true)}

              {isLoading ? (
                <Loader />
              ) : (
                menus?.map((menu) => (
                  <SidebarLinkGroup
                    key={menu._id}
                    activeCondition={menu.children?.some((child) =>
                      isActive(`/${child.urn}`)
                    )}
                  >
                    {(handleClick, open) => renderParentMenuItem(menu, handleClick, open)}
                  </SidebarLinkGroup>
                ))
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;