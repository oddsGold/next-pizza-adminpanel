import { SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import SelectGroupOneMenu from '../../components/Forms/Shared/SelectGroupOneMenu.tsx';
import { useResourcesQuery } from '../../redux/resources/resourcesApiSlice.ts';
import {
  useEditPermissionMutation, useGetPermissionByRoleAndResourceQuery,
  usePermissionsQuery
} from '../../redux/permissions/permissionsApiSlice.ts';
import {
  Permission,
  PermissionRequestPayload,
} from '../../redux/permissions/permissions.type.ts';
import errorHandler from '../../utils/errorHandler.ts';
import { useRolesQuery } from '../../redux/roles/rolesApiSlice.ts';
import { RoleResponse } from '../../redux/roles/role.type.ts';
import MultiSelect from '../../components/Forms/Shared/MultiSelect.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const transformRolesToOptions = (roles: RoleResponse[] = []) =>
  roles.map((role) => ({
    _id: role._id,
    name: role.name,
    label: role.name,
  }));

const transformPermissionsToOptions = (permissions: Permission[] = []) =>
  permissions.map((permission) => ({
    _id: permission._id,
    name: permission.action,
    label: permission.label,
  }));

const PermissionsPageCreate = () => {
  const { roleId, resourceId } = useParams();

  const { data: resources, isLoading: isResourcesLoading } =
    useResourcesQuery();
  const { data: permissions, isLoading: isPermissionsLoading } =
    usePermissionsQuery();
  const { data: roles, isLoading: isRolesLoading } = useRolesQuery();
  const { data: permissionData } = useGetPermissionByRoleAndResourceQuery(
    { roleId: roleId!, resourceId: resourceId! },
    {
      skip: !roleId || !resourceId,
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PermissionRequestPayload>();

  const permissionOptions = transformPermissionsToOptions(permissions);
  const roleOptions = transformRolesToOptions(roles);

  const [editPermission, { isLoading }] = useEditPermissionMutation();

  const onSubmit: SubmitHandler<PermissionRequestPayload> = async (data) => {
    try {
      await editPermission(data).unwrap();
    } catch (err) {
      errorHandler();
    }
  };

  useEffect(() => {
    if (permissionData?.permissionId) {
      const selectedPermissionIds = permissionData.permissionId.map((p) => p._id);
      setValue('permissionId', selectedPermissionIds);
      setValue('roleId', permissionData.roleId);
      setValue('resourceId', permissionData.resourceId);
    }
  }, [permissionData, roleId, resourceId, setValue]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Breadcrumb pageName="Add permissions" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Permission Form
              </h3>
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
                  <MultiSelect
                    name="permissionId"
                    id="permissionId"
                    label="Оберіть дію для даної ролі"
                    options={permissionOptions || []}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    required={true}
                    isLoading={isPermissionsLoading}
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
export default PermissionsPageCreate;
