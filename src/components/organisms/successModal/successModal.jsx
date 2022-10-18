import React from "react";
import CustomModal from "../../molecules/modal/modal";
import { Button } from "react-bootstrap";
import "./successModal.css";
import { useDispatch } from "react-redux";
import { selectedSupervisees } from "../../../redux/actions/actions";
/** @description:- Function for Success model*/
const SuccessModal = ({
  show,
  close,
  transferArray,
  reciverArray,
  unCheck,
  selectedSupervisor
}) => {
  const dispatch=useDispatch();
  const afterSuccessTransfer = () => {
    selectedSupervisor("default");
    dispatch(selectedSupervisees([]));
    transferArray = transferArray.splice(0, transferArray.length);
    reciverArray = reciverArray.splice(0, reciverArray.length);
    unCheck();
    close();
  };
  return (
    <>
      <CustomModal
        show={show}
        close={afterSuccessTransfer}
        title={"SUCCESS"}
        className={"sucessmessage"}
      >
        <div className="sucessparent">
          <div className="sucessmodalparent">
            <div>
              <div className="sucessmodal">
                <img
                  className="sucess-image"
                  src={process.env.PUBLIC_URL + "/images/graphic.svg"}
                  alt="sucess message"
                  width={200}
                />
              </div>
              <p className="sucess-text text-center">
                You have successfully made the changes.
              </p>
              <div className="sucessmodal">
                <div className="done-download">
                <Button
                  className="sucess-btn"
                  variant="primary "
                  onClick={() => {
                    afterSuccessTransfer();
                  }}
                >
                  Done
                </Button>
                <Button className="sucess-btn">Download the changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default SuccessModal;
