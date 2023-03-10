import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // get the saved location
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // sign in the user
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        // reset the form
        form.reset();

        // redirect to the destination route after authenticating
        navigate(from, {replace: true});
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <p>
            <label htmlFor="email">Email:</label>
          </p>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div className="form-control">
          <p>
            <label htmlFor="password">Password:</label>
          </p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className="form-control">
          <input type="submit" value="Login" />
        </div>
      </form>
      <p>
        New to Ema John? <Link to="/signup">Create New Account</Link>
      </p>
    </div>
  );
};

export default Login;
