import React, { useEffect, useState, useContext } from "react";
import { Pagination, Table } from "react-bootstrap";
import AuthContext from "../Context/AuthContext";

const Transaction = ({ loadPagination }) => {
  let [transactions, setTransactions] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    let getTransactions = async () => {
      let response = "";
      if (loadPagination) {
        response = await fetch(
          "https://budget-app-javi.herokuapp.com/transactions/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );
      } else {
        response = await fetch(
<<<<<<< HEAD
          "https://budget-app-javi.herokuapp.com/transactions/home",
=======
          "https://budget-app-javi.herokuapp.com/transactions/home/",
>>>>>>> dev
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );
      }
      let data = await response.json();

      if (response.status === 200) {
        setTransactions(data["serializer"]);
        setListToDisplay(transactions);
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
      setTransactions(data["serializer"]);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };*/

  let deleteTransaction = async (id) => {
    fetch(`https://budget-app-javi.herokuapp.com/transactions/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    window.location.reload();
  };

  const [listToDisplay, setListToDisplay] = useState(transactions.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesCount = Math.ceil(transactions.length / itemsPerPage);

  /*for (let number = 1; number <= pagesCount; number++) {
    item.push(
      <Pagination.Item
        onClick={() => onPageNumberClick(pageNumber)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }*/

  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    let index = number * 10;
    setListToDisplay(transactions.slice(index - 10, index - 1));
  };

  /*const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
    console.log(pageNumber);
  };
  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };*/

  const onPreviousPageClick = () => {
    if (currentPage - 1 > 0) {
      changePage(currentPage - 1);
    }
  };

  const onNextPageClick = () => {
    if (currentPage + 1 <= pagesCount) {
      changePage(currentPage + 1);
    }
  };

  /*const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          className="d-none"
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });*/

  return (
    <div className="justify-content-center w-100">
      {/* <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item
          className="my-2 border-top-0 border-end-0 border-start-0"
          variant="light"
        >
          <div className="d-flex justify-content-between flex-row">
            <div>Starbucks</div>
            <div>Food</div>
            <div>10/04/2022</div>
            <div>$12.99</div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          className="my-2 border-top-0 border-end-0 border-start-0"
          variant="light"
        >
          <div className="d-flex justify-content-between flex-row">
            <div>Universidad</div>
            <div>Studies</div>
            <div>01/04/2022</div>
            <div>$350.00</div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          className="my-2 border-top-0 border-end-0 border-start-0"
          variant="light"
        >
          <div className="d-flex justify-content-between flex-row">
            <div>Gama</div>
            <div>Food</div>
            <div>29/03/2022</div>
            <div>$0.90</div>
          </div>
        </ListGroup.Item>
      </ListGroup>*/}

      <Table size="lg" responsive className="table-hover border-spacing-4">
        <thead className="my-4">
          <tr className="my-4">
            <th className="text_center" scope="col">
              Receiver
            </th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transac, index) => (
            <tr key={index} className="my-4">
              <td className="col-md-4 text-capitalize">{transac.receiver}</td>
              <td className="col-md-3 text-capitalize">{transac.category}</td>
              {transac.transaction_way === "O" ? (
                <td className="col-md-2 text-danger">${transac.amount}</td>
              ) : (
                <td className="col-md-2 text-success">${transac.amount}</td>
              )}
              <td className="col-md-4">{transac.date}</td>
              {transac.category !== "goal" ? (
                <td
                  className="col-md-1"
                  onClick={() => deleteTransaction(transac.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z" />
                  </svg>
                </td>
              ) : (
                <td
                  className="col-md-1"
                  onClick={() => deleteTransaction(transac.id)}
                ></td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {loadPagination ? (
        <Pagination>
          <Pagination.Prev onClick={onPreviousPageClick} />
          <Pagination.Next onClick={onNextPageClick} />
          <div className="d-flex align-items-center mx-2">
            {currentPage}/{pagesCount}
          </div>
        </Pagination>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Transaction;
