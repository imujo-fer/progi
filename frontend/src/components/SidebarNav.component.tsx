import { Layout, Grid, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet } from "@tanstack/react-router";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const roleList = ["Department head", "Accountant", "Director"];

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
              <a className="text-lg" href="./trip-requests">
                Trip requests
              </a>
              <a className="text-lg" href="./past-trips">
                Past Trips
              </a>
              {roleList.includes("Department head") ? (
                <>
                  <a className="text-lg" href="./department-approval-requests">
                    Department approval requests
                  </a>
                  <a className="text-lg" href="./department-statistics">
                    Department statistics
                  </a>
                </>
              ) : (
                <></>
              )}
              {roleList.includes("Accountant") ? (
                <>
                  <a className="text-lg" href="./expense-review-requests">
                    Expense reivew requests
                  </a>
                  <a className="text-lg" href="./awaiting-payment">
                    Awaiting payment
                  </a>
                </>
              ) : (
                <></>
              )}
              {roleList.includes("Director") ? (
                <>
                  <a className="text-lg" href="./review-trips">
                    Review trips
                  </a>
                  <a className="text-lg" href="./statistics">
                    Statistics
                  </a>
                </>
              ) : (
                <></>
              )}
            </div>

            <a className="text-lg" href="./notifications">
              Notifications
            </a>
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
              <a className="text-lg" href="./trip-requests">
                Trip requests
              </a>
              <a className="text-lg" href="./past-trips">
                Past Trips
              </a>
              <a className="text-lg" href="./notifications">
                Notifications
              </a>
            </div>
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
