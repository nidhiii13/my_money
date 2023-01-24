import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// styles
import styles from "./index.module.css";

// components
import Form from "../../components/design/Form";

// constants
import { UNAUTH_ADD } from "../../constants/api.constants";
import { routes } from "../../constants/routes";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(0);
  const navigate = useNavigate();

  const signUp_main = [
    {
      label: "Username",
      input: "input",
      denote_var: username,
      set_var: setUsername,
    },
    {
      label: "Password",
      input: "password",
      denote_var: password,
      set_var: setPassword,
    },
    {
      label: "Confirm Password",
      input: "password",
      denote_var: reTypePassword,
      set_var: setReTypePassword,
    },
    {
      label: "Phone",
      input: "input",
      denote_var: phone,
      set_var: setPhone,
    },
    {
      label: "Email",
      input: "input",
      denote_var: email,
      set_var: setEmail,
    },
    {
      label: "Budget",
      input: "input",
      denote_var: budget,
      set_var: setBudget,
    },
  ];

  const submitButton = async () => {
    if (password !== reTypePassword) {
      alert("Passwords do not match");
      return;
    }
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone_no", phone);
    formData.append("email", email);
    formData.append("budget", budget);
    /* fetch(UNAUTH_ADD + "/users/signup/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }); */
      axios({
        method: "POST",
        data: formData,
        url: UNAUTH_ADD + "/users/signup/",
      }).then((res) => {
        navigate(routes.LOGIN);
      }).catch((err) => {
        setUsername("");
        setPassword("");
        setReTypePassword("");
        setPhone("");
        setEmail("");
        setBudget(0);
        alert("Error Occured", err);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.formContainer}>
        <Form form_construct={signUp_main} />
        <button className={styles.button} onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;
