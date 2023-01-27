import React, { useEffect, useMemo, useState, useRef } from "react";
import { Search, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../assets/Styles/App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";

let PageSize = 10;

const List = () => {
  const baseUrl = `https://jsonplaceholder.typicode.com/todos`;
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [filter, setFilter] = useState({
    title: "",
    completed: null,
    userId: "",
  });
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchShow, setSearchShow] = useState(false);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const handleDelete = (id) => {
    const val = data.filter((e) => e.id !== id);
    setData(val);
    axios
      .delete(`${baseUrl}/${id}`)
      .then((res) => toast.success(`Todo deleted Successfully`));
  };

  const handleEdit = (id) => {
    const val = data.find((e) => e.id === id);
    navigate("/create", {
      state: {
        data: val,
      },
    });
  };

  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
    if (value === "") {
      fetch();
    } else if (value.toString() === "All") {
      fetch();
    }
  };

  const fetch = () => {
    axios
      .get(`${baseUrl}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = () => {
    axios
      .get(
        `${baseUrl}?${filter.userId && `userId=${filter.userId}`}&${
          filter.completed && `completed=${filter.completed}`
        }&${filter.title && `title=${filter.title}`}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    fetch();
  }, []);

  const filteredUsers = useMemo(() => {
    setSearchShow(true);
    let arr = [];
    if (filter.title) {
      arr = data.filter(
        (item) =>
          item.title.toLowerCase().indexOf(filter.title.toLocaleLowerCase()) >
          -1
      );
      setIsFiltering(true);
    }
    return arr;
  }, [filter.title]);

  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="List-All">
            <div className="List">
              <Form className="form d-flex align-items-center justify-content-center ">
                <Form.Group className="mb-3 margin-right-3 set-dropdown">
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={filter.title}
                    onChange={(e) => {
                      handleChange(e.target.name, e.target.value);
                    }}
                    autoComplete="off"
                  />

                  <Form.Text className="text-muted"></Form.Text>
                  {searchShow && (
                    <div ref={wrapperRef} class="click-text">
                      {filteredUsers.length > 0 ? (
                        <div class="card filterSearchData">
                          <ul class="list-group list-group-flush">
                            {filteredUsers.map((item) => (
                              <li
                                class="list-group-item"
                                onClick={() =>
                                  setFilter({
                                    ...filter,
                                    title: item.title,
                                    userId: item.userId,
                                    completed: item.completed,
                                  })
                                }
                              >
                                {item.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        filter.title !== "" &&
                        filteredUsers.length === 0 &&
                        isFiltering && (
                          <li class="list-group-item">No result found</li>
                        )
                      )}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3 margin-right-3">
                  <Form.Control
                    type="number"
                    name="userId"
                    value={filter.userId}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    placeholder="User Id"
                    autoComplete="off"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <select
                  class="form-select status-DropDown"
                  aria-label="Default select example"
                  name="completed"
                  value={filter.completed}
                  onChange={(e) =>
                    handleChange(e.target.name, JSON.parse(e.target.value))
                  }
                >
                  <option>Select Status</option>
                  <option value={true}>Checked</option>
                  <option value={false}>Unchecked</option>
                </select>
                <Button
                  className="submit"
                  variant="success"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <br />
              </Form>

              {loader === false ? (
                <div className="spinner-border list-side" role="status">
                  <span class="sr-only"></span>
                </div>
              ) : (
                <table className="table ">
                  <thead>
                    <tr className="table-tr">
                      <th>S.no</th>
                      <th>Title</th>
                      <th>UserId</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {currentTableData?.length > 0 ? (
                    currentTableData.map((item, index) => (
                      <tbody border="1px" className="hover" key={index}>
                        <tr>
                          <td>{currentPage * 10 + index + 1 - 10}</td>
                          <td>{item.title}</td>
                          <td>{item.userId}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.completed}
                              disabled={item.completed ? false : true}
                            />
                          </td>

                          <td>
                            <button
                              className="btn btn-primary mx-2"
                              onClick={() => {
                                handleEdit(item.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  ) : (
                    <p className="w-100 mt-4">No result found</p>
                  )}
                </table>
              )}
              {loader === false ? (
                ""
              ) : (
                <Pagination
                  className="pagination-bar justify-content-end"
                  currentPage={currentPage}
                  totalCount={data.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
