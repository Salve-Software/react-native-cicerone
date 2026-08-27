import type { ICiceroneStorage } from '@/types';

/** Without real storage the tour returns every boot; plug MMKV in production. */
export const createMemoryStorage = (): ICiceroneStorage => {
  const map = new Map<string, string>();

  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
};
