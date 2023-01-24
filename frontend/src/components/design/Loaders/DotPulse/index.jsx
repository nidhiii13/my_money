import styles from "./Dot.module.css";

function DotPulse({ customStyles, background = "#ffdc37" }) {
  return (
    <div className={styles.loadingContainer1} style={customStyles}>
      <div style={{ background }} className={styles.dot1}></div>
      <div style={{ background }} className={styles.dot2}></div>
      <div style={{ background }} className={styles.dot3}></div>
      <div style={{ background }} className={styles.dot4}></div>
    </div>
  );
}

export default DotPulse;
