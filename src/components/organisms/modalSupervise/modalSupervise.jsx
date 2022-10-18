import React, { useState } from "react";
import { searchFunc } from "../../molecules/search/search";
import {
  getClassNamesFor,
  useSortableData,
} from "../../molecules/sorting/sorting";
import "./modalSupervisee.css";
// import '../masterTable/table.css'
import { useSelector, useDispatch } from "react-redux";
import { selectedSupervisees } from "../../../redux/actions/actions";
/** @description:- Function for select supervisee*/
const ModalSupervise = ({ sender, showSelected, user }) => {
  const dispatch = useDispatch();
  const users = user;
  const checkedSupervises = (e, data) => {
    let newSelectedSupervises = showSelected.slice(0);
    let alreadyAdded = newSelectedSupervises.find(
      (item) => item.id === data.id
    );
    e.target.checked
      ? !alreadyAdded && newSelectedSupervises.push(data)
      : (newSelectedSupervises = newSelectedSupervises.filter(
          (item) => item.id !== data.id
        ));
    dispatch(selectedSupervisees(newSelectedSupervises));
  };
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const supervisor = users.filter((data) => {
    if (data.supervisorId == sender) {
      return true;
    }
  });
  const { requestSort, sortConfig } = useSortableData({
    sortData: supervisor.map((e) => e.supervisee),
    modal: true,
    
  });
  const sender1 = users.find((item) => item.supervisorId == sender);
  const filterData = searchFunc(sender1, search, true);

  return (
    <>
      <div id="scroll" className="scroll-background">
        <form className="form-inline  my-2 my-lg-0 form-container">
          <div className="search-parent">
            <input
              className="search-bar form-control  nosubmit mr-sm-2  "
              id="search"
              type="text"
              onChange={handleSearch}
              placeholder="Search by OID, Name, Industry, Project"
              aria-label="Search"
            />
          </div>
        </form>
        <div className="scroll-parent">
          <div className="scroll-object">
            <table className="supervisee-table table table-bordered responsive-sm">
              <thead className="table-head table-supervisee">
                <tr>
                  <th className="table-supervisee" scope="col">
                    <button
                      type="button"
                      onClick={() => requestSort("id")}
                      className={getClassNamesFor("id", sortConfig)}
                    >
                      OID
                    </button>
                  </th>
                  <th className="table-supervisee" scope="col">
                    <button
                      type="button"
                      onClick={() => requestSort("name")}
                      className={getClassNamesFor("name", sortConfig)}
                    >
                      Name
                    </button>
                  </th>
                  <th className="table-supervisee" scope="col">
                    <button
                      type="button"
                      onClick={() => requestSort("industry")}
                      className={getClassNamesFor("industry", sortConfig)}
                    >
                      Industry
                    </button>
                  </th>
                  <th className="table-supervisee" scope="col">
                    <button
                      type="button"
                      onClick={() => requestSort("project")}
                      className={getClassNamesFor("project", sortConfig)}
                    >
                      Project
                    </button>
                  </th>
                  <th className="table-supervisee text-center" scope="col">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="table-index" scope="row">
                        {data.id}
                      </td>
                      <td>{data.name}</td>
                      <td>{data.industry}</td>
                      <td>{data.project}</td>
                      <td className="text-center">
                        <input
                          className="check-item"
                          type={"checkbox"}
                          onClick={(e) => checkedSupervises(e, data)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSupervise;
