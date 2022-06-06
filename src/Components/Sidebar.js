import React from "react";
import { ListGroup } from "react-bootstrap";
import ColorLogo from "../Assets/Color logo.png";

const Sidebar = () => {
  return (
    <div
      className="d-inline-block position-fixed align-items-end"
      style={{ width: "15vw", height: "100vh", backgroundColor: "#d0e2ff" }}
    >
      <div className="mt-4 mb-5 d-flex justify-content-center">
        <img
          alt=""
          src={ColorLogo}
          width="90%"
          className="d-inline-block align-top"
        />
      </div>
      {/*<div className="my-4 d-flex justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10vw"
          height="10vh"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
  </div>
      <div className="d-flex justify-content-center">Javier Fuenmayor</div>
      <div>
        <ul style={{ listStyle: "none" }}>
          <li className="mx-auto my-4">
            <Link className="text-muted text-decoration-none" to="">
              Home
            </Link>
          </li>
          <li className="mx-auto my-4">
            <Link className="text-muted text-decoration-none" to="">
              Transacciones
            </Link>
          </li>
          <li className="mx-auto my-4">
            <Link className="text-muted text-decoration-none" to="">
              Historial
            </Link>
          </li>
        </ul>
      </div>*/}
      <div className="mt-5 pt-5 mb-5 d-flex justify-content-center">
        <ListGroup defaultActiveKey="#link1" className="w-75">
          <ListGroup.Item
            className="rounded border-0 list-group-item-primary"
            action
            href="#link1"
          >
            Home
          </ListGroup.Item>
          <ListGroup.Item
            className="rounded border-0 list-group-item-primary"
            action
            href="#link2"
          >
            Transacciones
          </ListGroup.Item>
          <ListGroup.Item
            className="rounded border-0 list-group-item-primary"
            action
            href="#link3"
          >
            Historial
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="align-items-end">
        <div className="border-top mx-2 border-secondary py-4 d-flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8vw"
            height="8vh"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </div>
        <div className="d-flex justify-content-center">Javier Fuenmayor</div>
      </div>
    </div>
  );
};

export default Sidebar;
