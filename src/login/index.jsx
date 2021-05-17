import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useUserStoreAPI } from "../stores/user.store";
import { getItemFromLocalStorage } from "../utils/local.storage";
import styles from "./login.module.css";

export function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showAutenticationError, setShowAutenticationError] = useState(false);

  const setStoreData = (data) => {
    useUserStoreAPI.getState().setUserDetails(data.USER_DETAILS);
    useUserStoreAPI.getState().setMails(data.MAILS, data.id);
    useUserStoreAPI.getState().setSentMails(data.SENT_MAILS, data.id);
  };

  const onLogin = () => {
    console.log(passwordRef.current.value);

    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    const mockData = getItemFromLocalStorage("mock_data");

    if (password.length && userName.length) {
      if (
        userName === mockData.USER_1.USERNAME &&
        password === mockData.USER_1.PASSWORD
      ) {
        useUserStoreAPI.getState().setIsLoggedIn(true);
        setStoreData(mockData.USER_1);
        history.push("/home");
      } else if (
        userName === mockData.USER_2.USERNAME &&
        password === mockData.USER_2.PASSWORD
      ) {
        setStoreData(mockData.USER_2);
        useUserStoreAPI.getState().setIsLoggedIn(true);
        history.push("/home");
      } else {
        setShowAutenticationError(true);
      }
      console.log(useUserStoreAPI.getState());
    } else {
      setShowPasswordError(password.length ? false : true);
      setShowUsernameError(userName.length ? false : true);
    }
  };
  return (
    <form className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div
          data-testid="loginContainer"
          className={`title ${styles.formTitle}`}
        >
          Account login
        </div>
        <div className={styles.inputField}>
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            data-testid="usernameInput"
            type="text"
            placeholder="Enter Username"
            name="uname"
            ref={usernameRef}
          />
          {showUsernameError && usernameRef.current.value.length === 0 && (
            <div data-testid="usernameError" className={styles.validationError}>
              value is required
            </div>
          )}
        </div>
        <div className={styles.inputField}>
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            data-testid="passwordInput"
            type="password"
            placeholder="Enter Password"
            name="psw"
            ref={passwordRef}
          />
          {showPasswordError && passwordRef.current.value.length === 0 && (
            <div data-testid="passwordError" className={styles.validationError}>
              value is required
            </div>
          )}
        </div>
        {showAutenticationError && (
          <div className={styles.validationError}>wrong credentials</div>
        )}
        <button
          type="button"
          data-testid="loginButton"
          className={styles.loginButton}
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
}
