import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/UserActions";
import Header from "./../components/Header";

const Register = ({location, history}) => {
  window.scrollTo(0, 0);
  const [registerUser, setRegisterUser] = useState({
    name:"",
    email: "",
    password:""
  });


  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const {error, loading, userInfo} = userRegister;

  useEffect (() =>{
    if (userInfo) {
    history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  const handleRegisterUser = (e) => {
setRegisterUser((prevState) => {
  return{
    ...prevState,
    [e.target.name]: e.target.value
  }
})
  }

  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(register(registerUser));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
      {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        
        <form className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}>
          <input type="text" placeholder="Username"
          name="name"
            value={registerUser.name}
            onChange={handleRegisterUser} />

          <input type="email" placeholder="Email"
          name="email"
            value={registerUser.email}
            onChange={ handleRegisterUser} />

          <input type="password" placeholder="Password" name="password" 
            value={registerUser.password}
            onChange={handleRegisterUser}
          />

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login/redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
