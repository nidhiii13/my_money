import { useState } from "react";

// styles
import styles from "./index.module.css";

// components
import Form from "../../components/design/Form";
import { UNAUTH_ADD } from "../../constants/api.constants";
import { loginUser } from "../../redux/ducks/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const onSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios({
      method: "POST",
      url: UNAUTH_ADD + "/users/login/",
      data: formData,
    }).then((res) => {
      var login_data = {
        user_id: res.data.user_id,
        token: res.data.token,
      };
      sessionStorage.setItem("user_id", res.data.user_id);
      sessionStorage.setItem("token", res.data.token);
      dispatch(loginUser(login_data));
      navigate(routes.BASE);
    }).catch((err) => {
      alert("The username or password is wrong please fill correctly.");
      setUsername("");
      setPassword("");
    })
  };

  const signLogin_main = [
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
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.formContainer}>
        <Form form_construct={signLogin_main} />
        <button className={styles.button} onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
