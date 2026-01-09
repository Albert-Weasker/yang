/**
 * 项目状态枚举（前后端统一）
 */
export enum ProjectStatus {
  REGISTER = '注册',
  FUNDS = '到资',
  START = '开工',
  PRODUCE = '投产',
}

/**
 * 用户角色枚举
 */
export enum UserRole {
  NORMAL = '普通政府用户',
  ADMIN = '管理员',
}

/**
 * 用户状态
 */
export enum UserStatus {
  ACTIVE = '启用',
  DISABLED = '禁用',
}

/**
 * 项目信息
 */
export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  tags?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastOperator?: string;
  attachments: ProjectAttachment[];
}

/**
 * 项目附件
 */
export interface ProjectAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  type: ProjectStatus;
  uploadedBy: string;
  uploadedAt: string;
}

/**
 * 用户信息
 */
export interface User {
  id: string;
  username: string;
  role: UserRole;
  status: UserStatus;
}

/**
 * 登录请求
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * 创建项目请求
 */
export interface CreateProjectRequest {
  name: string;
  tags?: string[];
  description?: string;
  initialAttachment?: File;
}

/**
 * 更新项目状态请求
 */
export interface UpdateProjectStatusRequest {
  projectId: string;
  status: ProjectStatus;
  attachment: File;
}

/**
 * 提醒项目信息
 */
export interface ReminderProject {
  projectId: string;
  projectName: string;
  currentStatus: ProjectStatus;
  daysInStatus: number;
}
