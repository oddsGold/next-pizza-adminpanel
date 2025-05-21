import React from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';

interface Option {
  _id: string;
  name: string;
  label: string;
}

type Props = {
  name: string;
  label: string;
  span?: string;
  options: Option[];
  isLoading?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const SelectGroupOneMenu: React.FC<Props> = ({
                                               name,
                                               label,
                                               span = "",
                                               options,
                                               isLoading = false,
                                               required = false,
                                               register,
                                               errors,
                                             }) => {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {span && <span className="text-[10px]">{span}</span>}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        {isLoading ? (
          <div className="text-center py-3">Loading options...</div>
        ) : (
          <select
            {...register(name, { required: required && `Поле є обов'язковим` })}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="" className="text-body dark:text-bodydark">
              Select
            </option>
            {options.map((option) => (
              <option
                key={option._id}
                value={option._id}
                className="text-body dark:text-bodydark"
              >
                {option.label}
              </option>
            ))}
          </select>
        )}

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SelectGroupOneMenu;
