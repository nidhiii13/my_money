import { useEffect, useState, lazy } from "react";
import { routes } from "../../constants/routes";
import axios from "axios";
import { UNAUTH_ADD } from "../../constants/api.constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// styles
import styles from "./index.module.css";

// components
import Loadable from "../../components/utils/router/Loadable";
import { Navigate } from "react-router-dom";

const Groups = () => {
  const [noGroups, setNoGroups] = useState(0);
  const [groupOpen, setGroupOpen] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    axios
      .get(UNAUTH_ADD + "/groups/getAllGroups/" + user.user_id + "/")
      .then((res) => {
        setGroupData(res.data.groups);
        setNoGroups(res.data.groups.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupOpen]);

  const deleteGroup = async (e, groupId) => {
    // groupData update this
    e.preventDefault();
    axios
      .delete(UNAUTH_ADD + "/groups/deleteGroup/" + groupId + "/")
      .then((res) => {
        const tempGroups = groupData;
        const newGroups = tempGroups.filter(
          (group) => group.group_id !== groupId
        );
        setGroupData(newGroups);
        setNoGroups(newGroups.length);
        navigate('/groups');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Groups</h1>
      <div className={styles.bodyContainer}>
        <div className={styles.topContainer}>
          <div>
            <p className={styles.groups}>Total No. of Groups</p>
            <br />
            <p className={styles.number}>{noGroups}</p>
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => setGroupOpen(true)}
            >
              Group +
            </button>
          </div>
        </div>
        {groupOpen && (
          <CreateGroupModal open={groupOpen} setOpen={setGroupOpen} />
        )}
        <div className={styles.groupCards}>
          {groupData.map((group) => (
            <GroupCards
              group={group}
              key={group.group_id}
              deleteGroup={deleteGroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;

const CreateGroupModal = Loadable(
  lazy(() => import("../../components/design/Modal/CreateGroup"))
);
const GroupCards = Loadable(
  lazy(() => import("../../components/design/Cards/GroupCards"))
);
