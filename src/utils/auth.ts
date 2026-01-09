import { User, UserRole } from '@/types';
import { STORAGE_KEYS } from './constants';

/**
 * 获取存储的 Token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * 设置 Token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * 清除 Token
 */
export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

/**
 * 获取用户信息
 */
export const getUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * 设置用户信息
 */
export const setUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * 清除用户信息
 */
export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * 检查是否已登录
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * 检查是否为管理员
 */
export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === UserRole.ADMIN;
};

/**
 * 登出
 */
export const logout = (): void => {
  removeToken();
  removeUser();
};
