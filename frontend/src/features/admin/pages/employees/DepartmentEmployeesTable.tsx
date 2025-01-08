"use client";

import React from "react";
import { Table, Spin } from "antd";
import useGetDepartments from "../../hooks/useGetDepartments";
import useGetDepartmentEmployees from "../../hooks/useGetDepartmentEmloyees";

const DepartmentEmployeesTable: React.FC = () => {
  const { data: departments, isLoading: isLoadingDepartments } =
    useGetDepartments();

  // Dohvaćanje zaposlenika za svaki department
  const employeeQueries = departments?.map((department) =>
    useGetDepartmentEmployees({
      departmentId: department.id,
    })
  );

  if (isLoadingDepartments || !departments) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {departments.map((department, index) => {
        const employeeQuery = employeeQueries?.[index];

        if (employeeQuery?.isLoading) {
          return (
            <div
              key={department.id}
              className="flex justify-center items-center h-full"
            >
              <Spin size="large" />
            </div>
          );
        }

        const employees = employeeQuery?.data || [];

        // Kolone za Ant Design tablicu
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
          <div key={department.id}>
            <h2 className="text-xl font-bold mb-4">{department.name}</h2>
            <Table
              dataSource={employees}
              columns={columns}
              rowKey={(record) => record.id}
              className="border shadow-md"
              pagination={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentEmployeesTable;
