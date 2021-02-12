import "../styles/profile.css";
import "../styles/login.css";
import { useState, useEffect } from "react";
import { Edit3, Trash2 } from "react-feather";
import axios from "axios";

const Profile = ({ history }) => {
  const [userInfo, setUserInfo] = useState({});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [homeAdress, setHomeAdress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.post(
        "api/user/profile",
        {
          userID: JSON.parse(localStorage.getItem("userInfo"))["_id"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo"))["token"]
            }`,
          },
        }
      );
      setUserInfo(data);
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (password === confirmPassword || password.length <= 0) {
      setEditMode(false);
      setErrorMessage("Zmiany zapisane!");
      try {
        await axios.put(
          `/api/user/${JSON.parse(localStorage.getItem("userInfo"))["_id"]}`,
          {
            name,
            email,
            password,
            homeAdress,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${
                JSON.parse(localStorage.getItem("userInfo"))["token"]
              }`,
            },
          }
        );
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Wpisz te same hasła!");
    }
  };

  const handleLogout = () => {
    history.push("/login");
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
    setErrorMessage("");
  };

  const handleDeleteUser = async () => {
    history.push("/logowanie");
    window.location.reload();
    try {
      await axios.delete(
        `/api/user/${JSON.parse(localStorage.getItem("userInfo"))["_id"]}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo"))["token"]
            }`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-page login-page">
      <div className="header-and-edit">
        <h1>Cześć {userInfo.name}!</h1>
        <div className="edit-delete-profile-toggler">
          <div onClick={() => toggleEdit()}>
            <span>Edytuj profil</span>
            <Edit3 />
          </div>
          <div onClick={() => handleDeleteUser()}>
            <span style={{ color: "red" }}>Usuń konto</span>
            <Trash2 color="red" />
          </div>
        </div>
      </div>
      <form onSubmit={(e) => handleProfileUpdate(e)}>
        <div>
          <label>Imię</label>
          <input
            disabled={!editMode}
            onChange={(e) => setName(e.target.value)}
            placeholder="Wpisz nowe imię..."
            defaultValue={userInfo.name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            disabled={!editMode}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Wpisz prawidłowy email!"
            placeholder="Wpisz nowy email..."
            defaultValue={userInfo.email}
          />
        </div>
        {editMode && (
          <>
            <div>
              <label>Hasło</label>
              <input
                disabled={!editMode}
                onChange={(e) => setPassword(e.target.value)}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Hasło musi mieć co najmiej 8 znaków, jedną wielką i jedną małą literę, znak specjalny oraz liczbę!"
                type="password"
                defaultValue=""
                placeholder="Wpisz nowe hasło..."
              />
            </div>
            <div>
              <label>Powtórz</label>
              <input
                disabled={!editMode}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Wpisz ponownie nowe hasło..."
                defaultValue=""
              />
            </div>
          </>
        )}

        <div>
          <label>Adres</label>
          <input
            disabled={!editMode}
            onChange={(e) => setHomeAdress(e.target.value)}
            placeholder="Wpisz swój adres domowy... (Kraj, Miasto, Ulica)"
            defaultValue={userInfo.homeAdress}
          />
        </div>

        <span className="error-message">{errorMessage}</span>
        {editMode && (
          <button className="form-btn" type="submit">
            Zapisz zmiany
          </button>
        )}
      </form>
      <button
        className="form-btn"
        onClick={() => handleLogout()}
        style={{ padding: "0.8rem 2.8rem", borderColor: "red" }}
      >
        Wyloguj się
      </button>
    </div>
  );
};

export default Profile;
