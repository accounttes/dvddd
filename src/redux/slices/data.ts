import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import randomInteger from '../../utils/randomInteger';
import { IResult } from '../types/data';

export interface DataState {
  result: Array<IResult>;
}

const initialState: DataState = {
  result: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Array<any>>) => {
      console.log('action', action);
      const posts = action.payload[0];
      const users = action.payload[1];
      const photos = action.payload[2];

      const newPhotos = photos.reduce((acc: any, curr: any) => {
        acc[curr.albumId] ?? (acc[curr.albumId] = []);

        acc[curr.albumId].push(curr);
        return acc;
      }, {});

      const newPosts = posts.reduce((acc: any, post: any) => {
        const currUser = users.filter((user: any) => post.userId === user.id)[0];

        const randomIdPhoto = randomInteger(0, 49);

        post['username'] = currUser.username;
        post['company'] = currUser.company.name;
        post['photo'] = newPhotos[currUser.id][randomIdPhoto].url;

        acc.push(post);
        return acc;
      }, []);

      console.log('newPosts', newPosts);

      state.result = [...state.result, ...newPosts];
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
