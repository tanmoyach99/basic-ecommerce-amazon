import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { register } from "../../actions/useActions";
import Loader from "../Loader/Loader";
import MessageBox from "../Loader/MessageBox";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      alert("password are not matched");
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  return (
    <div className="d-flex align-items-center justify-content-center">
      <form className="form" onSubmit={submitHandler}>
        {loading && <Loader></Loader>}
        {error && (
          <MessageBox>
            <p className="bg-danger">{error}</p>
          </MessageBox>
        )}
        <h1>Register</h1>
        <div>
          <label htmlFor="Email"> Name</label>
          <br />
          <input
            className="input-field"
            type="Name"
            id="Name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Email"> EMail Address</label>
          <br />
          <input
            className="input-field"
            type="Email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"> Password</label>
          <br />
          <input
            className="input-field"
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> confirm Password</label>
          <br />
          <input
            className="input-field"
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <br />
          <button onSubmit={submitHandler} type="submit">
            {" "}
            Register
          </button>
        </div>
        <div>
          <label />
          <br />
          <div>
            Already have an account?{" "}
            <Link to={`/signIn?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
