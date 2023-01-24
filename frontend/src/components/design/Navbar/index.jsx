import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// styles
import styles from "./index.module.css";

// components
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "@mui/material/Drawer";
import Menu from "./Menu";
import Divider from "@mui/material/Divider";

const Navbar = ({ navLinks }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.container} >
      <h1 className={styles.logo} onClick={() => navigate("/")}>
        MY MONEY
      </h1>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          {navLinks.map((link, linkIdx) => (
            <Link to={link.path} key={linkIdx} className={styles.navLinkContainer}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <GiHamburgerMenu
        className={styles.menuIcon}
        onClick={() => setOpen(true)}
      />
      <Drawer
        anchor="right"
        classes={{ paper: styles.drawer }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu items={navLinks} />
        <Divider />
      </Drawer>
    </header>
  );
};

export default Navbar;
