import { useState } from 'react';
import { Form, Input, Button, Card, message, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/api/project';
import { CreateProjectRequest } from '@/types';
import { FileUploader } from '@/components/FileUploader';

const { TextArea } = Input;
const { Option } = Select;

export const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const request: CreateProjectRequest = {
        name: values.name,
        tags: values.tags,
        description: values.description,
        initialAttachment: file || undefined,
      };
      await createProject(request);
      message.success('项目创建成功');
      navigate('/projects');
    } catch (error) {
      message.error('项目创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="项目入库">
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: '100%' }}
        className="project-create-form"
      >
        <Form.Item
          name="name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item name="tags" label="项目标签">
          <Select mode="tags" placeholder="请输入标签，按回车添加" allowClear>
            <Option value="重点">重点</Option>
            <Option value="一般">一般</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="项目说明">
          <TextArea rows={4} placeholder="请输入项目说明" />
        </Form.Item>
        <Form.Item label="初始附件（可选）">
          <FileUploader onChange={setFile} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
            <Button onClick={() => navigate('/projects')}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
