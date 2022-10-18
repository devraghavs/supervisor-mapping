import React from "react";
import { Modal } from "react-bootstrap";
/** @description:- Function for creating Custom modal*/
const CustomModal = ({
  show,
  close,
  children,
  title,
  backdrop = "true",
  closeButton = true,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          close();
        }}
        backdrop={backdrop}
      >
        <Modal.Header closeButton={closeButton}>
          <Modal.Title className="tittle">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body> {children}</Modal.Body>
      </Modal>
    </>
  );
};
export default CustomModal;
