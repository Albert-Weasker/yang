import apiClient from './client';
import { User, UserRole, UserStatus } from '@/types';
import { isMockMode } from '@/utils/mockAuth';

/**
 * 模拟用户列表
 */
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  },
  {
    id: '2',
    username: 'user1',
    role: UserRole.NORMAL,
    status: UserStatus.ACTIVE,
  },
  {
    id: '3',
    username: 'user2',
    role: UserRole.NORMAL,
    status: UserStatus.ACTIVE,
  },
  {
    id: '4',
    username: 'user3',
    role: UserRole.NORMAL,
    status: UserStatus.DISABLED,
  },
];

/**
 * 模拟获取用户列表
 */
const mockGetUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]);
    }, 300);
  });
};

/**
 * 模拟更新用户状态
 */
const mockUpdateUserStatus = (userId: string, status: UserStatus): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        user.status = status;
        resolve({ ...user });
      } else {
        reject(new Error('用户不存在'));
      }
    }, 300);
  });
};

/**
 * 模拟更新用户角色
 */
const mockUpdateUserRole = (userId: string, role: UserRole): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        user.role = role;
        resolve({ ...user });
      } else {
        reject(new Error('用户不存在'));
      }
    }, 300);
  });
};

/**
 * 获取用户列表
 */
export const getUsers = async (): Promise<User[]> => {
  if (isMockMode()) {
    return mockGetUsers();
  }
  const data = await apiClient.get<User[]>('/admin/users');
  return Array.isArray(data) ? data : [];
};

/**
 * 更新用户状态
 */
export const updateUserStatus = async (userId: string, status: string): Promise<User> => {
  if (isMockMode()) {
    return mockUpdateUserStatus(userId, status as UserStatus);
  }
  const data = await apiClient.put<User>(`/admin/users/${userId}/status`, { status });
  return data as unknown as User;
};

/**
 * 更新用户角色
 */
export const updateUserRole = async (userId: string, role: string): Promise<User> => {
  if (isMockMode()) {
    return mockUpdateUserRole(userId, role as UserRole);
  }
  const data = await apiClient.put<User>(`/admin/users/${userId}/role`, { role });
  return data as unknown as User;
};
