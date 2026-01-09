import apiClient from './client';
import { LoginRequest, LoginResponse } from '@/types';
import { mockLogin, isMockMode } from '@/utils/mockAuth';

/**
 * 登录
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // 如果启用了模拟模式，直接使用模拟登录
  if (isMockMode()) {
    console.log('使用模拟登录模式');
    return mockLogin(data);
  }
  
  // 尝试使用真实API
  console.log('使用真实API模式');
  try {
    const result = await apiClient.post<LoginResponse>('/auth/login', data);
    return result as unknown as LoginResponse;
  } catch (error: any) {
    // 如果 API 调用失败（404或其他错误），自动降级到模拟登录
    console.warn('API调用失败，自动切换到模拟登录模式');
    console.warn('如需使用真实API，请确保后端服务正常运行');
    console.warn('如需强制使用模拟登录，请设置环境变量 VITE_USE_MOCK=true');
    
    // 自动降级到模拟登录
    return mockLogin(data);
  }
};

/**
 * 登出
 */
export const logout = () => {
  return apiClient.post('/auth/logout');
};
