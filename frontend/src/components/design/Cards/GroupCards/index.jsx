import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// styles
import styles from "../index.module.css";

// 1x - 14px
// 2x - 28px
// 3x - 42px
// 4x - 56px
// 5x - 70px

const GroupCards = ({ group, deleteGroup }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.groupCard}>
      <div className={styles.groupDetails}>
        <p className={styles.groupName}>{group.group_name}</p>
        <p className={styles.groupDescription}>{group.group_description}</p>
      </div>
      <div className={styles.groupButtons}>
        <button
          className={`${styles.groupButton} ${styles.deletButton}`}
          onClick={(e) => {
            deleteGroup(e, group.group_id);
          }}
        >
          <MdDelete size={28} />
          <br />
          Delete
        </button>
        <button
          className={`${styles.groupButton} ${styles.editButton}`}
          onClick={() => navigate(`/group/${group.group_id}`)}
        >
          <RiEdit2Fill size={28} />
          <br />
          Details
        </button>
        <div className={`${styles.groupButton} ${styles.membersCard}`}>
          &#8377; {group.total_amount ? group.total_amount : 0}
          <br />
          Total Amount
        </div>
      </div>
    </div>
  );
};

export default GroupCards;
