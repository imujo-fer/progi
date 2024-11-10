import { Flex, Card, Button, Typography } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
  return (
    <div>
      <Flex className="justify-center items-center h-screen">
        <Card className="bg-gray-300 w-96 p-10 rounded-lg">
          <Title className="text-center">Login</Title>

          <Button htmlType="submit" href="/oauth2/authorization/google">
            <p>Login with Google Authentication</p>
            <DoubleRightOutlined />
          </Button>
        </Card>
      </Flex>
    </div>
  );
}
