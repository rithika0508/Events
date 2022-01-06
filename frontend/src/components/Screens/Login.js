import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      history("/");
    }
  }, [history]);
  const login = async (e) => {
    setError("")
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setError("");
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("auth", data.token);
      history("/");
    } catch (error) {
      setError("Invalid Credentials")
    }
  };
  return (
    <div className="register">
      <form onSubmit={login} className="register__form">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="floatingPassword">Password</label>
        </div>
        {error && <p>{error}</p>}
        <div className="btn">
          <button type="submit" className="btn btn-outline-primary mt-4">
            Login
          </button>
          <br />
          <span className="login__subtext">
            Dont have an Account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default LoginScreen;
