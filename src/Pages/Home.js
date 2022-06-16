import React, { useEffect, useState, useContext } from "react";
import Transaction from "../Components/Transaction";
import { Card } from "react-bootstrap";
import MoneyCard from "../Components/Cards/MoneyCard";
import DoughnutCard from "../Components/Cards/DoughnutCard";
import BarCard from "../Components/Cards/BarCard";
import Goals from "../Components/Goals";
import AddTransactionButton from "../Components/AddTransactionButton";
import AuthContext from "../Context/AuthContext";

const Home = () => {
  let [transactions, setTransactions] = useState([]);
  //let [balance, setBalance] = useState([]);
  let [colorsDoughnut, setColorsDoughnut] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  const getRandomColor = async (index) => {
    let list = [
      "#fd7f6f",
      "#7eb0d5",
      "#b2e061",
      "#bd7ebe",
      "#ffb55a",
      "#ffee65",
      "#beb9db",
      "#fdcce5",
      "#8bd3c7",
    ];
    list = list.slice(index);
    setColorsDoughnut(list);
    return;
  };

  const state = {
    labels: transactions["expensesMonths"],
    datasets: [
      {
        label: "Spenses",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: transactions["expensesByMonth"],
      },
    ],
  };

  let doughnutData = {
    labels: transactions["categoryNames"],
    datasets: [
      {
        label: "My First Dataset",
        data: transactions["categoryAmount"],
        backgroundColor: colorsDoughnut,
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    let getTransactions = async () => {
      let response = await fetch(
        "https://budget-app-javi.herokuapp.com/transactions/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      let data = await response.json();

      if (response.status === 200) {
        setTransactions(data);
        getRandomColor(data["categoryAmount"].length);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    };
    getTransactions();
  }, []);

  /*let getTransactions = async () => {
    let response = await fetch("/transactions/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setTransactions(data);
      getRandomColor(data["categoryAmount"].length);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };*/

  /*let financialData = [
    { spend: 245.0, date: "01-01-2022" },
    { spend: 821.0, date: "03-01-2022" },
    { spend: 447.0, date: "04-01-2022" },
  ];*/

  return (
    <div className="d-flex justify-content-center my-5">
      <AddTransactionButton />
      <div
        className="row justify-content-center px-0"
        style={{ width: "95%", backgroundColor: "" }}
      >
        <div
          className="mx-0 justify-content-center row col-lg-9 col-md-12 col-sm-12"
          style={{ backgroundColor: "" }}
        >
          <div className="" style={{ backgroundColor: "" }}>
            <div className="" style={{ backgroundColor: "" }}>
              <div className="">
                <div className="row ">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <MoneyCard
                      amount={transactions["balance"]}
                      title={"Balance"}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <MoneyCard
                      amount={transactions["income"]}
                      title={"Income"}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <MoneyCard amount={"40.00"} title={"Savings"} />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <MoneyCard
                      amount={transactions["expenses"]}
                      title={"Expenses"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="row align-items-top justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-11 my-2">
                  <BarCard
                    title={"Total Spenses"}
                    data={state}
                    explanation={"Total spenses by month"}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-11 my-2">
                  <DoughnutCard
                    title={"Spenses"}
                    data={doughnutData}
                    explanation={"Spenses group by category"}
                  />
                </div>
              </div>
            </div>
            <div className="my-5">
              <div className="row align-items-top justify-content-center">
                <div
                  className="col-lg-3 col-md-3 col-sm-11 col-12"
                  style={{ backgroundColor: "" }}
                >
                  <div className="py-0 col-lg-12 col-md-12 col-sm-12">
                    <MoneyCard amount={"90.00"} title={"Expenses"} />
                  </div>
                </div>
                <div
                  className="col-lg-9 col-md-9 col-sm-11"
                  style={{ backgroundColor: "" }}
                >
                  <Card className="mb-5 w-100 d-flex">
                    <div className="mt-5 mb-3 mx-3 justify-content-center">
                      <div className="flex-column">
                        <div className="pb-2 h4 text-right">
                          Recent Transactions
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="w-100" style={{}}>
                            <Transaction loadPagination={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mx-0 col-lg-3 col-md-11 col-sm-11 col-11">
          <Goals />
        </div>
      </div>
    </div>
  );
};

export default Home;
