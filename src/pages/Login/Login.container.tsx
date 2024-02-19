import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { message } from "antd";
import apiFetch, { AuthLogin } from "../../services/apiFetch";
import { UserLogin, LoginPublicProps, LoginProps } from "./Login.props";
import LoginView from "./Login.view";
import ROUTES from "common/consts/routes";

const LoginErrMessage = {
  MISSING: "Please enter your username and password.",
  INVALID: "You have entered an invalid username and/or password.",
  SERVER: "Sorry, something went wrong there. Please try again."
}

const LoginContainer: React.FC<LoginPublicProps> = (
  ownProps: LoginPublicProps
) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<UserLogin>({ username: "", password: "" });

  const handleChange = (field: keyof UserLogin, value: string) => {
    setLogin({ ...login, [field]: value });
  };

  const handleLogin = async () => {
    const { username, password } = login;

    if (!username && !password) { 
      message.error(LoginErrMessage.MISSING);
      return;
    }

    try {
      const result = await apiFetch(AuthLogin(username, password));

      if (result.status > 200) {
        message.error(LoginErrMessage.INVALID);
        return
      }
      message.success(`Welcome ${username}`);
      localStorage.setItem('username', username);
      navigate(ROUTES.HOME);
    } catch (e) {
      message.error(LoginErrMessage.SERVER);
      console.error(e);
    }
  };

  const combinedProps: LoginProps = {
    ...ownProps,
    login,
    handleChange,
    handleLogin,
  };
  return <LoginView {...combinedProps} />;
};

export default LoginContainer;
