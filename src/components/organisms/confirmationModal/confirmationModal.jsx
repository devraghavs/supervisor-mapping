import React, { useState, useEffect } from "react";
import CustomModal from "../../molecules/modal/modal";
import { FaTrash } from "react-icons/fa";
import { Button, Accordion } from "react-bootstrap";
import SuccessModal from "../successModal/successModal";
import CustomAccordion from "../../molecules/accordion/accordion";
import "./confirmationModal.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedSupervisees,
  transferArrayAction,
  reciverArrayAction,
} from "../../../redux/actions/actions";
/** @description:- Function for creating Confirm model screen */
const ConfirmModal = ({
  show,
  close,
  deleteSupervisee,
  sender,
  transfer,
  closeTransferModal,
  hideTransferModal,
  unCheck,
  removeTempData,
  selectedSupervisor,
  addReciverToAddSupervisees,
  setDisableSelect,
  deleteReciverSupervisor,
}) => {
  const dispatch = useDispatch();
  const transferArray = useSelector(
    (state) => state.transferArray.transferArray
  );
  const reciverArray = useSelector(
    (state) => state.selectedReciver.reciverArray
  );
  const [successModal, setSuccessModal] = useState(false);
  const toggleSuccess = () => setSuccessModal(!successModal);
  const hideConfirmModal = () => {
    toggleSuccess();
    close();
  };

  const closeConfirmModal = () => {
    transferArray.map(
      (item) =>
        (sender.supervisee = [...sender.supervisee, ...item.transferData])
    );
    dispatch(transferArrayAction([]));
    dispatch(reciverArrayAction([]));
    unCheck();
    selectedSupervisor("default");
    dispatch(selectedSupervisees([]));
    setDisableSelect(false);
    close();
  };

  const addSupervises = () => {
    dispatch(selectedSupervisees([]));
    removeTempData();
    hideTransferModal();
    close();
  };

  const addMore = () => {
    selectedSupervisor("default");
    dispatch(selectedSupervisees([]));
    setDisableSelect(false);
    hideTransferModal();
    close();
  };
  return (
    <>
    
      <CustomModal
        show={show}
        close={closeConfirmModal}
        title={"SUMMARY"}
        backdrop={"false"}
      >
        {transferArray.length === 0 ? (
          <h3 className="text-center">No supervisee to transfer</h3>
        ) : (
          <Accordion
            className="my-1"
            defaultActiveKey={transferArray.length - 1}
          >  
          <span className="count-heading head-supervisee">
          New Supervisee Count for {sender.supervisor}:
        </span>
        <span> {sender.supervisee.length}</span>
            {transferArray.map((item, index) => {
              return (<>
                <CustomAccordion
                  header={`Transfering from ${sender.supervisor} to ${item.reciverName.supervisor}`}
                  eventKey={index}
                  key={index}
                >
                  <div className="flex">
                    

                    <h6 className="count-heading">
                      New Supervisee Count for {item.reciverName.supervisor}:
                      <span>
                        {" "}
                        {item.reciverName.supervisee.length +
                          item.transferData.length}
                      </span>
                    </h6>
                  </div>

                  <table className="confirm-table table table-bordered responsive-sm">
                    <thead className="table-head thead-light">
                      <tr>
                        <th className="table-head" scope="col">
                          S.No
                        </th>
                        <th className="table-head" scope="col">
                          Name
                        </th>
                        <th className="table-head" scope="col">
                          Industry
                        </th>
                        <th className="table-head" scope="col">
                          Project
                        </th>
                        <th className="table-head" scope="col">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.transferData.map((data, index) => {
                        return (
                          <tr key={index}>
                            <th className="table-index" scope="row">
                              {index + 1}
                            </th>
                            <td>{data.name}</td>
                            <td>{data.industry}</td>
                            <td>{data.project}</td>
                            <td className="text-center trash-icon">
                              <FaTrash
                                onClick={(e) => {
                                  deleteSupervisee(data, item.reciverId);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="edit-delete-btn">
                    <button
                      className="edit-change"
                      onClick={() => {
                        addSupervises();
                        addReciverToAddSupervisees(item.reciverId);
                      }}
                      disabled={sender.supervisee.length === 0 && true}
                    >
                      Edit
                    </button>
                    <Button
                      className="delete-btn"
                      onClick={() => {
                        deleteReciverSupervisor(item, item.reciverId);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </CustomAccordion>
                </>
              );
            })}
          </Accordion>
        )}

        <div className="mt-4 mb-0">
          <Button
            className="btn btn-primary theme-btn float-end"
            onClick={() => {
              transfer();
              hideConfirmModal();
            }}
            disabled={transferArray.length === 0 && true}
          >
            Confirm
          </Button>
          <button
            className="revert-btn"
            onClick={() => {
              addMore();
            }}
            disabled={
              reciverArray.length === 0 ||
              (sender && sender.supervisee.length === 0)
                ? true
                : false
            }
          >
            Add More
          </button>
        </div>
      </CustomModal>
      <SuccessModal
        show={successModal}
        close={toggleSuccess}
        toggleConfirm={close}
        transferArray={transferArray}
        closeTransferModal={closeTransferModal}
        reciverArray={reciverArray}
        unCheck={unCheck}
        selectedSupervisor={selectedSupervisor}
      />
    </>
  );
};
export default ConfirmModal;
