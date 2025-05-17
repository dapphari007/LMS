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
  Card,
  Typography,
  Divider,
  Empty,
  Alert,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

interface Position {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  departmentId: string;
  department?: {
    id: string;
    name: string;
  };
  approvalWorkflow?: ApprovalWorkflow;
}

interface ApprovalStep {
  id: string;
  order: number;
  approverType: string;
  approverId?: string;
  required: boolean;
}

interface ApprovalWorkflow {
  id?: string;
  steps: ApprovalStep[];
}

interface Department {
  id: string;
  name: string;
}

const Positions: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [form] = Form.useForm();
  
  // State for approval workflow
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>([]);
  const [approvalWorkflowForm] = Form.useForm();

  const fetchPositions = async () => {
    try {
      const response = await axios.get("/api/positions");
      setPositions(response.data);
    } catch (error) {
      message.error("Failed to fetch positions");
    }
  };

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
    fetchPositions();
    fetchDepartments();
    fetchUsers();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      await axios.post("/api/positions", values);
      message.success("Position created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchPositions();
    } catch (error) {
      message.error("Failed to create position");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingPosition) return;
    try {
      await axios.put(`/api/positions/${editingPosition.id}`, values);
      message.success("Position updated successfully");
      setIsModalVisible(false);
      form.resetFields();
      setEditingPosition(null);
      fetchPositions();
    } catch (error) {
      message.error("Failed to update position");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/positions/${id}`);
      message.success("Position deleted successfully");
      fetchPositions();
    } catch (error) {
      message.error("Failed to delete position");
    }
  };
  
  // Approval workflow functions
  const handleOpenApprovalWorkflow = (position: Position) => {
    setSelectedPosition(position);
    
    // Initialize with existing steps or empty array
    const initialSteps = position.approvalWorkflow?.steps || [];
    setApprovalSteps(initialSteps.length > 0 ? initialSteps : []);
    
    setIsApprovalModalVisible(true);
  };
  
  const handleAddApprovalStep = () => {
    const newStep: ApprovalStep = {
      id: `temp-${Date.now()}`, // Temporary ID until saved
      order: approvalSteps.length + 1,
      approverType: "team_lead",
      required: true
    };
    
    setApprovalSteps([...approvalSteps, newStep]);
  };
  
  const handleRemoveApprovalStep = (index: number) => {
    const updatedSteps = [...approvalSteps];
    updatedSteps.splice(index, 1);
    
    // Update order for remaining steps
    const reorderedSteps = updatedSteps.map((step, idx) => ({
      ...step,
      order: idx + 1
    }));
    
    setApprovalSteps(reorderedSteps);
  };
  
  const handleApproverTypeChange = (value: string, index: number) => {
    const updatedSteps = [...approvalSteps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      approverType: value,
      // Clear approverId if not specific user
      approverId: value !== "specific_user" ? undefined : updatedSteps[index].approverId
    };
    setApprovalSteps(updatedSteps);
  };
  
  const handleApproverIdChange = (value: string, index: number) => {
    const updatedSteps = [...approvalSteps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      approverId: value
    };
    setApprovalSteps(updatedSteps);
  };
  
  const handleRequiredChange = (checked: boolean, index: number) => {
    const updatedSteps = [...approvalSteps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      required: checked
    };
    setApprovalSteps(updatedSteps);
  };
  
  const handleSaveApprovalWorkflow = async () => {
    if (!selectedPosition) return;
    
    try {
      // Format the data for API
      const workflowData = {
        steps: approvalSteps.map((step, index) => ({
          ...step,
          order: index + 1 // Ensure correct ordering
        }))
      };
      
      // Save to API
      await axios.post(`/api/positions/${selectedPosition.id}/approval-workflow`, workflowData);
      message.success("Approval workflow saved successfully");
      setIsApprovalModalVisible(false);
      fetchPositions(); // Refresh positions to get updated workflow
    } catch (error) {
      message.error("Failed to save approval workflow");
      console.error(error);
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
      title: "Department",
      dataIndex: ["department", "name"],
      key: "department",
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
      render: (_: any, record: Position) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPosition(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            type="default"
            onClick={() => handleOpenApprovalWorkflow(record)}
          >
            Approval Steps
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this position?"
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
            setEditingPosition(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Create Position
        </Button>
      </div>

      <Table dataSource={positions} columns={columns} rowKey="id" />

      <Modal
        title={editingPosition ? "Edit Position" : "Create Position"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingPosition(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={editingPosition ? handleUpdate : handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input position name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="departmentId"
            label="Department"
            rules={[{ required: true, message: "Please select a department!" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select a department"
            >
              {departments.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Approval Workflow Modal */}
      <Modal
        title={`Approval Workflow for ${selectedPosition?.name || 'Position'}`}
        open={isApprovalModalVisible}
        onCancel={() => setIsApprovalModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setIsApprovalModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={handleSaveApprovalWorkflow}
          >
            Save Workflow
          </Button>
        ]}
      >
        <div className="mb-4">
          <Alert
            message="Approval Workflow Configuration"
            description="Define the approval steps required for this position. Each step represents a level of approval needed."
            type="info"
            showIcon
            className="mb-4"
          />
          
          <div className="mb-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Title level={4}>Approval Steps</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddApprovalStep}
              >
                Add Step
              </Button>
            </div>

            {approvalSteps.length > 0 ? (
              approvalSteps.map((step, index) => (
                <Card 
                  key={step.id || index} 
                  className="mb-4"
                  title={`Step ${index + 1}`}
                  extra={
                    approvalSteps.length > 1 ? (
                      <Button 
                        danger 
                        onClick={() => handleRemoveApprovalStep(index)}
                      >
                        Remove
                      </Button>
                    ) : null
                  }
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <Text strong>Approver Type</Text>
                      <Select
                        style={{ width: '100%', marginTop: '8px' }}
                        value={step.approverType}
                        onChange={(value) => handleApproverTypeChange(value, index)}
                      >
                        <Select.Option value="team_lead">Team Lead</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="hr">HR Department</Select.Option>
                        <Select.Option value="department_head">Department Head</Select.Option>
                        <Select.Option value="specific_user">Specific User</Select.Option>
                      </Select>
                    </div>

                    {step.approverType === "specific_user" && (
                      <div>
                        <Text strong>Select User</Text>
                        <Select
                          style={{ width: '100%', marginTop: '8px' }}
                          value={step.approverId}
                          onChange={(value) => handleApproverIdChange(value, index)}
                          showSearch
                          optionFilterProp="children"
                          placeholder="Select a user"
                        >
                          {users.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                              {user.firstName} {user.lastName} ({user.email})
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}

                    <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={step.required}
                          onChange={(e) => handleRequiredChange(e.target.checked, index)}
                          style={{ marginRight: '8px' }}
                        />
                        <span>Required Approval (cannot be skipped)</span>
                      </label>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Empty description="No approval steps added yet." />
                <Button
                  type="primary"
                  onClick={handleAddApprovalStep}
                  style={{ marginTop: '16px' }}
                >
                  Add your first step
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Positions;
