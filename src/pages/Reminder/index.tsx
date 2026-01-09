import { useState, useEffect } from 'react';
import { Card, Table, Button, Tag, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getReminderProjects } from '@/api/reminder';
import { ReminderProject, ProjectStatus } from '@/types';
import { ProjectStatusTag } from '@/components/ProjectStatusTag';
import { useResponsive } from '@/hooks/useResponsive';

export const ReminderPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ReminderProject[]>([]);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useResponsive();

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const data = await getReminderProjects();
      setProjects(data);
    } catch (error) {
      console.error('获取提醒项目失败', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '当前状态',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
      render: (status: ProjectStatus) => <ProjectStatusTag status={status} />,
    },
    {
      title: '停留天数',
      dataIndex: 'daysInStatus',
      key: 'daysInStatus',
      render: (days: number) => (
        <Tag color={days > 30 ? 'red' : days > 15 ? 'orange' : 'default'}>
          {days} 天
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ReminderProject) => (
        <Button type="link" onClick={() => navigate(`/projects/${record.projectId}`)}>
          去项目
        </Button>
      ),
    },
  ];

  if (isMobile) {
    return (
      <Card title="月度提醒">
        <List
          loading={loading}
          dataSource={projects}
          renderItem={(project) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => navigate(`/projects/${project.projectId}`)}>
                  去项目
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={project.projectName}
                description={
                  <div>
                    <ProjectStatusTag status={project.currentStatus} />
                    <Tag
                      color={project.daysInStatus > 30 ? 'red' : project.daysInStatus > 15 ? 'orange' : 'default'}
                      style={{ marginLeft: 8 }}
                    >
                      {project.daysInStatus} 天
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }

  return (
    <Card title="月度提醒">
      <Table columns={columns} dataSource={projects} loading={loading} rowKey="projectId" scroll={{ x: 'max-content' }} />
    </Card>
  );
};
