import { Table, Button, Card, List, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectStatus } from '@/types';
import { ProjectStatusTag } from '../ProjectStatusTag';
import { useResponsive } from '@/hooks/useResponsive';
import dayjs from 'dayjs';

interface ProjectTableProps {
  projects: Project[];
  loading?: boolean;
  onStatusFilter?: (status: ProjectStatus | 'all') => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  loading = false,
  onStatusFilter,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ProjectStatus) => <ProjectStatusTag status={status} />,
      filters: [
        { text: '全部', value: 'all' },
        { text: ProjectStatus.REGISTER, value: ProjectStatus.REGISTER },
        { text: ProjectStatus.FUNDS, value: ProjectStatus.FUNDS },
        { text: ProjectStatus.START, value: ProjectStatus.START },
        { text: ProjectStatus.PRODUCE, value: ProjectStatus.PRODUCE },
      ],
      onFilter: (value: string | number | boolean, record: Project) => {
        if (value === 'all') return true;
        return record.status === value;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '最近更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Project) => (
        <Button type="link" onClick={() => navigate(`/projects/${record.id}`)}>
          查看
        </Button>
      ),
    },
  ];

  // 移动端使用卡片列表
  if (isMobile) {
    return (
      <List
        loading={loading}
        dataSource={projects}
        renderItem={(project) => (
          <List.Item>
            <Card
              style={{ width: '100%' }}
              actions={[
                <Button type="link" onClick={() => navigate(`/projects/${project.id}`)}>
                  查看详情
                </Button>,
              ]}
            >
              <Card.Meta
                title={
                  <Space>
                    <span>{project.name}</span>
                    <ProjectStatusTag status={project.status} />
                  </Space>
                }
                description={
                  <div>
                    <div>创建时间：{dayjs(project.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                    <div>更新时间：{dayjs(project.updatedAt).format('YYYY-MM-DD HH:mm')}</div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }

  // 桌面端使用表格
  return <Table columns={columns} dataSource={projects} loading={loading} rowKey="id" scroll={{ x: 'max-content' }} />;
};
