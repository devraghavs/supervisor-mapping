import React, { useState, useEffect } from "react";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  setPages,
  currentPage,
}) => {
  const pageNumbers = [];

  const [active, setActive] = useState(1);
  console.log(active);
  console.log("currentPage", currentPage);

  useEffect(() => {
    setActive(currentPage);
  });

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onClickHandlePage = (e) => {
    setPages(e.target.value);
    paginate(1);
    setActive(1);
    console.log(e.target.value);
  };

  return (
    <div className="d-flex flex-row-reverse mt-2 mb-3">
      <div className="p-2 ">
        <select
          className="form-select"
          onChange={onClickHandlePage}
          aria-label="Default select example"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="d-flex flex-row  p-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => {
              paginate(number);
              setActive(number);
            }}
            className={
              active === number ? "mx-1 btn btn-primary " : "mx-1 page-link"
            }
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
