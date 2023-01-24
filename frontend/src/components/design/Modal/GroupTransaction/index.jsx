import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useState, useEffect, lazy } from "react";
import { useSelector } from "react-redux";

// styles
import styles from "../index.module.css";

// constants
import { UNAUTH_ADD } from "../../../../constants/api.constants";
import { categoryConstant } from "../../../../constants/category.constants";

// components
import Form from "../../Form";
import SingleSelect from "../../Form/SingleSelect";
import Loadable from "../../../utils/router/Loadable";

const GroupTransactionModal = ({ open, setOpen, groupId }) => {
  const [category, setCategory] = useState("");
  const [fromFriend, setFromFriend] = useState();
  const [members, setMembers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [membersList, setMembersList] = useState([]); // set it using data from backend
  const [newMember, setNewMember] = useState();
  const [addingMember, setAddingMember] = useState(false);

  const groupForm = [
    {
      label: "Amount Paid",
      input: "input",
      denote_var: amount,
      set_var: setAmount,
    },
  ];

  useEffect(() => {
    axios
      .get(UNAUTH_ADD + "/groups/getGroupMembers/" + groupId + "/")
      .then((res) => {
        setMembersList(res.data.group_members);
      })
      .catch((err) => console.log(err));
  }, []);
   
  const addTransaction = () => {
    var formData = new FormData();
    formData.append("group_id", groupId);
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("from_id", fromFriend.user_id);
    formData.append("members", JSON.stringify(members));
    axios
      .post(UNAUTH_ADD + "/transactions/addGroupTransaction/", formData)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add Group Transaction</h1>
        <div>
          <SingleSelect
            options={membersList}
            label="Paid by"
            title="username"
            setVal={setFromFriend}
          />
          {addingMember && (
            <SingleSelect
              options={membersList}
              label="Paid for"
              title="username"
              setVal={setNewMember}
            />
          )}
          {members.length !== 0 && (
            <div className={styles.members}>
              {members.map((member) => (
                <MemoCard member={member.username} key={member.user_id} />
              ))}
            </div>
          )}
          {!addingMember ? (
            <button
              className={styles.button}
              onClick={() => setAddingMember(true)}
            >
              Add a new Member
            </button>
          ) : (
            <button
              className={`${styles.button} ${styles.addButton}`}
              onClick={() => {
                const temp = [...members, newMember];
                let filteredList = [
                  ...new Map(
                    temp.map((obj) => [`${obj.user_id}`, obj])
                  ).values(),
                ];
                setMembers(filteredList);
                setAddingMember(false);
              }}
            >
              Add Member
            </button>
          )}
          <Form form_construct={groupForm} />
          <SingleSelect
            options={categoryConstant}
            label="Category"
            title="categoryName"
            setVal={setCategory}
            valueSetter="categoryName"
          />
          <p className={styles.leftMargin}>
            <em>
              Note: <br />
              1. Please make sure that you add yourself in `paid for` if you are
              a part of the transaction.
              <br />
              2. The transaction done will be equally split.
            </em>
          </p>
        </div>
        <button
          className={styles.button}
          onClick={addTransaction}
        >
          Add Transaction
        </button>
      </div>
    </Modal>
  );
};

export default GroupTransactionModal;

const MemoCard = Loadable(lazy(() => import("../../Cards/MemoCard")));
