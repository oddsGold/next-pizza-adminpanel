import React, { useEffect, useRef, useState } from 'react';
import {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form';

interface Option {
  _id: string;
  name: string;
  label: string;
}

type MultiSelectProps = {
  name: string;
  id: string;
  options: Option[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
  required?: boolean;
  isLoading?: boolean;
  label: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  id,
  label,
  options,
  register,
  setValue,
  watch,
  errors,
  isLoading = false,
  required = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const error = errors[name] as FieldError | undefined;

  const selectedValues: string[] = watch(name) || [];

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setValue(name, newValues, { shouldValidate: true });
  };

  const removeValue = (value: string) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setValue(name, newValues, { shouldValidate: true });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 w-full">
      <label
        htmlFor={id}
        className="mb-3 block text-sm font-medium text-black dark:text-white"
      >
        {label}
      </label>

      <input
        type="hidden"
        {...register(name, { required: required && `Поле є обов'язковим` })}
        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />

      <div className="relative z-20">
        {isLoading ? (
          <div className="text-center py-3">Loading options...</div>
        ) : (
          <>
            <div
              ref={triggerRef}
              onClick={() => setShow(!show)}
              className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input cursor-pointer"
            >
              <div className="flex flex-auto flex-wrap gap-3">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const option = options.find((o) => o._id === val);
                    if (!option) return null;
                    return (
                      <div
                        key={val}
                        className="my-1.5 flex items-center justify-center rounded border-[0.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">
                          {option.label}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeValue(val);
                            }}
                            className="cursor-pointer pl-2 hover:text-danger"
                            aria-label={`Remove ${option.label}`}
                          >
                            <svg
                              className="fill-current"
                              role="img"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1">
                    <input
                      readOnly
                      placeholder="Select options"
                      className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="flex w-8 items-center py-1 pl-1 pr-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform duration-200 ${
                    show ? 'rotate-180' : ''
                  }`}
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            {show && (
              <div
                ref={dropdownRef}
                className="max-h-60 absolute top-full left-0 z-40 w-full overflow-y-auto rounded border border-stroke bg-white shadow dark:border-form-strokedark dark:bg-form-input"
              >
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option._id);
                  return (
                    <div
                      key={option._id}
                      onClick={() => toggleOption(option._id)}
                      className={`cursor-pointer border-b border-stroke p-2 text-sm text-black dark:border-form-strokedark dark:text-white ${
                        isSelected ? 'bg-gray dark:bg-form-strokedark' : ''
                      } hover:bg-primary/10 dark:hover:bg-primary/20`}
                    >
                      {option.label}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
