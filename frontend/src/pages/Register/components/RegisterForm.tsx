import { Button, Card, Flex, Form, Input, Typography } from "antd";

interface RegisterProps {
  email: string;
  role: string;
  department: string;
}

const { Title } = Typography;

export default function RegisterForm({
  email,
  role,
  department,
}: RegisterProps) {
  return (
    <Flex className="justify-center items-center h-screen">
      <Card className="bg-gray-300 w-96 p-10 rounded-lg">
        <Title className="text-center">Register</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={() => console.log("submited")}
        >
          <Form.Item>Email: {email}</Form.Item>
          <Form.Item>Role: {role}</Form.Item>
          <Form.Item>Department: {department}</Form.Item>

          <Form.Item className="">
            <Input.Password placeholder="Choose password" />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
