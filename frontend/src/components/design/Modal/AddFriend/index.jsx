import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from 'react-redux'

// styles
import styles from "../index.module.css";

// components
import SingleSelect from "../../Form/SingleSelect";
import { UNAUTH_ADD } from "../../../../constants/api.constants";


const AddFriendModal = ({ open, setOpen }) => {
  const [name, setName] = useState();
  const [members, setMembers] = useState([]); // from backend
  const user = useSelector(state => state.userReducer);

  useEffect(() => {
    // fetch members from backend
    axios.get(UNAUTH_ADD + "/users/getallUsers/"+user.user_id+"/")
    .then((res) => {
      setMembers(res.data.users);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []); 

  const addFriend = () => {
    // add friend to backend
    var formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("friend_id", name);


    /* axios({
      method : "POST",
      link : UNAUTH_ADD + "/friends/addFriend/", 
      data : formData,
   })
    .then((res) => {
      setOpen(false);
    })
    .catch((err) => {
      console.log(err);
    });
    */
   fetch(UNAUTH_ADD + "/friends/addFriend/", {
      
      method: "POST",
      body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        setOpen(false);
      }
      );
  }; 


 
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add Friend</h1>
        <div>
          <SingleSelect
            options={members}
            label="Add Friend"
            title="username"
            setVal={setName}
            valueSetter="user_id"
          />
        </div>
        <button
          className={styles.button}
          onClick={addFriend}
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default AddFriendModal;
