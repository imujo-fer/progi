import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";
import RouterProvider from "./routes/RouterProvider";
import { Providers } from "./providers/Providers";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <UserProvider>
        <ConfigProvider 
          theme={{
            components: {
              Button: {
                colorPrimary: "#566f8b",
                colorPrimaryHover: "#7da9d6",
                colorPrimaryActive: "#3B82F6",
                colorBorder: "#374151",
                colorText: "#4B5563",
                colorBgBase: "#E0F2FE",
                colorError: "#f08080",
                colorErrorHover: "#f49797",
                colorErrorBg: "#ffffff",
              },
            },
          }}> 
          <RouterProvider />
        </ConfigProvider>       
      </UserProvider>
    </Providers>
  </StrictMode>
);
