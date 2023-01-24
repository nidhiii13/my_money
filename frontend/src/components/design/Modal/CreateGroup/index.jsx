import Modal from "@mui/material/Modal";
import { useState, useEffect, lazy } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { UNAUTH_ADD } from "../../../../constants/api.constants";

// styles
import styles from "../index.module.css";

// components
import Form from "../../Form";
import SingleSelect from "../../Form/SingleSelect";
import Loadable from "../../../utils/router/Loadable";

const CreateGroupModal = ({ open, setOpen }) => {
  const user = useSelector((state) => state.userReducer);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [members, setMembers] = useState([]);
  const [membersList, setMembersList] = useState([]); // set it using data from backend
  const [newMember, setNewMember] = useState();
  const [addingMember, setAddingMember] = useState(false);

  const groupForm = [
    {
      label: "Group Name",
      input: "input",
      denote_var: name,
      set_var: setName,
    },
    {
      label: "Group Details",
      input: "textarea",
      denote_var: details,
      set_var: setDetails,
    },
  ];

  useEffect(() => {
    // fetch members from backend
    axios
      .get(UNAUTH_ADD + "/friends/getallFriends/" + user.user_id + "/")
      .then((res) => {
        setMembersList(res.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createGroup = () => {
    const user_members = [...members, { user_id: user.user_id }];
    var formData = new FormData();
    formData.append("group_name", name);
    formData.append("group_description", details);
    formData.append("members", JSON.stringify(user_members));
    axios({
      method: "post",
      url: UNAUTH_ADD + "/groups/createGroup/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create Group</h1>
        <div>
          <Form form_construct={groupForm} />
          {addingMember && (
            <SingleSelect
              options={membersList}
              label="Add Members"
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
        </div>
        <button className={styles.button} onClick={createGroup}>
          Create Group
        </button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;

const MemoCard = Loadable(lazy(() => import("../../Cards/MemoCard")));
