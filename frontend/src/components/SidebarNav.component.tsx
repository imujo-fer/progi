import { Flex, Typography } from "antd";

const { Text } = Typography;

export default function SidebarNav() {
  return (
    <div>
      <Flex className="lg:w-80 md:w-60 h-screen flex justify-between items-start flex-col bg-gray-300 gap-4 p-12">
        <Flex className="w-full h-20 bg-gray-500">Logo</Flex>
        <Flex className="flex-col pb-44">
          <Text className="text-lg">Trip requests</Text>
          <Text className="text-lg">Past Trips</Text>
        </Flex>
        <Text className="text-lg">Notifications</Text>
      </Flex>
    </div>
  );
}
