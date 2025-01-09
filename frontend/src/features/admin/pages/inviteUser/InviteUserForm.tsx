"use client";

import { Form, Input, Select, Button, message } from "antd";
import { UserDetailsDTO, UserDetailsDTORolesEnum } from "@/api_gen";
import useInviteUser from "../../hooks/useInviteUser";
import useUpdateUser from "../../hooks/useUpdateUser";
import useGetDepartments from "../../hooks/useGetDepartments";

interface InviteUserFormProps {
  userDetails?: UserDetailsDTO;
  onFinishSuccess?: () => void;
  onCancel?: () => void; // Dodano za zatvaranje modala
}

interface InviteUserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  iban: string;
  department: string;
  roles: Array<UserDetailsDTORolesEnum>;
}

export default function InviteUserForm({
  userDetails,
  onFinishSuccess,
  onCancel, // Dodano
}: InviteUserFormProps) {
  const [form] = Form.useForm<InviteUserFormValues>();

  const { mutate: inviteUser, isPending: isInviting } = useInviteUser({
    onSuccess: () => {
      message.success("User invited successfully!");
      form.resetFields();
      onFinishSuccess?.();
    },
    onError: (error) => {
      message.error(`Failed to invite user: ${error}`);
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: () => {
      message.success("User updated successfully!");
      onFinishSuccess?.();
    },
    onError: (error) => {
      message.error(`Failed to update user: ${error}`);
    },
  });

  const { data: departments, isLoading: isLoadingDepartments } =
    useGetDepartments({
      onSuccess: (data) => {
        console.log("Fetched departments:", data);
      },
    });

  const roleOptions = Object.entries(UserDetailsDTORolesEnum);

  if (userDetails) {
    form.setFieldsValue({
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      iban: userDetails.iban,
      department: userDetails?.department?.name || "",
      roles: userDetails.roles || [],
    });
  }

  const onFinish = (values: InviteUserFormValues) => {
    const selectedDepartment = departments?.find(
      (dept) => dept.name === values.department
    );

    if (userDetails) {
      updateUser({
        userId: userDetails.id,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          iban: values.iban,
          departmentId: selectedDepartment?.id || 0,
          roles: values.roles as Array<UserDetailsDTORolesEnum>,
        },
      });
    } else {
      inviteUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        iban: values.iban,
        departmentId: selectedDepartment?.id || 0,
        roles: values.roles,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        {userDetails ? "Edit User" : "Invite User"}
      </h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
        initialValues={userDetails ? undefined : { roles: [] }}
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
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
              <Select.Option key={dept.id} value={dept.name}>
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
                {key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => {
              if (userDetails) {
                onCancel?.(); // Zatvori modal ako je edit
              } else {
                form.resetFields(); // Resetiraj formu ako je create
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isInviting || isUpdating}
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}
