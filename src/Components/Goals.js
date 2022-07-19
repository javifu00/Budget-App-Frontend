import React, { useEffect, useState, useContext } from "react";
import MoneyCard from "./Cards/MoneyCard";
import AddTransacGoal from "./Forms/AddTransacGoal";
import AuthContext from "../Context/AuthContext";

const Goals = () => {
  let [goals, setGoals] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getGoals();
  }, []);

  let getGoals = async () => {
    let response = await fetch("http://127.0.0.1:8000/goals/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setGoals(data);
  };

  return (
    <div className="d-flex w-100" style={{ backgroundColor: "" }}>
      <div className="justify-content-center col-lg-12 col-md-12 col-sm-11 col-xs-11">
        <div className="my-2 col-lg-12 col-md-12 col-sm-12">
          <h3>Goals</h3>
        </div>
        <div className="my-2 col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            {goals.map((goals, index) => (
              <div
                className="col-lg-12 col-md-4 col-sm-6 col-xs-12"
                key={index}
              >
                <MoneyCard
                  saved={goals.saved}
                  amount={goals.amount}
                  title={goals.title}
                  id={goals.id}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="mx-0 mt-2 mb-5 col-lg-12 col-md-11 col-sm-12"
          style={{ backgroundColor: "" }}
        >
          <AddTransacGoal goal={true} />
        </div>
      </div>
    </div>
  );
};

export default Goals;
