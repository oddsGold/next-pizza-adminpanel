import { toast } from 'react-toastify';

const errorHandler = (error?: string | null): void => {
  const message = error && error.trim()
    ? error.trim()
    : 'Щось пішло не так. Повторіть спробу пізніше';

  toast.error(message, { position: "bottom-right" });
};

export default errorHandler;
