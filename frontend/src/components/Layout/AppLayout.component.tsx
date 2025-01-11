import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Grid, Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar.component";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const isDesktop = screens.md;

  return (
    <Layout className="min-h-screen">
      {isDesktop ? (
        <Sider theme="light" collapsedWidth="0" width={300}>
          <a href="/trip-requests" className="flex items-center justify-evenly p-4">
            <img src="http://localhost:5171/frontend/public/logo.png" alt="logo" className="rounded-full w-16 h-16"/>
            <div className="text-2xl font-semibold p-6">Business Trip</div>
          </a>
          <hr className="pb-4 w-4/5 m-auto"/>
          <Sidebar />
        </Sider>
      ) : (
        <>
          <Header className="flex items-center justify-between bg-gray-200 p-4">
            <>
            <a href="/trip-requests" className="flex items-center justify-between p-4">
              <img src="http://localhost:5171/frontend/public/logo.png" alt="logo" className="rounded-full w-10 h-10"/>
              <div className="text-xl font-semibold p-2">Business Trip</div>
            </a>
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
        <Content className="bg-gray-100 p-8">{children}</Content>
      </Layout>
    </Layout>
  );
}
