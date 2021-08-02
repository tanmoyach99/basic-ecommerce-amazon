import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { signIn } from "../../actions/useActions";
import Loader from "../Loader/Loader";
import MessageBox from "../Loader/MessageBox";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  console.log(userSignIn);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="form" onSubmit={submitHandler}>
        {loading && <Loader></Loader>}
        {error && (
          <MessageBox>
            <p className="bg-danger">{error}</p>
          </MessageBox>
        )}
        <h1>sign In</h1>
        <div>
          <label className="text-start" htmlFor="Email">
            {" "}
            Email address
          </label>

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
          <label />
          <button onSubmit={submitHandler} type="submit">
            {" "}
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create Your Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
