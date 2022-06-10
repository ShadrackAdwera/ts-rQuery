import axios, { AxiosRequestConfig } from 'axios';

import { baseUrl } from './constants';
import { User } from '../types';

export const getJwtHeaders = ({ token }: User): Record<string, string> => {
  return { Authorization: `Bearer ${token}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
