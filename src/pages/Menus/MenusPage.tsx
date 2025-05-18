import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOneMenu from '../../components/Forms/SelectGroupOneMenu.tsx';
import { useResourcesQuery } from '../../redux/resources/resourcesApiSlice.ts';
import { usePermissionsQuery } from '../../redux/permissions/permissionsApiSlice.ts';
import InputField from '../../components/Forms/InputField.tsx';
import { MenuItem, menuRequest } from '../../redux/menus/menus.type.ts';
import { Permission } from '../../redux/permissions/permissions.type.ts';
import errorHandler from '../../utils/errorHandler.ts';
import { useAddMenuItemMutation, useAllMenusQuery } from '../../redux/menus/menusApiSlice.ts';
import Loader from '../../common/Loader';

const transformMenusToOptions = (menus: MenuItem[] = []) =>
  menus.map(menu => ({
    _id: menu._id,
    name: menu.name,
    label: menu.name,
  }));

const transformPermissionsToOptions = (permissions:Permission[] = []) =>
  permissions.map(permission => ({
    _id: permission._id,
    name: permission.action,
    label: permission.label,
  }));

const MenusPage = () => {
  const { data: resources, isLoading: isResourcesLoading } = useResourcesQuery();
  const { data: permissions, isLoading: isPermissionsLoading } = usePermissionsQuery();
  const { data: menus, isLoading: isMenusLoading } = useAllMenusQuery();

  const { register, handleSubmit, formState: { errors } } = useForm<menuRequest>();

  const menuOptions = transformMenusToOptions(menus);
  const permissionOptions = transformPermissionsToOptions(permissions);


  const [addMenuItem, { isLoading }] = useAddMenuItemMutation();

  const onSubmit: SubmitHandler<menuRequest> = async (data) => {
    try {
      await addMenuItem(data).unwrap();
      // navigate('/'); //проверить права доступа и в завимости от этого сделать navigate
    } catch (err) {
      errorHandler();
    }
  }

  return isLoading ? (
      <Loader />
    ) : (
    <>
      <Breadcrumb pageName="Create new menu item" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Menu Form</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Введіть назву пункту меню"
                    required={true}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <InputField
                    label="URL"
                    name="urn"
                    placeholder="Введіть URL"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    {...register('resource_id')}
                    label="Виберіть розділ до якого буде відноситись цей пункт меню"
                    span="(Розділення прав доступу)"
                    options={resources || []}
                    isLoading={isResourcesLoading}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    {...register('parent_id')}
                    label="Виберіть батьківський елемент меню"
                    span="(Якщо не вибрано батьківський пункт меню, цей елемент буде вважатися батьківським)"
                    options={menuOptions}
                    isLoading={isMenusLoading}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    {...register('permission_id')}
                    label="Оберіть дію, яку виконує цей пункт меню"
                    options={permissionOptions}
                    isLoading={isPermissionsLoading}
                    register={register}
                    errors={errors}
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Відправити
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenusPage;
