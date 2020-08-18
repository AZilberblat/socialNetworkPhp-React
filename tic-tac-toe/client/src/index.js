import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserHistory } from "history";
import Game from "./components/Game";
import Login from "./login";
import Register from "./register";
const history = createBrowserHistory();

const MainApp = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};
ReactDOM.render(<MainApp />, document.getElementById("root"));
