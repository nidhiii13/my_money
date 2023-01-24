import React, { lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UNAUTH_ADD } from "../../constants/api.constants";
import { useSelector } from "react-redux";

//styles
import styles from "./index.module.css";

//components
import Loadable from "../../components/utils/router/Loadable";
import Sort from "../../components/design/Sort";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    axios
      .get(UNAUTH_ADD + "/transactions/getAllUserTransactions/" + user.user_id)
      .then((res) => {
        console.log(res.data.transactions);
        setData(res.data.transactions);
        setOriginalData(res.data.transactions);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transactions</h1>
      <div className={styles.bodyContainer}>
        <Sort setArray={setData} array={originalData} />
        {data.map((item) => (
          <SmallInfoCard
            key={item.transaction_id}
            transactionId={
              item.group_id ? item.group_transaction_id : item.transaction_id
            }
            username={
              String(item.from_id) === user.user_id
                ? item.to_name
                : item.from_name
            }
            amount={
              String(item.from_id) === user.user_id ? -item.amount : item.amount
            }
            subHead={
              String(item.from_id) === user.user_id
                ? "You paid" + "...category: " + item.category
                : "You received"
                + "...category: " + item.category
            }
            isGroup={item.group_id ? true : false}
          />
        ))}
        {data.length === 0 && <p>No Transactions Done</p>}
      </div>
    </div>
  );
};

export default Transactions;

const SmallInfoCard = Loadable(
  lazy(() => import("../../components/design/Cards/SmallInfoCard"))
);
