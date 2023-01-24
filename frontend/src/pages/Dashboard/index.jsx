import { useNavigate } from "react-router-dom";
import { useState, lazy } from "react";
import { routes } from "../../constants/routes";
import axios from "axios";
import { UNAUTH_ADD } from "../../constants/api.constants";

// styles
import styles from "./index.module.css";

// components
import Loadable from "../../components/utils/router/Loadable";
import {useSelector} from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {

  const [groupOpen, setGroupOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);

 /*  const friends = [
    {
      username: "Amritesh",
      amount: 90,
      subHead: "You owe him",
    },
    {
      username: "Alex",
      amount: -10,
    },
    {
      username: "Ninu",
      amount: 0,
    },
  ]; */
  useEffect(() => {
    axios(
      {
        method: "GET",
        url: UNAUTH_ADD + "/users/getUser/" + user.user_id + "/",
      }
    )
    .then((res) => {
  
      setDetails(res.data.user_data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [transactionOpen]);

  useEffect(() => {
    axios.get(UNAUTH_ADD + "/friends/getallFriends/"+user.user_id+"/")
    .then((res) => {
      setFriends(res.data.friends);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [friendsOpen,transactionOpen]);
  return (
    <div className={styles.container}>
      <h1 className={styles.dashboard}>Dashboard</h1>
      <div className={styles.detailsCard}>
        <div className={styles.leftDetails}>
          <p className={styles.name}>{details.username}</p>
          <p>{details.email}</p>
          <p>{details.phone_no}</p>
          <p>Budget: &#8377; {details.budget}</p>
        </div>
        <div className={styles.rightDetails}>
          <p>&#8377; {details.amount_spent?details.amount_spent:0}</p>
        </div>
      </div>
      <div className={styles.buttonMenu}>
        <button className={styles.button} onClick={() => setGroupOpen(true)}>
          Group +
        </button>
        <button className={styles.button} onClick={() => setFriendsOpen(true)}>
          Add Friend
        </button>
        <button
          className={styles.button}
          onClick={() => setTransactionOpen(true)}
        >
          Transaction +
        </button>
      </div>
      {groupOpen && (
        <CreateGroupModal open={groupOpen} setOpen={setGroupOpen} />
      )}
      {transactionOpen && (
        <AddTransactionModal
          open={transactionOpen}
          setOpen={setTransactionOpen}
        />
      )}
      {friendsOpen && (
        <AddFriendModal open={friendsOpen} setOpen={setFriendsOpen} />
      )}
      <div className={styles.friends}>
        <h2 className={styles.title}>Friends</h2>
        <div className={styles.friendsCard}>
          {friends.map((friend) => (
            <SmallInfoCard
              key={friend.user_id}
              username={friend.username}
              amount={friend.amount_owed?friend.amount_owed:0}
              subHead={friend.subHead}
            />
          ))}
          {friends.length===0 && <p>No Friends</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const SmallInfoCard = Loadable(
  lazy(() => import("../../components/design/Cards/SmallInfoCard"))
);
const CreateGroupModal = Loadable(
  lazy(() => import("../../components/design/Modal/CreateGroup"))
);
const AddTransactionModal = Loadable(
  lazy(() => import("../../components/design/Modal/AddTransaction"))
);
const AddFriendModal = Loadable(
  lazy(() => import("../../components/design/Modal/AddFriend"))
);
