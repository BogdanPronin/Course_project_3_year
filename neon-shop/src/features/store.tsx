// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import favoriteSlice from "./slices/favoriteSlice";
import searchSlice from "./slices/searchSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    carts: cartSlice,
    favorites: favoriteSlice,
    search: searchSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    carts: store.getState().carts,
    favorites: store.getState().favorites,
    // Здесь можно добавить любые другие части состояния, которые нужно сохранять
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
