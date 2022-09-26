import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { loginUser } from "../features/userSlice";
import { redirect } from "react-router-dom";
import { store } from "../store";

const Login = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.user);
  const { error, isLoading, user, errorMsg } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      store.dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{errorMsg}</Message>}
        {isLoading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link to="/register">Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
