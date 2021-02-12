import { useEffect } from "react";
import axios from "axios";
import "../styles/header.css";
import { Map } from "react-feather";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  let location = useLocation();

  const loggedIn = JSON.parse(localStorage.getItem("userInfo")) ? true : false;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const authUser = async () => {
      try {
        await axios.post(
          "/api/user/auth",
          {
            token: `Bearer ${userInfo ? userInfo.token : null}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.log(err);
        if (
          location.pathname !== "/logowanie" &&
          location.pathname !== "/rejestracja"
        ) {
          history.push("/logowanie");
        }
      }
    };
    authUser();
  }, []);

  return (
    <header>
      <Link to="/" className={!loggedIn ? "disabled-link" : ""}>
        <h1>
          Travel Planner <Map />
        </h1>
      </Link>
      <nav>
        <Link to="/" className={!loggedIn ? "disabled-link" : ""}>
          Mapa
        </Link>
        <Link to="/podroze" className={!loggedIn ? "disabled-link" : ""}>
          Podróże
        </Link>
        <Link to="/konto" className={!loggedIn ? "disabled-link" : ""}>
          Konto
        </Link>
      </nav>
    </header>
  );
};

export default Header;
