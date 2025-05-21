import { useState } from 'react';

type ConfirmDeleteProps<T> = {
  onDelete: (payload: T) => Promise<void>;
};

export default function useConfirmDelete<T>({ onDelete }: ConfirmDeleteProps<T>) {
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const confirm = (item: T) => setItemToDelete(item);
  const cancel = () => setItemToDelete(null);

  const perform = async () => {
    if (!itemToDelete) return;
    await onDelete(itemToDelete);
    setItemToDelete(null);
  };

  const modal = itemToDelete ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-boxdark p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Видалити запис?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Ви впевнені, що хочете видалити цей запис?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={cancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Ні
          </button>
          <button
            onClick={perform}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Так
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, modal };
}
