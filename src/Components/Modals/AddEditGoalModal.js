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
import CreateEditGoalForm from "../Forms/CreateEditGoalForm";

const AddEditGoalModal = ({ creating, id, title, amount, saved }) => {
  const [isCreating, setIsCreating] = useState(creating);
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

  return (
    <div className="px-0 d-flex justify-content-center mx-0">
      <Modal show={show} onHide={handleClose}>
        {isCreating ? (
          <Modal.Header closeButton onClick={() => setValidated(false)}>
            <Modal.Title>Add new goal</Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Header closeButton onClick={() => setValidated(false)}>
            <Modal.Title>Edit goal</Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>
          <CreateEditGoalForm
            creating={false}
            title={title}
            amount={amount}
            saved={saved}
            idGoal={id}
          />
        </Modal.Body>
      </Modal>
      {isCreating ? (
        <div className="row mb-5 px-0 col-lg-12 col-md-3 col-sm-5 d-flex justify-content-center">
          <Button size="lg" variant="outline-info" onClick={handleShow}>
            Add Goal
          </Button>
        </div>
      ) : (
        <div
          style={{ cursor: "pointer" }}
          className="d-flex justify-content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil ml-2"
            viewBox="0 0 16 16"
            onClick={handleShow}
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AddEditGoalModal;
