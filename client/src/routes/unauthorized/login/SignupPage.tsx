import { Button, PasswordInput, TextInput } from "@mantine/core";
import axios, { AxiosError } from "axios";
import { MouseEventHandler, useState } from "react";
import { ErrorCode } from "src/constants";
import { UserInfo, currentUserInfoStore } from "src/stores/useCurrentUserInfo";

const SignupPage: React.FC<{}> = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [signupError, setSignupError] = useState<string | undefined>(undefined);

  const { updateUserInfo } = currentUserInfoStore();

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
      .post<UserInfo>("/api/users/signup", {
        name,
        password,
      })
      .catch((error: AxiosError) => {
        const errorCode = error.response?.data as ErrorCode;
        setSignupError(errorCode.message);
      });

    if (!response) return;
    updateUserInfo(response.data);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-400">
      <div className="w-[30rem] p-10 text-center rounded-lg shadow-lg bg-white">
        <h1 className="">Sign Up</h1>
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
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
