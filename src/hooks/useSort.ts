import { useState } from 'react';

interface UseSortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

const useSort = (initialSortBy: string = '_id', initialSortOrder: 'asc' | 'desc' = 'asc'): UseSortOptions => {
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  return {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  };
};

export default useSort;
