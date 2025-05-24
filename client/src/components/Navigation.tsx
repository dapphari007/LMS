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
      items={[
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
          key: "/users",
          icon: <UserOutlined />,
          label: <Link to="/users">Users</Link>,
        },
        {
          key: "/roles",
          icon: <TeamOutlined />,
          label: <Link to="/roles">Roles</Link>,
        },
        {
          key: "/departments",
          icon: <BankOutlined />,
          label: <Link to="/departments">Departments</Link>,
        },
        {
          key: "/positions",
          icon: <UsergroupAddOutlined />,
          label: <Link to="/positions">Positions</Link>,
        },
      ]}
    />
  );
};

export default Navigation;
