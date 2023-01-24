import { useNavigate } from "react-router-dom";

// styles
import styles from "../index.module.css";

const SmallInfoCard = ({
  username,
  amount,
  subHead,
  transactionId,
  isGroup,
}) => {
  const navigate = useNavigate();
  const redirectButton = () => {
    if (transactionId && isGroup) {
      navigate(`/transaction/${transactionId}/${true}`);
    } else if (transactionId && !isGroup) {
      navigate(`/transaction/${transactionId}/${false}`);
    }
  };
  return (
    <div
      className={`${styles.friendCard} ${
        amount > 0 ? styles.profit : amount < 0 ? styles.loss : styles.normal
      } ${transactionId ? styles.cursorPointer : ""}`}
      onClick={redirectButton}
    >
      <div>
        <p className={styles.bodyText}>{username}</p>
        <p className={styles.subBodyText}>{subHead}</p>
      </div>
      {amount === 0 ? (
        <p className={styles.normalLabel}>Settled</p>
      ) : (
        <p
          className={`${styles.bodyText} ${
            amount > 0
              ? styles.profitLabel
              : amount < 0
              ? styles.lossLabel
              : styles.normalLabel
          }`}
        >
          &#8377; {amount}
        </p>
      )}
    </div>
  );
};

export default SmallInfoCard;
