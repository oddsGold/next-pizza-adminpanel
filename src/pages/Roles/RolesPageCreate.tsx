import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import InputField from '../../components/Forms/Shared/InputField.tsx';
import errorHandler from '../../utils/errorHandler.ts';
import Loader from '../../common/Loader';
import acceptHandler from '../../utils/acceptHandler.ts';
import { useAddRoleMutation } from '../../redux/roles/rolesApiSlice.ts';
import { RoleRequest } from '../../redux/roles/role.type.ts';

const RolesPageCreate = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RoleRequest>();

  const [addRole, { isLoading }] = useAddRoleMutation();

  const onSubmit: SubmitHandler<RoleRequest> = async (data) => {
    try {
      console.log(data);
      await addRole(data).unwrap();
      acceptHandler();
      reset();
    } catch (err) {
      errorHandler();
    }
  }

  return isLoading ? (
      <Loader />
    ) : (
    <>
      <Breadcrumb pageName="Create new role" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Role Form</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <InputField
                    label="Role"
                    name="name"
                    placeholder="Введіть назву пункту меню"
                    required={true}
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

export default RolesPageCreate;
