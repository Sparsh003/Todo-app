import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo1 from "../assets/Img/logo1.jpg";
import "../assets/Styles/App.css";

function Create() {
  const location = useLocation();
  const baseUrl = `https://jsonplaceholder.typicode.com/todos`
  const { title, userId, completed, id } =
    (location && location.state && location.state.data) || {};

  const [inputData, setInputData] = useState({
    title: title ? title : "",
    userId: userId ? userId : "",
    completed: completed ? completed : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const url = id
      ? axios.put(`${baseUrl}/${id}`, inputData)
      : axios.post(`${baseUrl}`, inputData);

    url
      .then((res) => {
        toast.success(
          `${id ? "Todo updated succesfully" : "Todo added successfully"}`
        );
        setInputData({ title: "", userId: "", status: "" });
      })
      .catch((error) => toast.error(`Something went wrong`));
  }

  return (
    <>
      <div className="Container-fluid-1 form">
        <div className="formPage d-flex">
          <div className="col-4 mt-2">
            <Form className="form">
              <Form.Group className="mb-3">
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  value={inputData.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  autoComplete="off"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="userId"
                  value={inputData.userId}
                  onChange={(e) => handleChange(e)}
                  placeholder="User Id"
                  autoComplete="off"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <>
                <div className="all-Check-box-create">
                  <div className="check-box-create">
                    <Form.Label>Status Completed?</Form.Label>
                  </div>
                </div>
              </>
              <Form.Check
                className="radio-button-create"
                inline
                type="radio"
                name="completed"
                value={true}
                onChange={(e) => handleChange(e)}
              />
              Yes
              <Form.Check
                className="mx-3"
                inline
                type="radio"
                name="completed"
                value={false}
                onChange={(e) => handleChange(e)}
              />
              No
              <Button
                className="submit"
                variant="primary"
                onClick={handleSubmit}
              >
                {id ? "Update" : "Submit"}
              </Button>
              <br />
            </Form>
          </div>
          <div>
            <div className="img-1">
              <div className="col-8">
                <img src={logo1} className="logo1" height={445} alt={logo1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
