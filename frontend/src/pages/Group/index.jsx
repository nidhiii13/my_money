import { useState, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// styles
import styles from "./index.module.css";

// components
import Loadable from "../../components/utils/router/Loadable";
import Sort from "../../components/design/Sort";

// constants
import { UNAUTH_ADD } from "../../constants/api.constants";

const Group = () => {
  const { id } = useParams();
  const [openTransaction, setOpenTransaction] = useState(false);
  const [groupData, setGroupData] = useState({});
  const [groupMem, setGroupMem] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [originalTrans, setOriginalTrans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(UNAUTH_ADD + "/groups/getGroupInfo/" + id + "/")
      .then((res) => {
        setGroupData(res.data.group);
        setGroupMem(res.data.group_members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openTransaction]);

  const deleteGroup = () => {
    axios
      .delete(UNAUTH_ADD + "/groups/deleteGroup/" + id + "/")
      .then((res) => {
        const tempMembers = groupMem;
        tempMembers.filter((mem) => mem.group_id !== id);
        console.log(tempMembers);
        setGroupMem(tempMembers);
        navigate("/groups");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(UNAUTH_ADD + "/transactions/getGroupTransactions/" + id)
      .then((res) => {
        setTransactions(res.data.transactions);
        setOriginalTrans(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openTransaction]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Group</h1>
      <div className={styles.bodyContainer}>
        <div className={styles.groupSummary}>
          <div className={styles.groupUpper}>
            <div className={styles.groupDetails}>
              <h2 className={styles.groupTitle}>
                Group Name: {groupData.group_name}
              </h2>
              <p>{groupData.group_description}</p>
            </div>
            <div className={styles.groupMembers}>
              Group Amount
              <br /> {groupData.total_amount ? groupData.total_amount : 0}
            </div>
          </div>
          <div className={styles.groupLower}>
            {groupMem.map((mem, memIdx) => (
              <MemoCard key={memIdx} member={mem} />
            ))}
          </div>
        </div>
        <div className={styles.buttonMenu}>
          <button
            className={`${styles.button} ${styles.redButton}`}
            onClick={deleteGroup}
          >
            Delete Group
          </button>
          <button
            className={styles.button}
            onClick={() => setOpenTransaction(true)}
          >
            Group Transaction +
          </button>
        </div>
        {openTransaction && (
          <GroupTransactionModal
            open={openTransaction}
            setOpen={setOpenTransaction}
            groupId={id}
          />
        )}
        <div className={styles.transactions}>
          <h2 className={styles.title}>Transactions</h2>
          <Sort setArray={setTransactions} array={originalTrans}/>
          <div className={styles.transactionsCard}>
            {transactions.map((transaction, transactionIdx) => (
              <SmallInfoCard
                key={transactionIdx}
                username={transaction.from_name}
                amount={transaction.amount ? transaction.amount : 0}
                subHead={`Category: ${
                  transaction.category
                } (Included in Payment: ${transaction.to_name.join()})`}
                transactionId={transaction.group_transaction_id}
                isGroup={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;

const MemoCard = Loadable(
  lazy(() => import("../../components/design/Cards/MemoCard"))
);
const SmallInfoCard = Loadable(
  lazy(() => import("../../components/design/Cards/SmallInfoCard"))
);
const GroupTransactionModal = Loadable(
  lazy(() => import("../../components/design/Modal/GroupTransaction"))
);
