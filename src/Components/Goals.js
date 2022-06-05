import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MoneyCard from "./Cards/MoneyCard";
import AddTransacGoal from "./Forms/AddTransacGoal";
import AddEditGoalModal from "./Modals/AddEditGoalModal";

const Goals = () => {
  let [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals();
  }, []);

  let getGoals = async () => {
    let response = await fetch("/goals/");
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
