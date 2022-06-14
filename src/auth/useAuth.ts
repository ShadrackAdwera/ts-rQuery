import { AxiosResponse } from 'axios';

import { axiosInstance } from '../shared/axios/axiosInstance';
import { Roles, User, NewUser } from '../shared/types';
import { useCustomToast } from '../hooks/useCustomToast';
import { useUser } from '../hooks/useUser';

interface IUseAuth {
  signUp: (
    username: string,
    email: string,
    role: Roles,
    password: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

type UserResponseType = { user: User };
type ErrorResponseType = { message: string };
type AuthResponseType = UserResponseType | ErrorResponseType;

export const useAuth = (): IUseAuth => {
  const toast = useCustomToast();
  const { updateUser, clearUser } = useUser();
  const apiAuthCall = async (
    endpoint: string,
    email: string,
    password: string,
    username?: string,
    role?: Roles
  ): Promise<void> => {
    let authData: NewUser | { email: string; password: string } = {
      email,
      password,
    };
    if (endpoint === '/sign-up') {
      authData = { email, password, username, role };
    }
    const { data, status }: AxiosResponse<AuthResponseType> =
      await axiosInstance({
        url: endpoint,
        method: 'POST',
        data: authData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (status === 400) {
      const title =
        'message' in data ? data.message : 'An error occured, try again';
      toast({
        title,
        status: 'error',
      });
      return;
    }
    if ('user' in data && 'token' in data.user) {
      updateUser(data.user);
      toast({
        title: `Signed in as ${username}`,
        status: 'success',
      });
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    await apiAuthCall('/login', email, password);
  };
  const signUp = async (
    username: string,
    email: string,
    role: Roles,
    password: string
  ): Promise<void> => {
    await apiAuthCall('/sign-up', email, password, username, role);
  };
  const signOut = () => {
    clearUser();
  };
  return { signIn, signUp, signOut };
};
