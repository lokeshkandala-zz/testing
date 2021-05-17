import { MOCK_DATA } from "./mock.data";

export const setItemInLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getItemFromLocalStorage = (key) => {
  console.log("keeee", key);

  const item = window.localStorage.getItem(key);
  if (key === "mock_data" && !item) {
    setItemInLocalStorage(key, MOCK_DATA);
    return MOCK_DATA;
  }
  return item ? JSON.parse(item) : null;
};
