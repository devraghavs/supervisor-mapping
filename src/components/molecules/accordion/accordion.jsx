import React from "react";
import { Accordion } from "react-bootstrap";
import "./accordion.css";
/** @description:- Function for custom accordion*/
const CustomAccordion = ({ header, defaultActiveKey, eventKey, children }) => {
  return (
    
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header className="header">{header}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    
  );
};

export default CustomAccordion;
