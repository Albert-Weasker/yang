import axios from 'axios';
import { getToken, removeToken, removeUser } from '@/utils/auth';
import { API_BASE_URL } from '@/utils/constants';
import { message } from 'antd';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器：添加 Token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理错误
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期或无效
      removeToken();
      removeUser();
      message.error('登录已过期，请重新登录');
      window.location.href = '/login';
    } else {
      message.error(error.response?.data?.message || '请求失败，请稍后重试');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
