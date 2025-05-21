import { toast } from 'react-toastify';

  const acceptHandler = (error?: string | null): void => {
    const message = error && error.trim()
      ? error.trim()
      : 'Запис успішно створено!';

    toast.success(message, { position: "bottom-right" });
  };

export default acceptHandler;
