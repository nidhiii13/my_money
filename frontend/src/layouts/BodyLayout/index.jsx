import { Outlet } from "react-router-dom"; // needed to keep a track of all the children routes

// styles
import styles from "./index.module.css";

// components
import Navbar from "../../components/design/Navbar";

export default function BodyLayout({ navLinks }) {
  return (
    <main className={styles.container}>
      <Navbar navLinks={navLinks} />
      <Outlet />
    </main>
  );
}
