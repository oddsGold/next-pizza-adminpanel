import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserRequest, UserAdminResponse } from '../../redux/users/userInfo.type.ts';
import errorHandler from '../../utils/errorHandler.ts';
import { NavLink } from 'react-router-dom';

interface DefaultFormProps {
  current?: UserAdminResponse;
  defaultCurrent?: UserRequest;
  enableReinitialize?: boolean;
  handleSubmit: (values: UserAdminResponse) => void;
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

  const initialValues: UserAdminResponse =
    current || (defaultCurrent as UserAdminResponse);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is a required field'),
        email: Yup.string()
          .email('Некоректна поштова скринька')
          .required("Email is a required field"),
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form>
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
              htmlFor="name"
            >
              Юзернейм
            </label>
            <Field
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              label="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <span className="--error">{errors.name}</span>
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
              className="flex justify-center rounded border border-stroke dark:border-strokedark bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-transparent"
              type="submit"
              disabled={isSubmitting || !isValid}
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
