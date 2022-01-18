import { Menu } from 'antd';
import { UserOutlined, AliwangwangOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons';

interface LayoutProps {
  children: React.ReactNode,
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Menu onClick={() => {}} mode="horizontal">
        <Menu.Item key="user" icon={<UserOutlined />}>
          User
        </Menu.Item>
        <Menu.Item key="admin" icon={<AliwangwangOutlined />}>
          Admin
        </Menu.Item>
        <Menu.Item key="usermotivators" icon={<IdcardOutlined />}>
          User Motivators
        </Menu.Item>
        <Menu.Item key="teamdetails" icon={<TeamOutlined />}>
          Team Details
        </Menu.Item>
      </Menu>
      {children}
    </section>
  );
};

export default Layout;
