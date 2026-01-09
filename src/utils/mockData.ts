import { Project, ProjectStatus, ProjectAttachment } from '@/types';
import { getUser } from './auth';

/**
 * 模拟项目数据（仅用于开发测试）
 */
export const mockProjects: Project[] = [
  {
    id: '1',
    name: '新能源产业园项目',
    status: ProjectStatus.REGISTER,
    tags: ['重点', '新能源'],
    description: '建设新能源产业园，总投资50亿元',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    createdBy: 'user1',
    lastOperator: 'user1',
    attachments: [
      {
        id: 'att1',
        fileName: '注册证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.REGISTER,
        uploadedBy: 'user1',
        uploadedAt: '2024-01-20T14:30:00Z',
      },
    ],
  },
  {
    id: '2',
    name: '智能制造基地项目',
    status: ProjectStatus.FUNDS,
    tags: ['重点'],
    description: '智能制造产业基地建设',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    createdBy: 'user1',
    lastOperator: 'admin',
    attachments: [
      {
        id: 'att2',
        fileName: '注册证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.REGISTER,
        uploadedBy: 'user1',
        uploadedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: 'att3',
        fileName: '到资证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.FUNDS,
        uploadedBy: 'admin',
        uploadedAt: '2024-01-25T16:00:00Z',
      },
    ],
  },
  {
    id: '3',
    name: '科技孵化器项目',
    status: ProjectStatus.START,
    tags: ['一般'],
    description: '科技企业孵化器建设',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-28T11:00:00Z',
    createdBy: 'user2',
    lastOperator: 'user2',
    attachments: [
      {
        id: 'att4',
        fileName: '注册证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.REGISTER,
        uploadedBy: 'user2',
        uploadedAt: '2024-01-10T09:00:00Z',
      },
      {
        id: 'att5',
        fileName: '到资证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.FUNDS,
        uploadedBy: 'user2',
        uploadedAt: '2024-01-20T14:00:00Z',
      },
      {
        id: 'att6',
        fileName: '开工证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.START,
        uploadedBy: 'user2',
        uploadedAt: '2024-01-28T11:00:00Z',
      },
    ],
  },
  {
    id: '4',
    name: '物流中心项目',
    status: ProjectStatus.PRODUCE,
    tags: ['一般'],
    description: '现代化物流中心建设',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2024-02-01T15:00:00Z',
    createdBy: 'admin',
    lastOperator: 'admin',
    attachments: [
      {
        id: 'att7',
        fileName: '注册证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.REGISTER,
        uploadedBy: 'admin',
        uploadedAt: '2023-12-25T10:00:00Z',
      },
      {
        id: 'att8',
        fileName: '到资证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.FUNDS,
        uploadedBy: 'admin',
        uploadedAt: '2024-01-05T14:00:00Z',
      },
      {
        id: 'att9',
        fileName: '开工证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.START,
        uploadedBy: 'admin',
        uploadedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: 'att10',
        fileName: '投产证明.pdf',
        fileUrl: '#',
        type: ProjectStatus.PRODUCE,
        uploadedBy: 'admin',
        uploadedAt: '2024-02-01T15:00:00Z',
      },
    ],
  },
];

/**
 * 模拟获取项目列表
 */
export const mockGetProjects = (params?: { status?: string }): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let projects = [...mockProjects];
      
      // 如果指定了状态筛选
      if (params?.status && params.status !== 'all') {
        projects = projects.filter((p) => p.status === params.status);
      }
      
      resolve(projects);
    }, 300);
  });
};

/**
 * 模拟获取项目详情
 */
export const mockGetProject = (id: string): Promise<Project> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === id);
      if (project) {
        resolve({ ...project });
      } else {
        reject(new Error('项目不存在'));
      }
    }, 300);
  });
};

/**
 * 模拟创建项目
 */
export const mockCreateProject = (data: {
  name: string;
  tags?: string[];
  description?: string;
  initialAttachment?: File;
}): Promise<Project> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject: Project = {
        id: String(mockProjects.length + 1),
        name: data.name,
        status: ProjectStatus.REGISTER,
        tags: data.tags || [],
        description: data.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: getUser()?.username || 'system',
        attachments: data.initialAttachment
          ? [
              {
                id: 'att_new',
                fileName: data.initialAttachment.name,
                fileUrl: '#',
                type: ProjectStatus.REGISTER,
                uploadedBy: getUser()?.username || 'system',
                uploadedAt: new Date().toISOString(),
              },
            ]
          : [],
      };
      mockProjects.unshift(newProject); // 添加到列表开头
      resolve(newProject);
    }, 500);
  });
};

/**
 * 模拟更新项目状态
 */
export const mockUpdateProjectStatus = (data: {
  projectId: string;
  status: ProjectStatus;
  attachment: File;
}): Promise<Project> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === data.projectId);
      if (project) {
        project.status = data.status;
        project.updatedAt = new Date().toISOString();
        project.lastOperator = getUser()?.username || 'system';
        
        // 添加附件
        const newAttachment: ProjectAttachment = {
          id: `att_${Date.now()}`,
          fileName: data.attachment.name,
          fileUrl: '#',
          type: data.status,
          uploadedBy: getUser()?.username || 'system',
          uploadedAt: new Date().toISOString(),
        };
        project.attachments.push(newAttachment);
        
        resolve({ ...project });
      } else {
        reject(new Error('项目不存在'));
      }
    }, 500);
  });
};
