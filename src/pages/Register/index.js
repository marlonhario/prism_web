import React, { Component } from "react";
import { Input,Button, Form , message} from 'antd';
import { UserOutlined,LockOutlined,MailOutlined } from '@ant-design/icons';
import Logo from "components/logo/dark";
import "./style.scss"

const axios = require('axios');

export class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      email:"",
      confirmPassword:"",
    }
}

onChangeUsername = (e) =>{
  this.setState({
    username: e.target.value
  });
}
onChangePassword = (e) =>{
  this.setState({
    password: e.target.value
  });
}

onChangeemail = (e) =>{
  this.setState({
    email: e.target.value
  });
}
onChangeConfirmPassword = (e) =>{
 
  this.setState({
    confirmPassword: e.target.value
  });
}

  onRegister = ()=>{
     
      const {username, password, email} = this.state;
      let data = {
        username: username,
        password: password,
        email: email
      }

      let config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      axios.post("/register",data, config)
      .then(res=>{
        message.success("User registered successfully")
        window.location.href = "/login"
      })
      .catch((error) =>{
        message.error("Username already exists")
    })
  }

  render() {
    const {username, password,email,confirmPassword} = this.state;
    return (
      <div className="register-container">
        <div className="register-body">
          <div className="left">
            <div className="left-header">
              <Logo />
            </div>
            <div className="center-layout">
                <p className="register-top-header">Register</p>
                <Form
                 onFinish={this.onRegister}
                >
                <Form.Item
                className="username"
                 name="username"
                 rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                <Input
                  size="large"
                  placeholder=" Username"
                  onChange={this.onChangeUsername}
                  value={username}
                  prefix={<UserOutlined />}
                />
                </Form.Item>
                <Form.Item
                 className="username"
                 name="Email"
                 rules={[{
                  type: 'email',
                  message: 'Please enter valid Email!',
                },{ required: true, message: 'Please enter your Email!' }]}
                >
                <Input
                  size="large"
                  placeholder=" Email"
                  onChange={this.onChangeemail}
                   value={email}
                  prefix={<MailOutlined />}
                />
                </Form.Item>
                <Form.Item
                className="passowrd"
                 name="passowrd"
                 rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                <Input.Password
                  size="large"
                  placeholder=" Password"
                  onChange={this.onChangePassword}
                  value={password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
                </Form.Item>
                <Form.Item
                 className="passowrd"
                 name="confirmPassword"
                 rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  () => ({
                    validator(_, value) {
                      if (!value ||  password=== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
                >
                <Input.Password
                  size="large"
                  placeholder=" Confirm Password"
                  onChange={this.onChangeConfirmPassword}
                   value={confirmPassword}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
                </Form.Item>
                <Form.Item>
                <Button className="register-button" htmlType="submit">Register</Button>
                </Form.Item>
                </Form>
                <p className="sign-in-header">
                  Already have an account?
                  <Button className="sign-in-button" type="link" onClick={()=>{this.props.history.push("/login")}}>
                    Sign in
                  </Button>
                </p>
            </div>
          </div>
          <div className="right">
            <div className="right-header">
              <header className="prism-header">PRISM</header>
              <header className="work-header">Work at </header>
            </div>
            <div className="center-layout"></div>
          </div>
        </div>
        <div className="login-footer">
          <div className="content">
            <p className="general-enquires">General Enquiries:</p>
            <p>support@prism.martkets</p>
            <p>© 2021 Prism Markets. All rights reserved.</p>
            <p>
              PRISM MARKETS Limited is a company incorporated and registered in
              xxx (Company number: xxxxx) with its registered address at: Level
              14, 167 Macquarie St, Sydney, NSW, 2000
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
