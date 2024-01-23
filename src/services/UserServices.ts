import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/IUser';

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://65afd3662f26c3f2139bd7a8.mockapi.io/api/v1/' }),
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
        query: () => ({
            url: `/users`,
        }),    
    }),

    createUser: build.mutation<IUser, IUser>({
        query: (user) => ({
            url: `/users`,
            method: 'POST',
            body: user
        }),
    }),
  }),
});

