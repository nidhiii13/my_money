import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// styles
import styles from "./index.module.css";

// components
import Loadable from "../../components/utils/router/Loadable";
import Form from "../../components/design/Form";
import { useNavigate } from "react-router-dom";

// constants
import { UNAUTH_ADD } from "../../constants/api.constants";

const Transaction = () => {
  const { id, isGroup } = useParams();
  const [data, setData] = useState();
  const [amount, setAmount] = useState();
  const [oldAmount, setOldAmount] = useState();
  const [editTransaction, setEditTransaction] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState(false);
  const navigate = useNavigate();

  const transactionForm = [
    {
      label: "Amount",
      input: "input",
      denote_var: amount,
      set_var: setAmount,
    },
  ];
  useEffect(() => {
    axios
      .get(
        UNAUTH_ADD +
          "/transactions/getIndividualTransaction/" +
          id +
          "/" +
          isGroup +
          "/"
      )
      .then((res) => {
        setData(res.data.transaction);
        setAmount(res.data.transaction.amount);
        setOldAmount(res.data.transaction.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editTransaction, deleteTransaction]);
  const editTransactionHandler = () => {
    var formData = new FormData();
    formData.append("old_amount", oldAmount);
    formData.append("new_amount", amount);
    formData.append("from_name", data.from_name);
    formData.append("to_name", JSON.stringify(data.to_name));
    formData.append("group_id", data.group_id);
    formData.append("length", data.to_name.length);
    formData.append("is_payer_included", data.is_payer_included);
    axios.put(UNAUTH_ADD + "/transactions/updateTransaction/" + data.group_transaction_id + "/", formData)
      .then((res) => {
        console.log(res);
        setEditTransaction(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTransactionHandler = () => {
    setDeleteTransaction(true);
    axios
      .delete(
        UNAUTH_ADD +
          "/transactions/deleteTransaction/" + data.group_transaction_id + "/"
      )
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
      });
      setDeleteTransaction(false);
      navigate("/group/" + data.group_id);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transactions</h1>
      {data && (
        <div className={styles.bodyContainer}>
          {isGroup == "true" ? (
            <p className={styles.paragraph}>
              Group Transaction Id: {data.group_transaction_id}
            </p>
          ) : (
            <p className={styles.paragraph}>
              Transaction Id: {data.transaction_id}
            </p>
          )}
          <div className={styles.paragraph}>
            Paid By:
            <br /> <MemoCard member={data.from_name} />
          </div>
          <div className={styles.paragraph}>
            Paid For:
            <br />
            {isGroup == "true" ? (
              <div>
                {data.to_name.map((mem, memIdx) => (
                  <MemoCard member={mem} key={memIdx} />
                ))}
              </div>
            ) : (
              <MemoCard member={data.to_name} />
            )}
          </div>
          {isGroup == "true" && (
            <p className={styles.paragraph}>Group Name: {data.group_name}</p>
          )}
          <p className={styles.paragraph}>Category: {data.category}</p>
          {data.comments && <p>Comments: {data.comments}</p>}
          {editTransaction ? (
            <Form form_construct={transactionForm} />
          ) : (
            <p className={styles.paragraph}>Amount: &#8377; {amount}</p>
          )}
          {isGroup == "true" && editTransaction === false && (
            <button
              className={styles.button}
              onClick={() => setEditTransaction(true)}
            >
              Edit Transaction
            </button>
          )}
          {isGroup == "true" && editTransaction === true && (
            <button
              className={styles.button}
              onClick={editTransactionHandler}
            >
              Commit Changes
            </button>
          )}
          {isGroup == "true" && (
            <button
              className={styles.button}
              onClick={deleteTransactionHandler}
            >
              Delete Transaction
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Transaction;

const MemoCard = Loadable(
  lazy(() => import("../../components/design/Cards/MemoCard"))
);
