import { AxiosResponse } from 'axios';

import { User } from '../shared/types';
import { axiosInstance } from '../shared/axios/axiosInstance';

const fetchUser = async (user: User | null): Promise<User | null> => {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User | null }> = await axiosInstance({
    url: `/users/${user.id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });
  return data.user;
};
