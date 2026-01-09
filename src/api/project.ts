import apiClient from './client';
import { Project, CreateProjectRequest, UpdateProjectStatusRequest } from '@/types';
import { isMockMode } from '@/utils/mockAuth';
import {
  mockGetProjects,
  mockGetProject,
  mockCreateProject,
  mockUpdateProjectStatus,
} from '@/utils/mockData';

/**
 * 获取项目列表
 */
export const getProjects = async (params?: { status?: string }): Promise<Project[]> => {
  if (isMockMode()) {
    return mockGetProjects(params);
  }
  const data = await apiClient.get<Project[]>('/projects', { params });
  // 确保返回的是数组
  return Array.isArray(data) ? data : [];
};

/**
 * 获取项目详情
 */
export const getProject = async (id: string): Promise<Project> => {
  if (isMockMode()) {
    return mockGetProject(id);
  }
  const data = await apiClient.get<Project>(`/projects/${id}`);
  return data as unknown as Project;
};

/**
 * 创建项目
 */
export const createProject = async (data: CreateProjectRequest): Promise<Project> => {
  if (isMockMode()) {
    return mockCreateProject(data);
  }
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.tags) {
    formData.append('tags', JSON.stringify(data.tags));
  }
  if (data.description) {
    formData.append('description', data.description);
  }
  if (data.initialAttachment) {
    formData.append('attachment', data.initialAttachment);
  }
  const result = await apiClient.post<Project>('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result as unknown as Project;
};

/**
 * 更新项目状态
 */
export const updateProjectStatus = async (
  data: UpdateProjectStatusRequest
): Promise<Project> => {
  if (isMockMode()) {
    return mockUpdateProjectStatus(data);
  }
  const formData = new FormData();
  formData.append('status', data.status);
  formData.append('attachment', data.attachment);
  const result = await apiClient.put<Project>(`/projects/${data.projectId}/status`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result as unknown as Project;
};
