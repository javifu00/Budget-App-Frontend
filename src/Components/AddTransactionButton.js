import React from "react";
import { Tooltip } from "react-bootstrap";
import AddTransacGoal from "./Forms/AddTransacGoal";

const AddTransactionButton = () => {
  return (
    <div>
      <AddTransacGoal goal={false} />
    </div>
  );
};

export default AddTransactionButton;
