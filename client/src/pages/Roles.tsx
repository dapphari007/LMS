import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string;
  isSystem: boolean;
}

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const fetchRoles = async () => {
    try {
      const response = await axios.get("/api/roles");
      setRoles(response.data);
    } catch (error) {
      message.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await axios.post("/api/roles", values);
      message.success("Role created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchRoles();
    } catch (error) {
      message.error("Failed to create role");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingRole) return;
    try {
      await axios.put(`/api/roles/${editingRole.id}`, values);
      message.success("Role updated successfully");
      setIsModalVisible(false);
      form.resetFields();
      setEditingRole(null);
      fetchRoles();
    } catch (error) {
      message.error("Failed to update role");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      message.success("Role deleted successfully");
      fetchRoles();
    } catch (error) {
      message.error("Failed to delete role");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "System Role",
      dataIndex: "isSystem",
      key: "isSystem",
      render: (isSystem: boolean) => (isSystem ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Role) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingRole(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setEditingRole(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Create Role
        </Button>
      </div>

      <Table dataSource={roles} columns={columns} rowKey="id" />

      <Modal
        title={editingRole ? "Edit Role" : "Create Role"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingRole(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={editingRole ? handleUpdate : handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input role name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>

          <Form.Item name="permissions" label="Permissions">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Roles;
