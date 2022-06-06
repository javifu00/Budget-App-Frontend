import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Modal,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AddTransacGoal = ({ goal }) => {
  const [isGoal, setIsGoal] = useState(goal);
  const [show, setShow] = useState(false);
  let { authTokens, logoutUser } = useContext(AuthContext);
  const history = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add Transaction
    </Tooltip>
  );

  const [validated, setValidated] = useState(false);

  const createTransaction = async (event) => {
    let response = await fetch("/transactions/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        amount: event.target.elements.formAmount.value,
        category: event.target.elements.formCategory.value,
        date: event.target.elements.formDate.value,
        receiver: event.target.elements.formReceiver.value,
        transaction_way: event.target.elements.formWay.value,
      }),
    });
    if (response.status === 200) {
      //history("/");
      window.location.reload();
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const createTransactionForGoal = async (event) => {
    let response = await fetch("/transactions/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        amount: event.target.elements.formSaved.value,
        category: "goal",
        receiver: event.target.elements.formReceiver.value,
        transaction_way: "O",
        date: event.target.elements.formDate.value,
      }),
    });
    if (response.status === 200) {
      //history("/");
      //For now i use this because of time but its not a good solution to
      //update the react view when create new object
      window.location.reload();
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const createGoal = async (event) => {
    let response = await fetch("/goals/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        amount: event.target.elements.formAmount.value,
        saved: event.target.elements.formSaved.value,
        title: event.target.elements.formReceiver.value,
      }),
    });
    if (response.status === 200) {
      //history("/");
      await createTransactionForGoal(event);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (isGoal) {
        createGoal(event);
      } else {
        createTransaction(event);
      }
    }
    setValidated(true);
    handleClose();
  };

  const handleCloseForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(false);
    handleClose();
  };

  return (
    <div className="px-0 d-flex justify-content-center mx-0">
      <Modal show={show} onHide={handleClose}>
        {isGoal ? (
          <Modal.Header closeButton onClick={() => setValidated(false)}>
            <Modal.Title>Add new goal</Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header closeButton onClick={() => setValidated(false)}>
            <Modal.Title>Add new transaction</Modal.Title>
          </Modal.Header>
        )}
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
          onReset={(e) => handleCloseForm(e)}
        >
          <Modal.Body>
            <div>
              <Form.Group className="mb-3" controlId="formReceiver">
                {isGoal ? (
                  <Form.Label>Goal Title </Form.Label>
                ) : (
                  <Form.Label>Receiver </Form.Label>
                )}
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the receiver"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a receiver.
                </Form.Control.Feedback>
                <Form.Text></Form.Text>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl
                  required
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  placeholder="Enter amount"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a amount.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {isGoal ? (
              <div>
                <Form.Group className="mb-3" controlId="formSaved">
                  <Form.Label>Saved</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl
                      required
                      type="number"
                      min="0.00"
                      max="10000.00"
                      step="0.01"
                      placeholder="Enter amount saved"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a amount saved.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            ) : (
              <div>
                <div>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category </Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter the category"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a category.
                    </Form.Control.Feedback>
                    <Form.Text></Form.Text>
                  </Form.Group>
                </div>

                <div>
                  <Form.Group className="mb-3" controlId="formWay">
                    <Form.Label>Transaction Way </Form.Label>
                    <Form.Control as="select" type="name" required>
                      <option value="I">In</option>
                      <option value="O">Out</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please enter a way.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            )}
            <div>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date </Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Enter the date"
                  max={moment().format("YYYY-MM-DD")}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a date.
                </Form.Control.Feedback>
                <Form.Text></Form.Text>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <div className="d-flex justify-content-center">
                <Button size="md" variant="primary" type="submit">
                  {isGoal ? "Add Goal" : "Add Transaction"}
                </Button>
              </div>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              className="d-flex border-0 justify-content-center fw-bold text-secondary"
            >
              <Button
                className="border-0"
                type="reset"
                variant="outline-secondary"
              >
                Go back
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
      {isGoal ? (
        <div className="row mb-5 px-0 col-lg-12 col-md-3 col-sm-5 d-flex justify-content-center">
          <Button size="lg" variant="outline-info" onClick={handleShow}>
            Add Goal
          </Button>
        </div>
      ) : (
        <div className="d-flex">
          <div
            className="d-flex fixed-bottom justify-content-center me-4 mb-4"
            style={{ width: "15vw" }}
          >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                onClick={handleShow}
                style={{ borderRadius: "50%" }}
                size="md"
                variant="primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="40"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransacGoal;
