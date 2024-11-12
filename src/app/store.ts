import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postSlice"; // Импортируем редюсер

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer, // Добавляем редюсер для posts
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
