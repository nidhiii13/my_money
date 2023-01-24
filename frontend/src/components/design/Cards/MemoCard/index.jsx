// styles
import styles from "../index.module.css";

const MemoCard = ({ member }) => {
  return (
    <div className={styles.member}>
      <p>{member}</p>
    </div>
  );
};

export default MemoCard;
