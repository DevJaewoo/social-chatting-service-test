import axios from "axios";
import { useEffect } from "react";
import { currentUserInfoStore } from "src/stores/useCurrentUserInfo";

const LogoutPage: React.FC<{}> = () => {
  const { clearUserInfo } = currentUserInfoStore();

  useEffect(() => {
    const requestLogout = async () => {
      await axios.post("/api/users/logout").catch(() => {});
      clearUserInfo();
    };

    requestLogout();
  }, [clearUserInfo]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      로그아웃 중입니다..
    </div>
  );
};

export default LogoutPage;
