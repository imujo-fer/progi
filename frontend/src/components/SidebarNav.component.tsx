import { Layout, Grid, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

export default function SidebarNav() {
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Layout className="min-h-screen">
      {screens.lg ? (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={320}
          className="bg-gray-300"
        >
          <div className="flex flex-col justify-between h-full p-8 gap-4">
            <div className="h-20 bg-gray-500 flex items-center justify-center text-white text-xl">
              Logo
            </div>
            <div className="flex flex-col pb-44 space-y-2">
              <p className="text-lg">Trip requests</p>
              <p className="text-lg">Past Trips</p>
            </div>
            <p className="text-lg">Notifications</p>
          </div>
        </Sider>
      ) : (
        <>
          <Header className="flex items-center justify-between bg-gray-200 p-4">
            <div className="text-xl font-semibold">Logo</div>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              className="text-2xl text-black"
            />
          </Header>
          <Drawer
            title="Menu"
            placement="left"
            onClose={closeDrawer}
            visible={drawerVisible}
            closable
            width={320}
            className="bg-gray-300"
          >
            <div className="flex flex-col gap-4">
              <p className="text-lg">Trip requests</p>
              <p className="text-lg">Past Trips</p>
              <p className="text-lg">Notifications</p>
            </div>
          </Drawer>
        </>
      )}
      <Layout>
        <Content className="bg-gray-100 p-6"></Content>
      </Layout>
    </Layout>
  );
}
