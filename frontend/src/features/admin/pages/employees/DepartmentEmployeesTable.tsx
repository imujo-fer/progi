"use client";

import React from "react";
import { Table, Spin } from "antd";
import useGetDepartmentEmployees from "../../hooks/useGetDepartmentEmloyees";
type DepartmentEmployeesTableProps = {
  departmentId: number; // ID departmenta za koji prikazujemo zaposlenike
};

const DepartmentEmployeesTable: React.FC<DepartmentEmployeesTableProps> = ({
  departmentId,
}) => {
  const { data: employees, isLoading } = useGetDepartmentEmployees({
    departmentId,
    onSuccess: (data) => {
      console.log(`Fetched employees for department ${departmentId}:`, data);
    },
  });

  console.log(departmentId);
  console.log(employees);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return <p>No employees found for this department.</p>;
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => roles.join(", "),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Employees in Department {departmentId}
      </h2>
      <Table
        dataSource={employees}
        columns={columns}
        rowKey={(record) => record.id}
        className="border shadow-md"
        pagination={false}
      />
    </div>
  );
};

export default DepartmentEmployeesTable;
