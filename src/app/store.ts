import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import author from '../features/author/authorSlice';
import post from '../features/selectedPost/postSlice';
import comments from '../features/commments/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    author,
    post,
    comments,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
