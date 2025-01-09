"use client";

import React, { useState } from "react";
import { Table, Spin, Button, Modal, Popconfirm, message } from "antd";
import useGetDepartmentEmployees from "../../hooks/useGetDepartmentEmloyees";
import useGetDepartmentById from "../../hooks/useGetDepartmentById";
import useDeleteUser from "../../hooks/useDeleteUserFromDepartment";
import { departmentEmployeesRoute } from "../../routes/admin.rutes";
import InviteUserForm from "../inviteUser/InviteUserForm";
import { UserDetailsDTO } from "@/api_gen";

const DepartmentEmployeesTable = () => {
  const { id: departmentId } = departmentEmployeesRoute.useRouteContext();

  const [editingUser, setEditingUser] = useState<UserDetailsDTO | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: employees,
    isLoading: isLoadingEmployees,
    refetch,
  } = useGetDepartmentEmployees({
    departmentId,
  });

  const { data: department, isLoading: isLoadingDepartment } =
    useGetDepartmentById({
      id: departmentId,
    });

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      message.success("User deleted successfully!");
      refetch(); // Automatski osvježava podatke u tablici
    },
    onError: (error) => {
      message.error(`Failed to delete user: ${error}`);
    },
  });

  const handleEdit = (user: UserDetailsDTO) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const onFinishSuccess = () => {
    closeModal();
    refetch(); // Automatski osvježava podatke u tablici
  };

  const handleDelete = (userId: number) => {
    deleteUser({ userId, departmentId });
  };

  if (isLoadingEmployees || isLoadingDepartment) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No employees found for this department.
      </p>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (_: any, record: UserDetailsDTO) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "IBAN",
      dataIndex: "iban",
      key: "iban",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => roles.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserDetailsDTO) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="bg-blue-500"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl font-bold mb-6 text-center sm:text-left">
        Employees in Department: {department?.name || "Unknown Department"}
      </h2>
      <Table
        dataSource={employees}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
        scroll={{ x: "1000px" }} // Dodano za responzivnost
      />
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {editingUser && (
          <InviteUserForm
            userDetails={editingUser}
            onFinishSuccess={onFinishSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default DepartmentEmployeesTable;
