"use client";

import { Form, Input, Select, Button, message } from "antd";
import { UserInviteDTORolesEnum } from "@/api_gen";
import useInviteUser from "./hooks/useInviteUser";
import useGetDepartments from "./hooks/useGetDepartments"; // Import the hook for fetching departments

interface InviteUserForm {
  email: string;
  firstName: string;
  lastName: string;
  iban: string;
  department: string;
  roles: Array<UserInviteDTORolesEnum>;
}

export default function InviteUserForm() {
  const [form] = Form.useForm<InviteUserForm>();

  const { mutate: inviteUser, isPending } = useInviteUser({
    onSuccess: () => {
      message.success("User invited successfully!");
      form.resetFields(); // Reset form after success
    },
    onError: (error) => {
      message.error(`Failed to invite user: ${error}`);
    },
  });

  // Fetch departments using the hook
  const { data: departments, isLoading: isLoadingDepartments } =
    useGetDepartments({
      onSuccess: (data) => {
        console.log("Fetched departments:", data);
      },
    });

  // Convert UserInviteDTORolesEnum to an array of key-value pairs
  const roleOptions = Object.entries(UserInviteDTORolesEnum);

  const onFinish = (values: InviteUserForm) => {
    inviteUser({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      iban: values.iban,
      departmentId: Number(values.department), // Assuming department ID is a string
      roles: values.roles,
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Invite User</h1>{" "}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email address" className="w-full" />
        </Form.Item>

        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please input first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please input last name" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="IBAN"
          name="iban"
          rules={[{ required: true, message: "Please input IBAN" }]}
        >
          <Input placeholder="Enter IBAN" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please select department" }]}
        >
          <Select
            placeholder="Select department"
            loading={isLoadingDepartments}
            disabled={isLoadingDepartments}
          >
            {departments?.map((dept) => (
              <Select.Option key={dept.id} value={dept.id}>
                {dept.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            { required: true, message: "Please select at least one role" },
          ]}
        >
          <Select mode="multiple" placeholder="Select roles" className="w-full">
            {roleOptions.map(([key, value]) => (
              <Select.Option key={key} value={value}>
                {key} {/* Display the user-friendly name */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}
