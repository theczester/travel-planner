import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Travels from "./screens/Travels.jsx";
import Register from "./screens/Register.jsx";
import Profile from "./screens/Profile.jsx";
import Header from "./components/Header.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logowanie" component={Login} />
          <Route path="/rejestracja" component={Register} />
          <Route path="/podroze" component={Travels} />
          <Route path="/konto" component={Profile} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
