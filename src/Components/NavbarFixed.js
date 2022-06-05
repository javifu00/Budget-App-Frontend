import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ColorLogo from "../Assets/Color logo.png";
import AuthContext from "../Context/AuthContext";

const NavbarFixed = () => {
  let { user, logoutUser } = useContext(AuthContext);
  //let { users, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" position="sticky" expand="lg" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-5">
          <img
            alt=""
            src={ColorLogo}
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex justify-content-center"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/transactions"
                className="d-flex justify-content-center"
              >
                Transactions
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/stats"
                className="d-flex justify-content-center"
              >
                Stats
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                className="d-flex justify-content-center align-items-center"
                as={Link}
                to="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </Nav.Link>
              <div
                className="d-flex justify-content-center align-items-center"
                to="/"
              >
                {user.username}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Nav.Link
                  onClick={logoutUser}
                  eventKey={3}
                  className="d-flex justify-content-center align-items-center"
                  as={Link}
                  to="/start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarFixed;
