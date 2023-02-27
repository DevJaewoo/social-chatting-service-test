import { Button, PasswordInput, TextInput } from "@mantine/core";
import axios, { AxiosError } from "axios";
import { MouseEventHandler, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorCode } from "src/socketConstants";
import { SocketContext } from "src/context/socketio";
import { UserInfo, currentUserInfoStore } from "src/stores/useCurrentUserInfo";

const LoginPage: React.FC<{}> = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [signupError, setSignupError] = useState<string | undefined>(undefined);

  const { updateUserInfo } = currentUserInfoStore();

  const socket = useContext(SocketContext);

  const requestLogin: MouseEventHandler = async (event) => {
    event.preventDefault();

    if (name.length < 1 || name.length > 10) {
      setNameError("이름은 1~10글자 사이여야 합니다.");
      return;
    }
    setNameError("");

    if (password.length < 6 || password.length > 14) {
      setPasswordError("비밀번호는 6~14글자 사이여야 합니다.");
      return;
    }
    setPasswordError("");

    const response = await axios
      .post<UserInfo>("/api/users/login", {
        name,
        password,
      })
      .catch((error: AxiosError) => {
        const errorCode = error.response?.data as ErrorCode;
        setSignupError(errorCode.message);
      });

    if (!response) return;

    socket.emit("login", response.data);
    updateUserInfo(response.data);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-400">
      <div className="w-[30rem] p-10 text-center rounded-lg shadow-lg bg-white">
        <h1 className="">Login</h1>
        <form className="mt-4">
          {signupError && (
            <div className="flex justify-center items-center w-full h-12 border border-red-500 rounded-lg text-red-500">
              {signupError}
            </div>
          )}
          <div className="mt-4">
            <TextInput
              placeholder="ID"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              error={nameError}
              size="lg"
              radius="md"
              withAsterisk
            />
            <PasswordInput
              className="mt-4"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              error={passwordError}
              size="lg"
              radius="md"
              withAsterisk
            />
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600"
              onClick={requestLogin}
            >
              로그인
            </Button>
            <Link to="/signup">
              <Button className="w-full h-12 mt-4" variant="outline">
                회원가입
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
