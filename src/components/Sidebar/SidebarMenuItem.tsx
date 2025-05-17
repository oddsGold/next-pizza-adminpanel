import { NavLink, useLocation } from 'react-router-dom';

interface MenuItemProps {
  menu: any;
  handleClick: () => void;
  open: boolean;
}

const SidebarMenuItem = ({ menu, handleClick, open }: MenuItemProps) => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path || pathname.includes(path);
  const hasChildren = menu.children?.length > 0;

  const active = hasChildren
    ? menu.children.some((child: any) => isActive(`/${child.urn}`))
    : isActive(`/${menu.urn}`);

  return (
    <>
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={`group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            active ? 'bg-graydark text-bodydark1 dark:bg-meta-4' : 'text-bodydark2'
          }`}
        >
          {menu.name}
          <svg
            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
              open ? 'rotate-180' : ''
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
            />
          </svg>
        </button>
      ) : (
        <NavLink
          to={`/${menu.urn}`}
          className={({ isActive }) =>
            `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              isActive ? 'bg-graydark text-bodydark1 dark:bg-meta-4' : 'text-bodydark2'
            }`
          }
        >
          {menu.name}
        </NavLink>
      )}

      {hasChildren && (
        <div className={`overflow-hidden ${!open ? 'hidden' : ''}`}>
          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
            {menu.children.map((child: any) => (
              <li key={child._id}>
                <NavLink
                  to={`${child.urn}`}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive ? 'bg-graydark text-bodydark1 dark:bg-meta-4' : 'text-bodydark2'
                    }`
                  }
                >
                  {child.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarMenuItem;
