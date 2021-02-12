import "../styles/login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
      history.push("/");
    } catch {
      setErrorMessage("Niepoprawny email lub hasło!");
    }
  };

  return (
    <div className="login-page">
      <h1>Zaloguj się</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Wpisz email..."
            required
          />
        </div>
        <div>
          <label>Hasło</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Wpisz hasło..."
            required
          />
        </div>
        <span className="error-message">{errorMessage}</span>
        <span>
          Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link>
        </span>
        <button className="form-btn" type="submit">
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default Login;
