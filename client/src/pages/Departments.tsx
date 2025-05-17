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
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Department {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  managerId: string;
  manager?: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
}

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [form] = Form.useForm();

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("/api/departments");
      setDepartments(response.data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await axios.post("/api/departments", values);
      message.success("Department created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchDepartments();
    } catch (error) {
      message.error("Failed to create department");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingDepartment) return;
    try {
      await axios.put(`/api/departments/${editingDepartment.id}`, values);
      message.success("Department updated successfully");
      setIsModalVisible(false);
      form.resetFields();
      setEditingDepartment(null);
      fetchDepartments();
    } catch (error) {
      message.error("Failed to update department");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/departments/${id}`);
      message.success("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      message.error("Failed to delete department");
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
      title: "Manager",
      dataIndex: ["manager", "name"],
      key: "manager",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Department) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingDepartment(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this department?"
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
            setEditingDepartment(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Create Department
        </Button>
      </div>

      <Table dataSource={departments} columns={columns} rowKey="id" />

      <Modal
        title={editingDepartment ? "Edit Department" : "Create Department"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingDepartment(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={editingDepartment ? handleUpdate : handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input department name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="managerId" label="Manager">
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select a manager"
            >
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Departments;
