import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import { User, Roles } from '../shared/types';
import { queryKeys } from '../shared/queryKeys';
import { axiosInstance } from '../shared/axios/axiosInstance';

async function fetchUser(
  user: User | null,
  signal: AbortSignal | undefined
): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      signal,
    }
  );
  return data.user;
}

interface IUseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export const useUser = (): IUseUser => {
  const queryClient = useQueryClient();
  const user = null;
  //const { data: user } = useQuery(queryKeys.USER, ({ signal })=>fetchUser(user, signal))

  //called from useAuth
  const updateUser = (updatedUser: User) => {
    queryClient.setQueryData(queryKeys.USER, updatedUser);
  };

  //invalidate queries - called from userAuth
  const clearUser = () => {
    queryClient.setQueryData(queryKeys.USER, null);
  };

  return { user, updateUser, clearUser };
};
