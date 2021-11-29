import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post } from "src/models/post.model";

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { updatePosts } = postsSlice.actions;

export default postsSlice.reducer;
