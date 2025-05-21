import React from 'react';
import { FieldError, UseFormRegister, FieldErrors } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const InputField: React.FC<InputFieldProps> = ({
                                                 label,
                                                 name,
                                                 placeholder,
                                                 type = 'text',
                                                 required = false,
                                                 register,
                                                 errors
                                               }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black dark:text-white">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...register(name, { required: required && `${label} є обов'язковим` })}
      type={type}
      placeholder={placeholder}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    {errors[name] && typeof errors[name] !== 'string' && (
      <span className="text-red-500">{(errors[name] as FieldError).message}</span>
    )}
  </div>
);

export default InputField;
