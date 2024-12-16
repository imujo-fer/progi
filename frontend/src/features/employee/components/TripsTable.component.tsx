import { Link } from "@tanstack/react-router";
import { Button, Flex, Select } from "antd";
import Title from "antd/es/typography/Title";
import { tripRequestsCreateRoute } from "../routes/employee.routes";

export default function TripsTable() {
  const options = [
    { value: 0, label: "Pending Department Approval" },
    { value: 1, label: "Department Approval Rejected" },
    { value: 2, label: "Travel Approved" },
    { value: 3, label: "Pending Expense Approval" },
    { value: 4, label: "Expense Approval Rejected" },
    { value: 5, label: "Pending Director Approval" },
    { value: 6, label: "Director Approval Rejected" },
    { value: 7, label: "Awaiting Payment" },
    { value: 8, label: "Paid" },
  ];

  return (
    <>
      <Title>Active Trip Requests</Title>
      <Flex className="justify-between items-center">
        <div className="flex flex-col">
          <div>Status</div>
          <Select
            defaultValue="All"
            onChange={() => {}}
            options={options}
            className="w-64"
          />
        </div>
        <Link to={tripRequestsCreateRoute.to}>
          <Button>Create trip request</Button>
        </Link>
      </Flex>
    </>
  );
}
