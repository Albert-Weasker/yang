import { useState, useEffect } from 'react';
import { Card, Table, Button, Tag, message, Popconfirm, Select, Space, List } from 'antd';
import { getUsers, updateUserStatus, updateUserRole } from '@/api/admin';
import { User, UserRole, UserStatus } from '@/types';
import { useResponsive } from '@/hooks/useResponsive';

const { Option } = Select;

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useResponsive();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: string, status: UserStatus) => {
    try {
      await updateUserStatus(userId, status);
      message.success('状态更新成功');
      fetchUsers();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const handleRoleChange = async (userId: string, role: UserRole) => {
    try {
      await updateUserRole(userId, role);
      message.success('角色更新成功');
      fetchUsers();
    } catch (error) {
      message.error('角色更新失败');
    }
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole, record: User) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(record.id, value)}
          style={{ width: 150 }}
        >
          <Option value={UserRole.NORMAL}>{UserRole.NORMAL}</Option>
          <Option value={UserRole.ADMIN}>{UserRole.ADMIN}</Option>
        </Select>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => (
        <Tag color={status === UserStatus.ACTIVE ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space>
          {record.status === UserStatus.ACTIVE ? (
            <Popconfirm
              title="确定要禁用该用户吗？"
              onConfirm={() => handleStatusChange(record.id, UserStatus.DISABLED)}
            >
              <Button danger>禁用</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="确定要启用该用户吗？"
              onConfirm={() => handleStatusChange(record.id, UserStatus.ACTIVE)}
            >
              <Button type="primary">启用</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  if (isMobile) {
    return (
      <Card title="用户管理">
        <List
          loading={loading}
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              actions={[
                user.status === UserStatus.ACTIVE ? (
                  <Popconfirm
                    title="确定要禁用该用户吗？"
                    onConfirm={() => handleStatusChange(user.id, UserStatus.DISABLED)}
                  >
                    <Button danger size="small">禁用</Button>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    title="确定要启用该用户吗？"
                    onConfirm={() => handleStatusChange(user.id, UserStatus.ACTIVE)}
                  >
                    <Button type="primary" size="small">启用</Button>
                  </Popconfirm>
                ),
              ]}
            >
              <List.Item.Meta
                title={user.username}
                description={
                  <div>
                    <Select
                      value={user.role}
                      onChange={(value) => handleRoleChange(user.id, value)}
                      size="small"
                      style={{ width: '100%', marginBottom: 8 }}
                    >
                      <Option value={UserRole.NORMAL}>{UserRole.NORMAL}</Option>
                      <Option value={UserRole.ADMIN}>{UserRole.ADMIN}</Option>
                    </Select>
                    <Tag color={user.status === UserStatus.ACTIVE ? 'green' : 'red'}>
                      {user.status}
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
    <Card title="用户管理">
      <Table columns={columns} dataSource={users} loading={loading} rowKey="id" scroll={{ x: 'max-content' }} />
    </Card>
  );
};
