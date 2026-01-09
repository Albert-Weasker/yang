import { useState, useEffect } from 'react';
import { Button, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '@/api/project';
import { Project, ProjectStatus } from '@/types';
import { ProjectTable } from '@/components/ProjectTable';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      // 确保 data 是数组
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('获取项目列表失败', error);
      setProjects([]); // 出错时设置为空数组
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Card
      title="项目列表"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/projects/create')}
          size="middle"
        >
          新建项目
        </Button>
      }
    >
      <ProjectTable projects={projects} loading={loading} />
    </Card>
  );
};
