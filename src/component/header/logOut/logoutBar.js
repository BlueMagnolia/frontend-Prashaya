import React, { Component } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./logoutBar.css";

export class LogoutBar extends Component {
  render() {
    return (
      <div>
        <header>
          <Row className="head">
            <Col span={6}>
              <img
                src="https://i.ibb.co/sVbj1yN/psi-human-logo.png"
                alt="psi-human-logo"
                height="80"
                width="80"
              />
              <span className="logoHead">PRASHAYA</span>
              &nbsp;&nbsp;
              <span className="logoHead">|</span>
            </Col>
            <Col span={6}></Col>
            <Col span={12}>
              <Row>&nbsp;</Row>
              <Row className="navbar">
                <Link to="/#" className="navbar-home">
                  หน้าหลัก
                </Link>
                &nbsp;
                <Link to="/consult" className="navbar-consult">
                  ผู้ให้คำปรึกษา
                </Link>
                &nbsp;
                <Link to="/registerPatient" className="navbar-member">
                  สมัครสมาชิก
                </Link>
                &nbsp;
                <Link to="/logIn" className="navbar-login">
                  เข้าสู่ระบบ
                </Link>
              </Row>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default LogoutBar;
