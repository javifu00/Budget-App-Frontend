import React from "react";
import { Card } from "react-bootstrap";
import { Bar, Line, Chart, Doughnut } from "react-chartjs-2";

const BarCard = ({ title, data, explanation }) => {
  return (
    <div>
      <Card className="w-100 d-flex rounded-5 align-item-center">
        <Card.Body className="mx-2" style={{}}>
          <Card.Text className="h4">{title}</Card.Text>
          <Bar
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "",
                  fontSize: 20,
                },
                legend: {
                  display: false,
                  position: "top",
                },
              },
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BarCard;
