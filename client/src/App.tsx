import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ProtectedRoutes from "./routes/protected/ProtectedRoutes";
import UnauthorizedRoutes from "./routes/unauthorized/UnauthorizedRoutes";
import { currentUserInfoStore } from "./stores/useCurrentUserInfo";
import { socket, SocketContext } from "./context/socketio";

const App: React.FC<{}> = () => {
  const { userInfo } = currentUserInfoStore();

  return (
    <SocketContext.Provider value={socket}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ fontFamily: "Pretendard" }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={userInfo ? <ProtectedRoutes /> : <UnauthorizedRoutes />}
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </SocketContext.Provider>
  );
};

export default App;
