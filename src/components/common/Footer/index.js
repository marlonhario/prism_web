import React, { Component } from 'react';
import { Button } from "antd";
import "antd/dist/antd.css";
import "./styles.scss"

export class Footer extends Component {
  render() {
    return (
      <div className="footer flex flex-row w-full items-center">
        <div className="footer-left-content ">
          <Button type='link' className="link">MEDIA + RESOURCES</Button>
          <Button type='link' className="link">ABOUT</Button>
          <Button type='link' className="link">CONTACT</Button>
        </div>
        <div className="footer-right-content justify-end ml-auto pr-10">
          <Button type='link' className="link">PRIVACY</Button>
          <Button type='link' className="link">LEGAL</Button>
          <Button type='link' className="link">DISCLAIMER</Button>
          <Button type='link' className="link">&copy; PRISM MARKETS 2022</Button>
        </div>
      </div>
    );
  }
}

export default Footer;