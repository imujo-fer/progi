"use client";

import React, { useState } from "react";
import { Table, Spin, Button, Popconfirm, message, Modal } from "antd";
import useGetDepartments from "../../hooks/useGetDepartments";
import useCreateDepartment from "../../hooks/useCreateDepartment";
import useEditDepartment from "../../hooks/useEditDepartment";
import useDeleteDepartment from "../../hooks/useDeleteDepartment";
import { DepartmentDTO } from "@/api_gen";
import DepartmentForm from "./DepartmentForm";

const DepartmentsTable = () => {
  const [editingDepartment, setEditingDepartment] =
    useState<DepartmentDTO | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const {
    data: departments,
    isLoading,
    refetch,
  } = useGetDepartments({
    onSuccess: () => {},
  });

  const { mutate: createDepartment } = useCreateDepartment({
    onSuccess: () => {
      message.success("Department created successfully!");
      refetch();
      closeModal();
    },
    onError: () => {
      message.error("Failed to create department.");
    },
  });

  const { mutate: editDepartment } = useEditDepartment({
    onSuccess: () => {
      message.success("Department updated successfully!");
      refetch();
      closeModal();
    },
    onError: () => {
      message.error("Failed to update department.");
    },
  });

  const { mutate: deleteDepartment } = useDeleteDepartment({
    onSuccess: () => {
      message.success("Department deleted successfully!");
      refetch();
    },
    onError: () => {
      message.error("Failed to delete department.");
    },
  });

  const handleEdit = (department: DepartmentDTO) => {
    setEditingDepartment(department);
    setIsCreateMode(false);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingDepartment(null);
    setIsCreateMode(true);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingDepartment(null);
    setIsCreateMode(false);
  };

  const handleSave = (name: string) => {
    if (isCreateMode) {
      createDepartment({ name });
    } else if (editingDepartment && editingDepartment.id !== undefined) {
      editDepartment({ id: editingDepartment.id, name });
    } else {
      message.error("Invalid department ID");
    }
  };

  const handleDelete = (departmentId: number | undefined) => {
    if (!departmentId) {
      message.error("Invalid department ID");
      return;
    }
    deleteDepartment({ id: departmentId });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!departments || departments.length === 0) {
    return (
      <p className="text-center text-gray-600">No departments available.</p>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-semibold",
      ellipsis: true,
    },
    {
      title: "Employee Count",
      dataIndex: "employeeCount",
      key: "employeeCount",
      align: "center" as "center",
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: DepartmentDTO) => (
        <div className="flex gap-2 justify-end">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="bg-blue-500"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this department?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
      align: "right" as "right",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Departments</h2>
        <Button
          type="primary"
          onClick={handleCreate}
          className="bg-gray-500 hover:!bg-gray-600"
        >
          Create department
        </Button>
      </div>
      <Table
        dataSource={departments}
        columns={columns}
        rowKey={(record) => record.id ?? "unknown"}
        pagination={false}
        scroll={{ x: "1000px" }}
      />
      <Modal
        title={
          <span className="text-2xl font-bold">
            {isCreateMode ? "Create Department" : "Edit Department"}
          </span>
        }
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <DepartmentForm
          departmentName={editingDepartment?.name || ""}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default DepartmentsTable;
