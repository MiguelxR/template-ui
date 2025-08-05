import type { Character } from "../models/profile.model";

const userValue = "user";

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://rickandmortyapi.com/api";
const charactersUrl = `${baseUrl}/character`;

export const getMorty = (): Promise<Character> => {
  return fetch(`${charactersUrl}/2`).then((res) => res.json());
};

// Nueva función que retorna una Promise
export const getUserData = (): Promise<Character> => {
  return fetch(`${charactersUrl}/2`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
};

const promiseCache = new Map<string, Promise<Character>>();

export const getCachedUser = (): Promise<Character> => {
  if (!promiseCache.has(userValue)) {
    promiseCache.set(userValue, getUserData());
  }
  return promiseCache.get(userValue)!; // El ! indica que sabemos que existe
};

// Función para limpiar el cache si necesitas refetch
export const clearUserCache = () => {
  promiseCache.delete(userValue);
};
