"use client";

import React from "react";
import { Form, Input, Button } from "antd";

interface DepartmentFormProps {
  departmentName?: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  departmentName = "",
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({ name: departmentName });
  }, [departmentName]);

  const handleFinish = (values: { name: string }) => {
    onSave(values.name);
  };

  return (
    <div className="p-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="max-w-md"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter a department name" },
          ]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DepartmentForm;
