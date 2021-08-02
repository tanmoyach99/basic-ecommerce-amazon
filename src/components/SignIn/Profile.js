import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/useActions";
import { UPDATE_USER_PROFILE_RESET } from "../../constants/userConstants";

const Profile = () => {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  //   console.log(userInfo);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { user: successUpdate, loading: loadingUpdate } = userUpdateProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch({ type: UPDATE_USER_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    console.log("submit clicked");
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password not matched");
    } else {
      dispatch(updateUserProfile({ userId: user?._id, name, email, password }));
    }
  };
  return (
    <div>
      {successUpdate && (
        <p className="text-success">user updated successfully</p>
      )}
      <form action="" className="form" onClick={submitHandler}>
        <div>
          <label htmlFor="Email"> Name</label>
          <br />
          <input
            className="input-field"
            type="Name"
            id="Name"
            placeholder="Enter Name"
            value={name}
            // required
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
            value={email}
            // required
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
            // value={user?.password}
            // required
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
            // required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>
            <button type="submit" className="btn btn-warning">
              Update Profile
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Profile;
