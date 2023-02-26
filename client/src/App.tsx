import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ProtectedRoutes from "./routes/protected/ProtectedRoutes";
import UnauthorizedRoutes from "./routes/unauthorized/UnauthorizedRoutes";
import { currentUserInfoStore } from "./stores/useCurrentUserInfo";

const App: React.FC<{}> = () => {
  const { userInfo } = currentUserInfoStore();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={userInfo ? <ProtectedRoutes /> : <UnauthorizedRoutes />}
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
