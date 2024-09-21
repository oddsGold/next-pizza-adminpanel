import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserRequest } from '../../redux/users/userInfo.type.ts';
import errorHandler from '../../utils/errorHandler.ts';
import { NavLink } from 'react-router-dom';

interface DefaultFormProps {
  current?: UserRequest;
  defaultCurrent?: UserRequest;
  enableReinitialize?: boolean;
  handleSubmit: (values: UserRequest) => void;
}

const DefaultForm: FC<DefaultFormProps> = ({
  current = null,
  defaultCurrent,
  enableReinitialize = true,
  handleSubmit,
}) => {
  if (!current && !defaultCurrent) {
    errorHandler('Either current or defaultCurrent must be provided');
  }

  const initialValues: UserRequest = current || (defaultCurrent as UserRequest);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
      validationSchema={Yup.object({
        first_name: Yup.string(),
        last_name: Yup.string(),
        username: Yup.string(),
        email: Yup.string()
          .email('Некоректна поштова скринька')
          .required("Поштова скринька обов'язкова"),
        position: Yup.string()
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        isSubmitting,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="first_name"
              >
                Ім'я
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
                <Field
                  type="text"
                  name="first_name"
                  id="first_name"
                  label="Enter your first name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                />
                {errors.first_name && touched.first_name ? (
                  <span className="--error">{errors.first_name}</span>
                ) : null}
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="last_name"
              >
                Прізвище
              </label>

              <Field
                type="text"
                id="last_name"
                label="Enter your last name"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              />
              {errors.last_name && touched.last_name ? (
                <span className="--error">{errors.last_name}</span>
              ) : null}
            </div>
          </div>

          {/*<div className="mb-5.5">*/}
          {/*  <label*/}
          {/*    className="mb-3 block text-sm font-medium text-black dark:text-white"*/}
          {/*    htmlFor="role_id"*/}
          {/*  >*/}
          {/*    Role*/}
          {/*  </label>*/}
          {/*  <Field*/}
          {/*    as="select"*/}
          {/*    name="role_id"*/}
          {/*    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}*/}
          {/*  >*/}
          {/*    {roles ? roles.map((role) => (*/}
          {/*      <option key={role.id} value={role.id}>*/}
          {/*        {role.name}*/}
          {/*      </option>*/}
          {/*    )) : [] }*/}
          {/*  </Field>*/}
          {/*</div>*/}

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="email"
            >
              Поштова скринька
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                      fill=""
                    />
                  </g>
                </svg>
              </span>
              <Field
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="email"
                name="email"
                id="email"
                label="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <span className="--error">{errors.email}</span>
              ) : null}
            </div>
          </div>

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="username"
            >
              Юзернейм
            </label>
            <Field
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="username"
              id="username"
              label="Enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username ? (
              <span className="--error">{errors.username}</span>
            ) : null}
          </div>

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="position"
            >
              Позиція
            </label>
            <Field
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="position"
              id="position"
              label="Enter your position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.position}
            />
            {errors.position && touched.position ? (
              <span className="--error">{errors.position}</span>
            ) : null}
          </div>

          <div className="flex justify-end gap-4.5">
            <NavLink
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              to="/"
            >
              Скасувати
            </NavLink>
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isSubmitting}
            >
              Зберегти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DefaultForm;
