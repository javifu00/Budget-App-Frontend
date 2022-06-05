import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../Context/AuthContext";

const SignForm = ({ register }) => {
  const [isRegister, setIsRegister] = useState(false);
  let { loginUser } = useContext(AuthContext);

  const submitForm = (e) => {
    if (isRegister) {
      console.log("SignUp");
    } else {
      loginUser(e);
    }
  };

  return (
    <div>
      <div className="text-center mb-4">
        {isRegister ? (
          <div>
            <h2>Welcome!</h2>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col-10">
                <h2>Welcome back!</h2>
              </div>
              <div className="col-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-emoji-smile"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <Form onSubmit={submitForm}>
        {isRegister ? (
          <div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name </Form.Label>
              <Form.Control type="name" placeholder="Enter your name" />
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {isRegister
                  ? "We'll never share your email with anyone else."
                  : ""}
              </Form.Text>
            </Form.Group>
          </div>
        ) : (
          <div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name </Form.Label>
              <Form.Control type="name" placeholder="Enter your username" />
              <Form.Text></Form.Text>
            </Form.Group>
          </div>
        )}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            {isRegister ? "Needs to have at least 8 characters." : ""}
          </Form.Text>
        </Form.Group>
        {isRegister ? (
          <div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I accept terms and conditions"
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button size="md" variant="primary" type="submit">
                Create my account
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember my email" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button size="md" variant="primary" type="submit">
                Login to my account
              </Button>
            </div>
          </div>
        )}
      </Form>
      <div
        style={{
          hover: {
            cursor: "pointer",
          },
        }}
        className="d-flex mt-3 border-0 justify-content-center fw-bold text-secondary"
      >
        <Button
          className="border-0"
          onClick={() => setIsRegister(!isRegister)}
          variant="outline-secondary"
        >
          {isRegister
            ? "Already have an account? Login here"
            : "Don't have an account? Create one here"}
        </Button>
      </div>
    </div>
  );
};

export default SignForm;
