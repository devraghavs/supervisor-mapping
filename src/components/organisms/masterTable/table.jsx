import React, { useEffect, useState, useMemo } from "react";
import * as ReactBootStrap from "react-bootstrap";
import constants from "../../../constants/index";
import TransferModal from "../modalTransferScreen/modal";
import "./table.css";
import {BiSend} from "react-icons/bi"
import Pagination from "./Pagination";
import AlertDismissible from "../../molecules/alert/alert";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { searchFunc } from "../../molecules/search/search";
import {
  getClassNamesFor,
  useSortableData,
} from "../../molecules/sorting/sorting";
import {
  loadSupervisorsStart,
  reciverArrayAction,
  senderAction,
} from "../../../redux/actions/actions";

const Table = () => {
  const { tableHeadings } = constants;
  const users = useSelector((state) => state.data.supervisor);
  const {
    oracleId,
    supervisorName,
    careerStage,
    projectName,
    industryName,
    superviseesCount,
    receiverName,
    transfer,
  } = tableHeadings;
  const dispatch = useDispatch();
  const recivers = useSelector((state) => state.selectedReciver.reciverArray);
  const { supervisor, loading } = useSelector((state) => state.data);
  const [supervisors, setSupervisors] = useState([]);
  const sender = useSelector((state) => state.senderObject);
  const [showState, setShowState] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const toggle = () => setShowState(!showState);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const setPage = (pageData) => {
    setPostsPerPage(pageData);
  };
  // console.log(supervisor);
  const unCheck = () => {
    let refreshTable = supervisor.map((item) => {
      item.checked = false;
      return item;
    });
    setSupervisors(refreshTable);
  };

  useEffect(() => {
    dispatch(loadSupervisorsStart());

    setSupervisors(supervisor);
  }, []);

  const headers = [
    { label: "OId", key: "supervisorId" },
    { label: "Supervisor", key: "supervisor" },
    { label: "Career Stage", key: "title" },
    { label: "Project", key: "project" },
    { label: "Industry", key: "industry" },
    { label: "Supervisee", key: "supervisee" },
  ];

  let data = users.map((item) => ({
    supervisor: item.supervisor,
    title: item.title,
    project: item.project,
    industry: item.industry,
    seniorityLevel: item.seniorityLevel,
    supervisorId: item.supervisorId,
    supervisee: item.supervisee.length,
  }));

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Supervisors_Report.csv",
  };

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const { tables, requestSort, sortConfig } = useSortableData({
    sortData: supervisor,
    modal: false,
    activeBtn: paginate,
  });
  const searchData = searchFunc(tables, search);
  const currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <ReactBootStrap.Spinner
        className="loading"
        animation="border"
        role="status"
        variant="secondary"
      >
        <span className="visually-hidden text-center">Loading...</span>
      </ReactBootStrap.Spinner>
    );
  }

  const clickHandler = (id, name) => {
    // console.log(recivers.length);
    if (recivers.length === 0) {
      setShowAlert(true);
    } else {
      dispatch(
        senderAction({
          id: id,
          name: name,
        })
      );
      toggle();
    }
  };

  const checkedSupervisors = (e, data) => {
    let newReciver = recivers.slice(0);
    if (e.target.checked) {
      setShowAlert(false);
      newReciver.push(data);
    } else {
      newReciver = recivers.filter(
        (item) => item.supervisorId !== data.supervisorId
      );
    }
    dispatch(reciverArrayAction(newReciver));
  };

  let searchPlaceholder = `Search by ${oracleId}, ${supervisorName}, ${careerStage}, ${projectName}, ${industryName}, ${superviseesCount}`;
  return (
    <>
      <AlertDismissible
        className="table-alert"
        show={showAlert}
        variant={"danger"}
        state={setShowAlert}
      >
        Select Receivers
      </AlertDismissible>
      <TransferModal
        showq={showState}
        close={toggle}
        sender={sender}
        unCheck={unCheck}
      ></TransferModal>
      <div className="container table-component table-height">
        <form className="form-inline  my-2 my-lg-0 form-container ">
          <input
            className="form-control nosubmit mr-sm-2 form-width "
            id="search"
            type="text"
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            aria-label="Search"
          />
          <CSVLink className="download-btn btn btn-primary" {...csvReport}>
            Download
          </CSVLink>
        </form>

        <div className="scroll-parent">
          <ReactBootStrap.Table
            striped
            bordered
            hover
            className="main-table table text-center"
            // size="sm"
          >
            <thead className="heading table-head align-top">
              <tr style={{ fontSize: "1.125rem" }}>
                <th className="table-heading oid">
                  <button
                    type="button"
                    onClick={() => requestSort("supervisorId")}
                    className={getClassNamesFor("supervisorId", sortConfig)}
                  >
                    {oracleId}
                  </button>
                </th>
                <th className="table-heading name-width">
                  {" "}
                  <button
                    type="button"
                    onClick={() => requestSort("supervisor")}
                    className={getClassNamesFor("supervisor", sortConfig)}
                  >
                    {supervisorName}
                  </button>{" "}
                </th>
                <th className="table-heading career-width">
                  <button
                    type="button"
                    onClick={() => requestSort("title")}
                    className={getClassNamesFor("title", sortConfig)}
                  >
                    {careerStage}
                  </button>
                </th>
                <th className="table-heading ">
                  {" "}
                  <button
                    type="button"
                    onClick={() => requestSort("project")}
                    className={getClassNamesFor("project", sortConfig)}
                  >
                    {projectName}
                  </button>
                </th>
                <th className="table-heading industry-width">
                  <button
                    type="button"
                    onClick={() => requestSort("industry")}
                    className={getClassNamesFor("industry")}
                  >
                    {industryName}
                  </button>
                </th>
                <th className="table-heading count-width">
                  {" "}
                  <button
                    type="button"
                    onClick={() => requestSort("supervisee")}
                    className={getClassNamesFor("supervisee", sortConfig)}
                  >
                    {superviseesCount}
                  </button>
                </th>
                <th className="table-heading receiver-width">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("checked");
                    }}
                    className={getClassNamesFor("checked", sortConfig)}
                  >
                    {receiverName}
                  </button>
                </th>
                <th className="table-heading transfer-width">{transfer}</th>
              </tr>
            </thead>

            <tbody>
              {searchData.length > 0 ? (
                currentPosts.map((item, index) => (
                  <tr key={item.supervisorId} style={{ fontSize: "0.938rem" }}>
                    <td
                      data-toggle="tooltip"
                      title={item.supervisorId}
                      style={{ textAlign: "left" }}
                    >
                      {item.supervisorId}
                    </td>
                    <td
                      data-toggle="tooltip"
                      title={item.supervisor}
                      className="mx-5"
                    >
                      {item.supervisor}{" "}
                    </td>
                    <td data-toggle="tooltip" title={item.title}>
                      {item.title}
                    </td>
                    <td data-toggle="tooltip" title={item.project}>
                      {item.project}
                    </td>
                    <td data-toggle="tooltip" title={item.industry}>
                      {item.industry}
                    </td>
                    <td
                      style={
                        item.supervisee.length > 5
                          ? { backgroundColor: "red", color: "white" }
                          : item.supervisee.length > 1
                          ? { backgroundColor: "yellowgreen", color: "white" }
                          : { backgroundColor: "#FFD580", color: "white" }
                      }
                      className="text-center"
                    >
                      {item.supervisee.length}{" "}
                    </td>
                    <td className=" text-center">
                      {" "}
                      <label>
                        <input
                          type="checkbox"
                          className="select-checkbox"
                          checked={item.checked}
                          disabled={item.supervisee.length >= 6}
                          onChange={(event) => {
                            // const newSupervisors = supervisors.slice(0);
                            // newSupervisors[index].checked = !item.checked;
                            // setSupervisors(newSupervisors);
                            item.checked = !item.checked;
                            checkedSupervisors(event, item);
                          }}
                        ></input>
                        <span className="checkit"></span>
                      </label>
                    </td>
                    <td className=" text-center">
                      <button
                        className="background-button"
                        id={index}
                        data-toggle="tooltip"
                        title="Send"
                        disabled={item.checked}
                        onClick={() =>
                          clickHandler(item.supervisorId, item.supervisor)
                        }
                      >
                        <BiSend />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="mx-auto text-center">
                  <h5 className="text-center">No Supervisor Found</h5>
                </div>
              )}
            </tbody>
          </ReactBootStrap.Table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={supervisor.length}
          paginate={paginate}
          currentPage={currentPage}
          setPages={setPage}
          setCurrentPages={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Table;
