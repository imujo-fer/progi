import { MenuOutlined } from "@ant-design/icons";
import { Outlet } from "@tanstack/react-router";
import { Button, Drawer, Grid, Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Layout/Sidebar.component";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

export default function SidebarNav() {
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const isDesktop = screens.md;

  return (
    <Layout className="min-h-screen">
      {isDesktop ? (
        <Sider theme="light" collapsedWidth="0" width={320}>
          <div className="text-xl font-semibold p-6">Logo</div>
          <Sidebar />
        </Sider>
      ) : (
        <>
          <Header className="flex items-center justify-between bg-gray-200 p-4">
            <>
              <div className="text-xl font-semibold">Logo</div>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={showDrawer}
                className="text-2xl text-black"
              />
            </>
          </Header>
          <Drawer
            placement="left"
            onClose={closeDrawer}
            open={drawerVisible}
            closable
            width={320}
            classNames={{
              body: "!p-0",
            }}
          >
            <Sidebar />
          </Drawer>
        </>
      )}

      <Layout>
        <Content className="bg-gray-100 p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
