import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Logo from 'components/logo/dark';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import './TempLogin.scss';
import ROUTES from "common/consts/routes";

const TempLoginView = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const onFieldChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'prism@123') {
      const now = new Date();
      const item = {
        value: 'true',
        expiry: now.getTime() + 8.64e7,
      };
      localStorage.setItem('templogin', JSON.stringify(item));
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div className="login-container">
      <div className="login-body flex-col">
        <div className="left-header">
          <Logo color="#ffffff" />
        </div>
        <div className="center-layout">
          <p className="Sign-in-header">Sign in</p>
          <form onSubmit={handleLogin}>
            <Input
              size="large"
              name="password"
              className="passowrd"
              placeholder="Password"
              type="password"
              value={password || ''}
              onChange={onFieldChange}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />

            <Button className="sign-in-button" htmlType="submit">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TempLoginView;
