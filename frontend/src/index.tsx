import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";
import RouterProvider from "./routes/RouterProvider";
import { Providers } from "./providers/Providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <UserProvider>
        <RouterProvider />
      </UserProvider>
    </Providers>
  </StrictMode>
);
