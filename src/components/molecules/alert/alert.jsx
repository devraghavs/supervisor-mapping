import React from "react";
import { Alert } from "react-bootstrap";
/** @description:- Function to show the alert when there is some error*/
function AlertDismissible({ show, variant, state, children,className }) {
  setTimeout(() => {
     state(false);
  }, 5000);
  return (
    <>
      <Alert
        show={show}
        variant={variant}
        className={className}
        onClose={() => state(false)}
        dismissible
      >
        <Alert.Heading></Alert.Heading>
        <h5>{children}</h5>
      </Alert>
    </>
  );
}
export default AlertDismissible;
