import { Button, Card, Flex, Form, Typography } from "antd";

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

          <Form.Item>
            <Button block htmlType="submit" href="/oauth2/authorization/google">
              Register with Google Authentification
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
