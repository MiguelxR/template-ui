import type { Character } from "../models/profile.model";
import axiosInstance from "../interceptors/axios.instance";

const userValue = "user";

export const getMorty = (signal?: AbortSignal): Promise<Character> => {
  return axiosInstance
    .get<Character>("/character/2", { signal })
    .then((res) => res.data);
};

// Nueva función que retorna una Promise y acepta signal
export const getUserData = (signal?: AbortSignal): Promise<Character> => {
  return axiosInstance
    .get<Character>("/character/2", { signal })
    .then((res) => res.data);
};

const promiseCache = new Map<string, Promise<Character>>();

export const getCachedUser = (signal?: AbortSignal): Promise<Character> => {
  if (!promiseCache.has(userValue)) {
    promiseCache.set(userValue, getUserData(signal));
  }
  return promiseCache.get(userValue)!; // El ! indica que sabemos que existe
};

// Función para limpiar el cache si necesitas refetch
export const clearUserCache = () => {
  promiseCache.delete(userValue);
};
