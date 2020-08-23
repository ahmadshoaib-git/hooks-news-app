import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import Firebase from "../../firebase";
const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, AuthenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  async function AuthenticateUser() {
    const { name, email, password } = values;
    try {
      const response = !login
        ? await Firebase.login(email, password)
        : await Firebase.register(name, email, password);
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error ", err);
      setFirebaseError(err.message);
    }
  }
  return (
    <div>
      <h2 className="mv3">{!login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {login && (
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="off"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          placeholder="Your Email"
          autoComplete="off"
          name="email"
          className={errors.email && "error-input"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          placeholder="Choose a secure password"
          name="password"
          className={errors.password && "error-input"}
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {!login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
