import React from "react";
import Transaction from "../Components/Transaction";
import { Button } from "react-bootstrap";
import Goals from "../Components/Goals";
import MoneyCard from "../Components/Cards/MoneyCard";

const TransactionPage = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="row px-0" style={{ width: "95%", backgroundColor: "" }}>
        <div
          className="mx-0 row col-lg-9 col-md-12 col-sm-12"
          style={{ backgroundColor: "" }}
        >
          <div className="" style={{ backgroundColor: "" }}>
            <div className="">
              <div className="row ">
                <Transaction loadPagination={true} />
              </div>
            </div>
            <div className="my-3">
              <div className="row align-items-top ">
                <div className="col-lg-6 col-md-10 col-sm-12 my-2">
                  <h3>Frequent Transactions</h3>
                </div>
                <div className="row align-items-top">
                  <div className="col-lg-3 col-md-3 col-sm-5">
                    <MoneyCard amount={"12.00"} title={"Netflix"} />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-5">
                    <MoneyCard amount={"10.00"} title={"Spotify"} />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="w-50 row mt-2 mb-5 col-lg-12 col-md-3 col-sm-5"
                    style={{ backgroundColor: "" }}
                  >
                    <Button size="lg" variant="outline-primary">
                      Add Frequent Transaction
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mx-0 col-lg-3 col-md-11 col-sm-11">
          <Goals />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
