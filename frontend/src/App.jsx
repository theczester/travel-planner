import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
