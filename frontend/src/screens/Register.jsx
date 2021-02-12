import "../styles/login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [homeAdress, setHomeAdress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/user/create",
        {
          email,
          password,
          name,
          homeAdress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      history.push("/logowanie");
      window.location.reload();
    } catch {
      setErrorMessage("Email jest już zarejestrowany!");
    }
  };

  return (
    <div className="login-page">
      <h1>Zarejestruj się</h1>
      <form onSubmit={(e) => handleRegister(e)}>
        <div>
          <label>Imię</label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Wpisz swoje imię..."
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Wpisz prawidłowy email!"
            placeholder="Wpisz email..."
            required
          />
        </div>
        <div>
          <label>Hasło</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Hasło musi mieć co najmiej 8 znaków, jedną wielką i jedną małą literę, znak specjalny oraz liczbę!"
            type="password"
            placeholder="Wpisz hasło..."
            required
          />
        </div>
        <div>
          <label>Adres</label>
          <input
            onChange={(e) => setHomeAdress(e.target.value)}
            placeholder="Wpisz swój adres domowy... (Kraj, Miasto, Ulica)"
            required
          />
        </div>
        <span className="error-message">{errorMessage}</span>
        <span>
          Masz już konto? <Link to="/logowanie">Zaloguj się</Link>
        </span>
        <button className="form-btn" type="submit">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;
