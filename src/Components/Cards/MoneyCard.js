import React, { useEffect, useContext } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import AuthContext from "../../Context/AuthContext";
import AddTransacGoal from "../Forms/AddTransacGoal";
import AddEditGoalModal from "../Modals/AddEditGoalModal";

const MoneyCard = ({ amount, title, saved, id }) => {
  const completed = (saved * 100) / amount;
  let { authTokens, logoutUser } = useContext(AuthContext);

  let deleteGoal = async () => {
    let response = await fetch(`/goals/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      //history("/");
      await createTransactionForGoal();
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
    window.location.reload();
  };

  let editGoal = async () => {
    console.log("hola");
    return <AddTransacGoal goal={false} edit={true} />;
    window.location.reload();
  };

  const createTransactionForGoal = async () => {
    let newDate = new Date();
    const offset = newDate.getTimezoneOffset();
    let date = new Date(newDate.getTime() - offset * 120 * 1000);
    date = date.toISOString().split("T")[0];
    let response = await fetch("/api/transactions/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        amount: saved,
        category: "goal",
        receiver: title,
        transaction_way: "I",
        date: date,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      //history("/");
      //For now i use this because of time but its not a good solution to
      //update the react view when create new object
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <Card className="rounded-5 my-2">
        <Card.Body className="mx-1">
          {saved ? (
            <div className="w-100 mx-0">
              <div className="d-flex mb-2 w-100">
                <div className="col-md-10 col-sm-10 col-lg-10 col-10">
                  <Card.Title className="text-capitalize">{title}</Card.Title>
                </div>
                <div className="col-md-2 col-sm-2 col-lg-2 col-2">
                  <div className="row">
                    <div className="px-0 col-md-6 col-sm-6 col-lg-6 col-6 d-flex justify-content-center mx-0 mb-2">
                      <svg
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash2 mr-2 my-0"
                        onClick={() => deleteGoal()}
                      >
                        <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z" />
                      </svg>
                    </div>
                    <div className="px-0 col-md-6 col-sm-6 col-lg-6 col-6 d-flex justify-content-center mx-0 mb-2">
                      <AddEditGoalModal
                        id={id}
                        title={title}
                        amount={amount}
                        saved={saved}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4>
                  <span className="text-success">${saved}</span>
                  <span> / $ {amount}</span>
                </h4>
                <ProgressBar variant="success" now={completed} />
              </div>
            </div>
          ) : (
            <div>
              <Card.Text className="text-capitalize">{title}</Card.Text>
              <div>
                {amount > 0 ? (
                  <h4>${amount}</h4>
                ) : (
                  <h4 className="text-danger">${amount}</h4>
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MoneyCard;
