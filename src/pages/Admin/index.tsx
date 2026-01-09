import { Card, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Card>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 200 }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </Card>
  );
};
