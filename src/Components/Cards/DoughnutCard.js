import React from "react";
import { Card } from "react-bootstrap";
import { Bar, Line, Chart, Doughnut } from "react-chartjs-2";

const DoughnutCard = ({ title, data, explanation }) => {
  return (
    <div>
      <Card className="rounded-5">
        <Card.Body
          className="pb-0 mx-auto"
          style={{
            width: "80%",
          }}
        >
          <Card.Text className="h4">
            {title}

            <Doughnut
              data={data}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Total expenses by category",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                },
              }}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoughnutCard;
