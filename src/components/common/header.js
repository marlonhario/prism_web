import React from 'react';
import { Button, Input } from "antd";
import Logo from "../logo/white";
import { SearchOutlined, PoweroffOutlined } from '@ant-design/icons';
import './headerStyles.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="prism-svg"><Logo /></div>
      <Button className="prism-details">ABOUT</Button>
      <Button className="prism-details">{"MEDIA & RESOURCES"}</Button>
      <Button className="prism-details">CONTACT</Button>
      <div className="search">
        <Input className="search-input" placeholder=" SEARCH" ></Input>
        <SearchOutlined className="search-icon" />
      </div>
      <p className="welcome-user">{localStorage.getItem("username")}</p>
      <Button className="logut" onClick={() => {
        localStorage.removeItem("username")
        this.props.history.push("/login")
      }}>Logout <PoweroffOutlined /></Button>
    </div>
  );
}

export default Header;