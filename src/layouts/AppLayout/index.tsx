import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Avatar, Drawer } from 'antd';
import {
  ProjectOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { logout, getUser, isAdmin } from '@/utils/auth';
import { User } from '@/types';
import { useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

const { Header, Content } = Layout;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const menuItems = [
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: '项目列表',
    },
    {
      key: '/reminder',
      icon: <BellOutlined />,
      label: '月度提醒',
    },
    ...(isAdmin()
      ? [
          {
            key: '/admin',
            icon: <SettingOutlined />,
            label: '管理员',
          },
        ]
      : []),
  ];

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              style={{ color: '#fff', fontSize: 18 }}
              onClick={() => setDrawerVisible(true)}
            />
          )}
          <div
            style={{
              color: '#fff',
              fontSize: isMobile ? 14 : 18,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {isMobile ? '项目管理系统' : '项目管理系统 - 政府端'}
          </div>
        </div>
        {!isMobile && (
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" style={{ color: '#fff' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                {user?.username}
              </Button>
            </Dropdown>
          </>
        )}
        {isMobile && (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" style={{ color: '#fff', padding: 0 }}>
              <Avatar icon={<UserOutlined />} size="small" />
            </Button>
          </Dropdown>
        )}
      </Header>
      <Drawer
        title="菜单"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
        />
      </Drawer>
      <Content
        style={{
          padding: isMobile ? 16 : 24,
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
