import React from "react";
import { Card, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import AddTransacGoal from "./Forms/AddTransacGoal";

const AddTransactionButton = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add Transaction
    </Tooltip>
  );
  return (
    <div>
      <AddTransacGoal goal={false} />
    </div>
  );
};

export default AddTransactionButton;
