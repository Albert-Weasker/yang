import { LoginRequest, LoginResponse, User, UserRole, UserStatus } from '@/types';

/**
 * 模拟用户数据（仅用于开发测试）
 */
const MOCK_USERS: Array<{
  username: string;
  password: string;
  user: User;
}> = [
  {
    username: 'admin',
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  },
  {
    username: 'user1',
    password: 'user123',
    user: {
      id: '2',
      username: 'user1',
      role: UserRole.NORMAL,
      status: UserStatus.ACTIVE,
    },
  },
  {
    username: 'user2',
    password: 'user123',
    user: {
      id: '3',
      username: 'user2',
      role: UserRole.NORMAL,
      status: UserStatus.ACTIVE,
    },
  },
];

/**
 * 模拟登录（仅用于开发测试）
 */
export const mockLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (user) {
        const token = `mock_token_${user.user.id}_${Date.now()}`;
        resolve({
          token,
          user: user.user,
        });
      } else {
        reject(new Error('用户名或密码错误'));
      }
    }, 500); // 模拟500ms延迟
  });
};

/**
 * 是否启用模拟登录（开发模式）
 * 默认在开发模式下启用，除非明确设置为 false
 */
export const isMockMode = (): boolean => {
  // 开发模式下，如果没有设置 VITE_USE_MOCK 或设置为 'true'，则启用模拟
  if (import.meta.env.DEV) {
    const useMock = import.meta.env.VITE_USE_MOCK;
    return useMock !== 'false'; // 默认启用，除非明确设置为 false
  }
  return false;
};
