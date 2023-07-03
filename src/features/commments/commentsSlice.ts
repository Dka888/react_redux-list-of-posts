/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  error: null,
};

export const fetchComments = createAsyncThunk('comments',
  async (postId: number) => {
    try {
      const dataComments = await getPostComments(postId);

      return dataComments;
    } catch (error) {
      throw new Error('Failed to fetch comments.');
    }
  });

export const addCommentApi = createAsyncThunk('new_comment',
  async (comment: Omit<Comment, 'id'>) => {
    try {
      createComment(comment);
    } catch (error) {
      throw new Error('Failed to create new comment');
    }
  });

export const deleteCommentApi = createAsyncThunk('delete_comment',
  async (commentId: number) => {
    try {
      deleteComment(commentId);
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loaded = false;
        state.error = action.error.message ?? 'no posts';
      });
  },
});

export default commentsSlice.reducer;
