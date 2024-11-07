import { Button, Form, Input } from "antd";

interface RegisterProps {
  email: string;
  role: string;
  department: string;
}

export default function RegisterForm({
  email,
  role,
  department,
}: RegisterProps) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form
        name="login"
        initialValues={{ remember: true }}
        className="bg-gray-300 w-96 p-10 rounded-lg"
        onFinish={() => console.log("submited")}
      >
        <Form.Item>Email: {email}</Form.Item>
        <Form.Item>Role: {role}</Form.Item>
        <Form.Item>Department: {department}</Form.Item>

        <Form.Item className="">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
