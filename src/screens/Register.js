import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { createUser } from "../features/userSlice";
import { store } from "../store";
import { useNavigate } from "react-router-dom";
// import { register } from "../Redux/Actions/UserActions";
import Header from "./../components/Header";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoading, user, error, errorMsg } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  // const userRegister = useSelector((state) => state.userRegister);
  // const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleRegisterUser = (e) => {
    setRegisterUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = registerUser;
    if (name && email && password) {
      store.dispatch(createUser(registerUser));
    }
  };

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
            type="text"
            placeholder="Username"
            name="name"
            value={registerUser.name}
            onChange={handleRegisterUser}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={registerUser.email}
            onChange={handleRegisterUser}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={registerUser.password}
            onChange={handleRegisterUser}
          />

          <button type="submit">Register</button>
          <p>
            {/* <Link to={redirect ? `/login/redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link> */}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
