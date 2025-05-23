import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import DefaultForm from '../components/Forms/SettingsForm.tsx';
import {
  useUpdateUserMutation,
  useUserQuery,
} from '../redux/users/usersApiSlice.ts';
import Loader from '../common/LoaderNew';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../utils/errorHandler.ts';
import { UserRequest } from '../redux/users/userInfo.type.ts';

const Settings = () => {
  const navigate = useNavigate();

  const { data: user, error: isUserError, isLoading: isUserLoading } = useUserQuery();

  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

  if (isUserError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-red-500">
          Виникла помилка під чаз завантаження даних користувача.
        </p>
      </div>
    );
  }

  const handleSubmit = async (
    values: UserRequest
  ) => {
    try {
      await updateUser(values).unwrap();
      navigate('/settings');
    } catch (err) {
      errorHandler();
    }
  };

  return isUserLoading || isUpdateUserLoading ? (
    <Loader />
  ) : (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Налаштування" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Персональні дані
                </h3>
              </div>
              <div className="p-7">
                <DefaultForm
                  current={user}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Фото
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <img src={user ? user.avatar : userThree} alt="User" />
                    </div>
                    <div>
                      <span className="align-middle mb-4.5 text-black dark:text-white">
                        Замінити фото
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p className="text-primary">Натисни для завантаження </p>
                      <p> чи перетягни файл в це поле</p>
                      <p className="mt-1.5">SVG, PNG, JPG чи GIF</p>
                      <p>(максимальний розмір, 800X800px)</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
