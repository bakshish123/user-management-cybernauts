import axios from 'axios';
import { User, CreateUserDTO, UpdateUserDTO } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  getAllUsers: () => api.get<User[]>('/users'),
  getUserById: (id: string) => api.get<User>(`/users/${id}`),
  createUser: (data: CreateUserDTO) => api.post<User>('/users', data),
  updateUser: (id: string, data: UpdateUserDTO) => api.put<User>(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};