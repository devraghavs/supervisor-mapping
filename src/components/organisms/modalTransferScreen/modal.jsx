import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AlertDismissible from "../../molecules/alert/alert";
import CustomModal from "../../molecules/modal/modal";
import ConfirmModal from "../confirmationModal/confirmationModal";
import Modalsupervise from "../modalSupervise/modalSupervise";
import { useSelector, useDispatch } from "react-redux";
import {
  reciverArrayAction,
  transferArrayAction,
} from "../../../redux/actions/actions";
import "./modalTransfer.css";
/** @description:- Function for confirm model*/
const TransferModal = ({ showq, close, sender, unCheck }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.supervisor);
  const reciver = useSelector((state) => state.selectedReciver.reciverArray);
  const [confirmModal, setConfirmModal] = useState(false);
  const [supervisor, selectedSupervisor] = useState("default");
  
  const showSelected = useSelector(state => state.selectedSupervisees.showSelected)
  console.log(showSelected);
  const [showAlert, setShowAlert] = useState(false);
  const transferArray = useSelector(state => state.transferArray.transferArray)
  console.log(transferArray);
 
  const [reciverName, setReciverName] = useState({});
  const [disableSelect, setDisableSelect] = useState(false);

  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const transferArrayData = () => {
    let alreadyExist = transferArray.find(
      (item) => item.reciverId === supervisor
    );
    if (alreadyExist) {
      transferArray.map((supervisee) => {
        supervisee.reciverId === supervisor &&
          (supervisee.transferData = [
            ...supervisee.transferData,
            ...showSelected,
          ]);
      });
    } else {
      dispatch(
        transferArrayAction([
          ...transferArray,
          {
            reciverId: supervisor,
            reciverName: reciverName,
            transferData: showSelected,
          },
        ])
      );
    }
  };
  const nameReciver = (e) => {
    e.preventDefault();
    users.map((data) => {
      data.supervisorId == e.target.value && setReciverName(data);
    });
  };

  const select1 = (e) => {
    e.preventDefault();
    e.target.value
      ? selectedSupervisor(e.target.value)
      : selectedSupervisor(null);
    if (e.target.value || e.target.value !== "selectReciver") {
      setShowAlert(false);
    }
  };

  const toggle3 = () => {
    let senderData = users.find((item) => item.supervisorId == sender.id);
    transferArray.length &&
      transferArray.map(
        (item) =>
          (senderData.supervisee = [
            ...senderData.supervisee,
            ...item.transferData,
          ])
      );
    dispatch(reciverArrayAction([]));
    unCheck();
    setDisableSelect(false);
    selectedSupervisor("default");
    dispatch(transferArrayAction([]));
    close();
  };

  const removeDataFromSender = (transferData) => {
    let senderData = users.find((data) => data.supervisorId == sender.id);
    transferData.forEach((data) => {
      let res = senderData.supervisee.filter((item) => {
        if (data.id != item.id) {
          return item;
        }
      });
      senderData.supervisee = res;
    });
  };

  const removeReciver = () => {
    let newReciverArray = reciver.slice(0);
    transferArray.map((item) => {
      newReciverArray = newReciverArray.filter(
        (reciver) => reciver.supervisorId != item.reciverId
      );
    });
    dispatch(reciverArrayAction(newReciverArray));
  }

  const removeTempData = () => {
    let senderData = users.find((data) => data.supervisorId == sender.id);
    // console.log(senderData.supervisee);
    // console.log(transferArray);
    transferArray.map((item) => {
      item.transferData.forEach((supervisee) => {
        senderData.supervisee = senderData.supervisee.filter(
          (data) => data.id != supervisee.id
        );
      });
    });
  };

  const checkError = () => {
    if (
      !supervisor ||
      supervisor == "select Receiver" ||
      supervisor === "default" ||
      showSelected.length === 0
    ) {
      setShowAlert(true);
      return;
    } else {
      transferArrayData();
      transferArray.length && removeReciver();
      toggleConfirmModal();
      close();
    }
  };

  useEffect(() => {
    if (transferArray.length) {
      removeTempData();
      removeReciver();
    }
  }, [transferArray]);

  // console.log(transferArray);

  const transfer = () => {
    users.map((data) =>
      transferArray.forEach((item) => {
        data.supervisorId == item.reciverId &&
          (data.supervisee = [...data.supervisee, ...item.transferData]);
        removeDataFromSender(item.transferData);
      })
    );
    setDisableSelect(false);
  };

  const addReciverToAddSupervisees = (reciverId) => {
    let dataToAdd = users.find((item) => item.supervisorId == reciverId);
    let conditionAdd = reciver.find((item) => item.supervisorId == reciverId);
    !conditionAdd && dispatch(reciverArrayAction([...reciver, dataToAdd]));
    selectedSupervisor(reciverId);
    setDisableSelect(true);
  };
  
  const deleteSuperviseToTransfer = (data, reciverId) => {
    let newTransferArray = transferArray.slice(0);
    // console.log(reciverId);
    newTransferArray.map((item) => {
      if (item.reciverId === reciverId) {
        let senderData = users.find((data) => data.supervisorId == sender.id);
        let deletedItem = item.transferData.find(
          (supervisee) => supervisee.id === data.id
        );
        item.transferData = item.transferData.filter(
          (supervisee) => supervisee.id !== data.id
        );
        let supreviseeCondition = senderData.supervisee.find(
          (item) => item.id == data.id
        );
        !supreviseeCondition && senderData.supervisee.push(deletedItem);

        if (item.transferData.length === 0) {
          let dataToAdd = users.find((item) => item.supervisorId == reciverId);
          newTransferArray = newTransferArray.filter(
            (item) => item.reciverId !== reciverId
          );
          let conditionAdd = reciver.find(
            (item) => item.supervisorId == reciverId
          );
          !conditionAdd &&
            dispatch(reciverArrayAction([...reciver, dataToAdd]));
        }
      }
    });
    dispatch(transferArrayAction(newTransferArray));
  };

  const deleteReciverSupervisor = (data, reciverId) => {
    let newTransferArray = transferArray.slice(0);
    let senderData = users.find((data) => data.supervisorId == sender.id);
    senderData.supervisee = [...senderData.supervisee, ...data.transferData];
    let dataToAdd = users.find((item) => item.supervisorId == reciverId);
    newTransferArray = newTransferArray.filter(
      (item) => item.reciverId !== reciverId
    );
    let conditionAdd = reciver.find((item) => item.supervisorId == reciverId);
    !conditionAdd && dispatch(reciverArrayAction([...reciver, dataToAdd]));
    dispatch(transferArrayAction(newTransferArray));
  };

  return (
    <>
      <CustomModal show={showq} close={toggle3} title={"SELECT RECEIVER"}>
        <AlertDismissible
          show={showAlert}
          variant={"danger"}
          state={setShowAlert}
        >
          {!supervisor ||
          supervisor === "select Receiver" ||
          supervisor === "default"
            ? "Select Receiver"
            : showSelected.length === 0 && "Select Supervisee"}
        </AlertDismissible>
        <div>
          <p className="supervisor">Supervisor: {sender.name}</p>
          <div className="parentcontainer" id="parentselection">
            <div className="dropdown-container">
              <div className="dropdown">
                <select
                  className="form-select selectpicker"
                  id="selectbar"
                  aria-label="Default select example"
                  onChange={(e) => {
                    select1(e);
                    nameReciver(e);
                  }}
                  disabled={disableSelect}
                >
                  <option className="option-select" value={"default"}>
                    {!supervisor || supervisor === "default"
                      ? "Select Receiver"
                      : reciver.map((data) => {
                          if (data.supervisorId == supervisor) {
                            return data.supervisor;
                          }
                        })}
                  </option>
                  {reciver.map((data) => (
                    <option key={data.supervisorId} value={data.supervisorId}>
                      {data.supervisor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {supervisor &&
        supervisor !== "default" &&
        supervisor !== "selectReciver" ? (
          <Modalsupervise
            sender={sender.id}
            showSelected={showSelected}
            user={users}
          />
        ) : null}
        <div>
          <div className="d-flex flex-row-reverse bd-highlight mt-3">
            <Button
              className="theme-btn"
              variant="primary"
              onClick={() => {
                checkError();
                removeTempData();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </CustomModal>
      <ConfirmModal
        show={confirmModal}
        close={toggleConfirmModal}
        deleteSupervisee={deleteSuperviseToTransfer}
        sender={users.find((data) => data.supervisorId == sender.id)}
        transfer={transfer}
        closeTransferModal={toggle3}
        hideTransferModal={close}
        unCheck={unCheck}
        removeTempData={removeTempData}
        removeReciver={removeReciver}
        selectedSupervisor={selectedSupervisor}
        addReciverToAddSupervisees={addReciverToAddSupervisees}
        setDisableSelect={setDisableSelect}
        deleteReciverSupervisor={deleteReciverSupervisor}
      />
    </>
  );
};

export default TransferModal;
