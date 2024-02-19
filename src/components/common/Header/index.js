import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Button } from "antd";
import cn from 'classnames';
import Logo from "../../logo/white";
import { UserOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./styles.scss"

// Main Header component which comprises of event to navigate between multiple tabs and perform Log out actions
export class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeTab:'perspective'
    }
  }

  onChangeTab =(tabName) =>{
    this.setState({
      activeTab: tabName
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className="header flex flex-row w-full items-center">
        <a href="/prism-perspective">
        <div className="prism-logo">
          <Logo />
        </div>
        </a>
        <div className="header-content w-3/5 justify-around flex">
          <Button
            type='link'
            className={cn("link",{'active-tab' : activeTab === 'perspective'})}
            onClick={() => {
              this.onChangeTab("perspective");
              this.props.triggerETAShowCase();
            }}
          >
            Prism Perspective
          </Button>
          <Button
            type='text'  
            className={cn("link",{'active-tab' : activeTab === 'equity-converter'})}
            onClick={() => {
              this.onChangeTab("equity-converter");
              this.props.triggerEquityConverter();
            }}>Equity Optimiser</Button>
          <Button type='text' disabled className="link">Buy ETAs</Button>
        </div>
        <div>
        <div className='flex items-center pr-6'>
          <Button
            type='link'
            className="link"
            onClick={() => {
              localStorage.removeItem("username")
              this.props.history.push("/login")
            }}>
              Logout
          </Button>
          <div > <UserOutlined className='user-icon'/></div>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;