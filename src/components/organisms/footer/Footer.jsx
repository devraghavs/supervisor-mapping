import React from "react";
import { Row, Col } from "react-bootstrap";
import "./footer.css";

/** @description:-  Function for Footer component*/
const Footer = () => {
  return (
    <footer className="footer">
      <Row className="footer-row">
        <Col className="text-center py-3 footer">
          Copyright &copy; March-React-Team2022
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
