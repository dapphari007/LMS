import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={["/dashboard"]}
    >
      <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/users" icon={<UserOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="/roles" icon={<TeamOutlined />}>
        <Link to="/roles">Roles</Link>
      </Menu.Item>
      <Menu.Item key="/departments" icon={<BankOutlined />}>
        <Link to="/departments">Departments</Link>
      </Menu.Item>
      <Menu.Item key="/positions" icon={<UsergroupAddOutlined />}>
        <Link to="/positions">Positions</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
