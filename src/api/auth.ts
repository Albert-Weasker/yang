import apiClient from './client';
import { LoginRequest, LoginResponse } from '@/types';
import { mockLogin, isMockMode } from '@/utils/mockAuth';

/**
 * 登录
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // 开发模式下使用模拟登录
  if (isMockMode()) {
    console.log('使用模拟登录模式');
    return mockLogin(data);
  }
  // 生产环境使用真实API
  console.log('使用真实API模式');
  try {
    return await apiClient.post<LoginResponse>('/auth/login', data);
  } catch (error: any) {
    // 如果 API 调用失败，在开发模式下提示使用模拟登录
    if (import.meta.env.DEV) {
      console.warn('API调用失败，建议启用模拟登录模式（设置 VITE_USE_MOCK=true）');
    }
    throw error;
  }
};

/**
 * 登出
 */
export const logout = () => {
  return apiClient.post('/auth/logout');
};
