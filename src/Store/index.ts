import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createBrowserHistory, History } from "history";

import reducers from "./main_reducer";

export const history: History = createBrowserHistory();


export const store = configureStore({
  reducer: reducers(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools:
    process.env.NODE_ENV !== "production" || process.env.PUBLIC_URL.length > 0,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
