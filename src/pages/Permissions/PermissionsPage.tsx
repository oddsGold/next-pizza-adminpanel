import { SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import SelectGroupOneMenu from '../../components/Forms/SelectGroupOneMenu.tsx';
import { useResourcesQuery } from '../../redux/resources/resourcesApiSlice.ts';
import { useAddPermissionMutation, usePermissionsQuery } from '../../redux/permissions/permissionsApiSlice.ts';
import { Permission, permissionRequest } from '../../redux/permissions/permissions.type.ts';
import errorHandler from '../../utils/errorHandler.ts';
import { useRolesQuery } from '../../redux/roles/rolesApiSlice.ts';
import { RoleResponse } from '../../redux/roles/role.type.ts';

const transformRolesToOptions = (roles: RoleResponse[] = []) =>
  roles.map(role => ({
    _id: role._id,
    name: role.name,
    label: role.name,
  }));

const transformPermissionsToOptions = (permissions: Permission[] = []) =>
  permissions.map(permission => ({
    _id: permission._id,
    name: permission.action,
    label: permission.label,
  }));

const PermissionsPage = () => {
  const { data: resources, isLoading: isResourcesLoading } = useResourcesQuery();
  const { data: permissions, isLoading: isPermissionsLoading } = usePermissionsQuery();
  const { data: roles, isLoading: isRolesLoading } = useRolesQuery();

  const { register, handleSubmit, formState: { errors } } = useForm<permissionRequest>();

  const permissionOptions = transformPermissionsToOptions(permissions);
  const roleOptions = transformRolesToOptions(roles);

  const [addPermission, { isLoading }] = useAddPermissionMutation();

  const onSubmit: SubmitHandler<permissionRequest> = async (data) => {
    try {
      console.log(data);
      await addPermission(data).unwrap();
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

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    name="roleId"
                    label="Виберіть роль"
                    required={true}
                    options={roleOptions || []}
                    isLoading={isRolesLoading}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    name="resourceId"
                    label="Виберіть розділ до якого будуть відноситись права доступа"
                    required={true}
                    options={resources || []}
                    isLoading={isResourcesLoading}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mb-4.5">
                  <SelectGroupOneMenu
                    name="permissionId"
                    label="Оберіть дію для даної ролі"
                    required={true}
                    options={permissionOptions || []}
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
}

export default PermissionsPage;