import React, { useState, useContext } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CreateEditGoalForm = ({ creating, title, amount, saved, idGoal }) => {
  const isCreating = creating;
  let { authTokens, logoutUser } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);

  const createTransactionForGoal = async (event) => {
    let amountToSave = event.target.elements.formSaved.value;
    let transacWay = "O";
    if (!creating) {
      if (
        parseFloat(event.target.elements.formSaved.value) > parseFloat(saved)
      ) {
        amountToSave = event.target.elements.formSaved.value - saved;
      } else if (
        parseFloat(event.target.elements.formSaved.value) < parseFloat(saved)
      ) {
        amountToSave = saved - event.target.elements.formSaved.value;
        transacWay = "I";
      }
    }
    let response = await fetch(
      "https://budget-app-javi.herokuapp.com/transactions/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          amount: amountToSave,
          category: "goal",
          receiver: title,
          transaction_way: transacWay,
          date: event.target.elements.formDate.value,
        }),
      }
    );
    if (response.statusText === "Unauthorized") {
      logoutUser();
    }
    return;
  };

  const createGoal = async (event) => {
    let response = await fetch(
      "https://budget-app-javi.herokuapp.com/goals/create/",
      {
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
      }
    );
    if (response.status === 200) {
      //history("/");
      await createTransactionForGoal(event);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
    window.location.reload();
  };

  const editGoal = async (event) => {
    if (
      parseFloat(event.target.elements.formSaved.value) >
      parseFloat(event.target.elements.formAmount.value)
    ) {
      alert("Saved can't be greater than amount");
      return;
    }
    let response = await fetch(
      `https://budget-app-javi.herokuapp.com/goals/${idGoal}/update/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          amount: event.target.elements.formAmount.value,
          saved: event.target.elements.formSaved.value,
          title: title,
        }),
      }
    );
    if (response.status === 200) {
      //history("/");
      if (
        event.target.elements.formSaved.value !== saved ||
        event.target.elements.formAmount.value !== amount
      ) {
        await createTransactionForGoal(event);
      }
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert("No changes detected");
    } else {
      if (isCreating) {
        createGoal(event);
      } else {
        editGoal(event);
        event.preventDefault();
        event.stopPropagation();
      }
    }
    setValidated(true);
    handleCloseForm();
  };

  const handleCloseForm = (event) => {
    //event.preventDefault();
    //event.stopPropagation();
    setValidated(false);
  };

  return (
    <div className="w-100">
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleCloseForm(e)}
      >
        <div>
          <Form.Group className="mb-3" controlId="formReceiver">
            {!isCreating ? (
              <div></div>
            ) : (
              <div>
                <Form.Label>Goal Title </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the title"
                />
              </div>
            )}

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
            {!isCreating ? (
              <FormControl
                required
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                placeholder="Enter amount"
                defaultValue={amount}
              />
            ) : (
              <FormControl
                required
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                placeholder="Enter amount"
              />
            )}

            <Form.Control.Feedback type="invalid">
              Please enter a amount.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <div>
          <Form.Group className="mb-3" controlId="formSaved">
            <Form.Label>Saved</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              {!isCreating ? (
                <FormControl
                  required
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  placeholder="Enter amount saved"
                  defaultValue={saved}
                />
              ) : (
                <FormControl
                  required
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  placeholder="Enter amount saved"
                />
              )}

              <Form.Control.Feedback type="invalid">
                Please enter a amount saved.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date </Form.Label>
            <Form.Control
              required
              type="date"
              max={moment().format("YYYY-MM-DD")}
              placeholder="Enter the date"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a date.
            </Form.Control.Feedback>
            <Form.Text></Form.Text>
          </Form.Group>
        </div>
        <div>
          <div className="d-flex justify-content-center">
            <Button size="md" variant="primary" type="submit">
              {isCreating ? "Add Goal" : "Edit Goal"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateEditGoalForm;
