import { Menu } from "antd";
import {
  UserOutlined,
  AliwangwangOutlined,
  TeamOutlined,
  IdcardOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const role = localStorage.getItem('role')
  return (
    <section>
      <Menu onClick={() => {}} mode="horizontal">
        {role === 'user' && (
          <>
            <Menu.Item
              onClick={() => navigate("/user")}
              key="user"
              icon={<UserOutlined />}
            >
              User
            </Menu.Item>
            <Menu.Item
              onClick={() => navigate("/workspace")}
              key="usermotivators"
              icon={<IdcardOutlined />}
            >
              User Motivators
            </Menu.Item>
          </>
        )}
        {/* <Menu.Item
          onClick={() => navigate("/admin")}
          key="admin"
          icon={<AliwangwangOutlined />}
        >
          Admin
        </Menu.Item> */}
        {role === 'admin' && (
          <Menu.Item
            onClick={() => navigate("/team-details")}
            key="teamdetails"
            icon={<TeamOutlined />}
          >
            Team Details
          </Menu.Item>
        )}
        <Menu.Item
          onClick={logout}
          key="logout"
          icon={<PoweroffOutlined />}
        >
          Logout
        </Menu.Item>
      </Menu>
      {children}
    </section>
  );
};

export default Layout;
