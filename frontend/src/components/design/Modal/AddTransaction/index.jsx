import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import { UNAUTH_ADD } from "../../../../constants/api.constants";

// styles
import styles from "../index.module.css";

// components
import Form from "../../Form";
import SingleSelect from "../../Form/SingleSelect";

const AddTransactionModal = ({ open, setOpen }) => {
  const user = useSelector(state => state.userReducer);
  const [name, setName] = useState();
  const [friends, setFriends] = useState([]); // from backend
  const [amount, setAmount] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    // fetch members from backend
    axios.get(UNAUTH_ADD + "/friends/getallFriends/"+user.user_id+"/")
    .then((res) => {
      setFriends(res.data.friends);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  const addTransaction = ()=>{
    var formData = new FormData();
    formData.append("from_id", user.user_id);
    formData.append("to_id", name);
    formData.append("amount", amount);
    formData.append("comments", comments);
    fetch(UNAUTH_ADD + "/transactions/addTransaction/", {
      method: "POST",
      body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const transactionForm = [
    {
      label: "Amount",
      input: "input",
      denote_var: amount,
      set_var: setAmount,
    },
    {
      label: "Comments",
      input: "textarea",
      denote_var: comments,
      set_var: setComments,
    }
  ];

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add Transaction</h1>
        <div>
          <SingleSelect
            options={friends}
            label="To Friend"
            title="username"
            setVal={setName}
            valueSetter="user_id"
          />
          <Form form_construct={transactionForm} />
        </div>
        <button
          className={styles.button}
          onClick={addTransaction}
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
