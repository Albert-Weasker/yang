import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Table, Button, Space, message, List } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { getProject, updateProjectStatus } from '@/api/project';
import { Project, ProjectStatus, ProjectAttachment } from '@/types';
import { ProjectStatusTag } from '@/components/ProjectStatusTag';
import { StatusActionCard } from '@/components/StatusActionCard';
import { PROJECT_STATUS_FLOW } from '@/utils/constants';
import { useResponsive } from '@/hooks/useResponsive';
import dayjs from 'dayjs';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { isMobile } = useResponsive();

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getProject(id);
      setProject(data);
    } catch (error) {
      message.error('获取项目详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleStatusUpdate = async (status: ProjectStatus, file: File) => {
    if (!id) return;
    setUpdating(true);
    try {
      await updateProjectStatus({ projectId: id, status, attachment: file });
      await fetchProject(); // 刷新项目信息
    } catch (error) {
      throw error; // 让 StatusActionCard 处理错误
    } finally {
      setUpdating(false);
    }
  };

  const getNextStatus = (currentStatus: ProjectStatus): ProjectStatus | null => {
    const currentIndex = PROJECT_STATUS_FLOW.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === PROJECT_STATUS_FLOW.length - 1) {
      return null; // 已经是最后状态
    }
    return PROJECT_STATUS_FLOW[currentIndex + 1];
  };

  if (loading || !project) {
    return <div>加载中...</div>;
  }

  const nextStatus = getNextStatus(project.status);

  const attachmentColumns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: ProjectStatus) => <ProjectStatusTag status={type} />,
    },
    {
      title: '上传人',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ProjectAttachment) => (
        <Button
          type="link"
          icon={<DownloadOutlined />}
          onClick={() => window.open(record.fileUrl)}
        >
          下载
        </Button>
      ),
    },
  ];

  // 移动端附件列表
  const renderMobileAttachments = () => {
    if (!project?.attachments.length) {
      return <div style={{ padding: 16, textAlign: 'center', color: '#999' }}>暂无附件</div>;
    }
    return (
      <List
        dataSource={project.attachments}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => window.open(item.fileUrl)}
              >
                下载
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.fileName}
              description={
                <Space>
                  <ProjectStatusTag status={item.type} />
                  <span>{item.uploadedBy}</span>
                  <span>{dayjs(item.uploadedAt).format('YYYY-MM-DD HH:mm')}</span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/projects')}>
            返回列表
          </Button>
        </Space>

        <Descriptions
          title="项目基础信息"
          bordered
          style={{ marginBottom: 24 }}
          column={isMobile ? 1 : 2}
        >
          <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
          <Descriptions.Item label="当前状态">
            <ProjectStatusTag status={project.status} />
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {dayjs(project.createdAt).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="最近操作人">{project.lastOperator || '-'}</Descriptions.Item>
          {project.description && (
            <Descriptions.Item label="项目说明" span={isMobile ? 1 : 2}>
              {project.description}
            </Descriptions.Item>
          )}
        </Descriptions>

        {nextStatus && (
          <StatusActionCard
            currentStatus={project.status}
            nextStatus={nextStatus}
            onStatusUpdate={handleStatusUpdate}
            loading={updating}
          />
        )}

        <Card title="项目附件管理" style={{ marginTop: 24 }}>
          {isMobile ? (
            renderMobileAttachments()
          ) : (
            <Table
              columns={attachmentColumns}
              dataSource={project.attachments}
              rowKey="id"
              pagination={false}
            />
          )}
        </Card>
      </Card>
    </div>
  );
};
