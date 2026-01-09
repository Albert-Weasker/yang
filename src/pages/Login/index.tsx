import { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/auth';
import { setToken, setUser } from '@/utils/auth';
import { LoginRequest } from '@/types';
import { isMockMode } from '@/utils/mockAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mockMode = isMockMode();
  
  // 开发模式下显示调试信息
  if (import.meta.env.DEV) {
    console.log('当前登录模式:', mockMode ? '模拟登录' : '真实API');
  }

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await login(values);
      setToken(response.token);
      setUser(response.user);
      message.success('登录成功');
      navigate('/projects');
    } catch (error: any) {
      const errorMessage = error?.message || error?.response?.data?.message || '登录失败，请检查用户名和密码';
      console.error('登录错误:', error);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '16px',
      }}
    >
      <Card
        title="项目管理系统 - 政府端登录"
        style={{
          width: '100%',
          maxWidth: 400,
        }}
      >
        {mockMode && (
          <Alert
            message="测试账号（模拟登录模式）"
            description={
              <div>
                <div><strong>管理员：</strong>admin / admin123</div>
                <div><strong>普通用户：</strong>user1 / user123</div>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        {!mockMode && import.meta.env.DEV && (
          <Alert
            message="提示"
            description="当前使用真实API模式。如需使用测试账号，请在 .env 文件中设置 VITE_USE_MOCK=true（或删除该变量，开发模式默认启用模拟）"
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
