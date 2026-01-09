import { Tag } from 'antd';
import { ProjectStatus } from '@/types';

interface ProjectStatusTagProps {
  status: ProjectStatus;
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.REGISTER]: 'blue',
  [ProjectStatus.FUNDS]: 'green',
  [ProjectStatus.START]: 'orange',
  [ProjectStatus.PRODUCE]: 'purple',
};

export const ProjectStatusTag: React.FC<ProjectStatusTagProps> = ({ status }) => {
  return <Tag color={STATUS_COLORS[status]}>{status}</Tag>;
};
