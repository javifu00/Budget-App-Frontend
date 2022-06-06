import React, { useContext, useState } from "react";
import ColorLogo from "../Assets/Color logo.png";
import SignForm from "../Components/Forms/SignForm";
import AuthContext from "../Context/AuthContext";

const SignPage = () => {
  let { loginUser } = useContext(AuthContext);
  const [register, setRegister] = useState(false);
  return (
    <div
      className="d-flex justify-content-center"
      style={{ height: "91vh", backgroundColor: "rgb(22,135,167,0.25)" }}
    >
      <div className="row px-0 w-100 align-items-center">
        <div
          className="d-flex h-l-100 align-items-center justify-content-center  mx-0 row col-lg-5 col-md-12 col-sm-12"
          style={{}}
        >
          <div
            className="align-items-center justify-content-center"
            style={{ backgroundColor: "" }}
          >
            <div
              className="mx-auto my-2 row w-75 text-center"
              style={{ backgroundColor: "" }}
            >
              <img alt="" src={ColorLogo} width="100%" className="" />
            </div>
            <div className="row my-2 text-center">
              <h6>Track your expenses</h6>
              <h6>Improve your finances</h6>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-center mx-0 row col-lg-7 col-md-12 col-sm-12"
          style={{ height: "auto" }}
        >
          <div
            className="justify-content-center"
            style={{ backgroundColor: "" }}
          >
            <div
              className="mx-auto row"
              style={{ backgroundColor: "", width: "85%" }}
            >
              <SignForm register={register}></SignForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
