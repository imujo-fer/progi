import { Button, Card, Flex, Form, Typography } from "antd";

interface RegisterProps {
  email: string;
  roles: string[];
  department: string;
}

const { Title } = Typography;

export default function RegisterForm({
  email,
  roles,
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
          <Form.Item>
            <p className="font-bold">Email:</p> {email}
          </Form.Item>
          <Form.Item>
            <p className="font-bold">{roles.length > 1 ? "Roles:" : "Role:"}</p>
            {roles.map((role) => {
              return <p>{role}</p>;
            })}
          </Form.Item>
          <Form.Item>
            <p className="font-bold">Department:</p> {department}
          </Form.Item>

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
