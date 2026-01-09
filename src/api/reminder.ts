import apiClient from './client';
import { ReminderProject, ProjectStatus } from '@/types';
import { isMockMode } from '@/utils/mockAuth';

/**
 * 模拟获取提醒项目列表
 */
const mockGetReminderProjects = (): Promise<ReminderProject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          projectId: '1',
          projectName: '新能源产业园项目',
          currentStatus: ProjectStatus.REGISTER,
          daysInStatus: 35,
        },
        {
          projectId: '2',
          projectName: '智能制造基地项目',
          currentStatus: ProjectStatus.FUNDS,
          daysInStatus: 20,
        },
      ]);
    }, 300);
  });
};

/**
 * 获取提醒项目列表
 */
export const getReminderProjects = async (): Promise<ReminderProject[]> => {
  if (isMockMode()) {
    return mockGetReminderProjects();
  }
  const data = await apiClient.get<ReminderProject[]>('/reminder/projects');
  return Array.isArray(data) ? data : [];
};
