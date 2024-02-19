import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined,LockOutlined,FacebookOutlined,GoogleOutlined, LinkedinOutlined } from '@ant-design/icons';
import Logo from 'components/logo/dark';
import "antd/dist/antd.css";

import './Login.scss';

import { UserLogin, LoginProps } from './Login.props';

const LoginView: React.FC<LoginProps> = (props: LoginProps) => {
  const onFieldChange = (e: any) => {
    props.handleChange(e.target.name as keyof UserLogin, e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <div className="left">
          <div className="left-header">
            <Logo color="#ffffff" />
          </div>
          <div className="center-layout">
            <p className="Sign-in-header">Sign in</p>

            <Input
              size="large"
              name="username"
              className="username"
              placeholder="Username"
              value={props.login?.username || ''}
              onChange={onFieldChange}
              prefix={<UserOutlined />}
            />
            <Input
              size="large"
              name="password"
              className="passowrd"
              placeholder="Password"
              type="password"
              value={props.login?.password || ''}
              onChange={onFieldChange}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />

            <Button className="sign-in-button" onClick={props.handleLogin}>
              Sign In
            </Button>
            {/* <p className="register-header">
              Don't have an account?
              <Button className="register-button" type="link"  onClick={()=>{this.props.history.push("/register")}}>
              Register
            </Button></p> */}
            <p className="other-signin-header">or sign in with</p>
            <div className= "other-signin">
              <GoogleOutlined className="google-icon" onClick={()=>{
                
              }} />

              <LinkedinOutlined className="linked-in-icon" onClick={()=>{
                
              }}/>  

              <FacebookOutlined className="facebook-icon" onClick={()=>{
                
              }}/>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-header">
            <header className="prism-header">PRISM</header>
            <header className="work-header">Work at </header>
          </div>
          <div className="center-layout">
          </div>
        </div>
      </div>
      <div className="login-footer">
        <div className="content">
          <p className="general-enquires">General Enquiries:</p>
          <p>support@prism.martkets</p>
          <p>© 2021 Prism Markets. All rights reserved.</p>
          <p>PRISM MARKETS Limited is a company incorporated and registered in xxx (Company number: xxxxx) with its registered address at: Level 14, 167 Macquarie St, Sydney, NSW, 2000</p>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
