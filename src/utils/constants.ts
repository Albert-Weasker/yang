import { ProjectStatus } from '@/types';

/**
 * 项目状态流转顺序（死规则）
 */
export const PROJECT_STATUS_FLOW: ProjectStatus[] = [
  ProjectStatus.REGISTER,
  ProjectStatus.FUNDS,
  ProjectStatus.START,
  ProjectStatus.PRODUCE,
];

/**
 * 状态对应的操作按钮文本
 */
export const STATUS_ACTION_TEXT: Record<ProjectStatus, string> = {
  [ProjectStatus.REGISTER]: '上传注册证明',
  [ProjectStatus.FUNDS]: '上传到资证明',
  [ProjectStatus.START]: '上传开工证明',
  [ProjectStatus.PRODUCE]: '上传投产证明',
};

/**
 * 状态对应的附件类型文本
 */
export const STATUS_ATTACHMENT_TEXT: Record<ProjectStatus, string> = {
  [ProjectStatus.REGISTER]: '注册证明附件',
  [ProjectStatus.FUNDS]: '到资证明附件',
  [ProjectStatus.START]: '开工证明附件',
  [ProjectStatus.PRODUCE]: '投产证明附件',
};

/**
 * API 基础路径
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 本地存储 Key
 */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_info',
} as const;
