
import React, { Component } from "react";
import { Button, Input, Tabs } from "antd";
import Logo from "components/logo/white";
import { SearchOutlined, PoweroffOutlined } from '@ant-design/icons';
import EquityCalculator from '../EquityCalculator/index';
import CanyonChart from '../CanyonChart/index';
import "antd/dist/antd.css";
import './style.scss';
import PayoffChart from "../PayoffChart";
const { TabPane } = Tabs;


export class LandingPage extends Component {
  
  render() {
    return (
      <div className="landing-page-container">
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
            this.props.history.push("/login") }}>Logout <PoweroffOutlined /></Button>
        </div>
        <div className="home-body">
          <div className="home">
            <Tabs
              centered={true}
              defaultActiveKey="1"
            >
              <TabPane tab="Equity Calculator" key="1">
                <EquityCalculator />
              </TabPane>
              <TabPane tab="Canyon Chart" key="2">
                <CanyonChart />
              </TabPane>
              <TabPane tab="Payoff Chart" key="3">
                <PayoffChart />
              </TabPane>
            </Tabs>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default LandingPage;