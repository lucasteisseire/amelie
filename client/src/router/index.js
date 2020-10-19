import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/header";

const UsersPage = React.lazy(() => import("../pages/UsersPage"));
const TeamsPage = React.lazy(() => import("../pages/TeamsPage"));

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/users' component={UsersPage} />
        <Route exact path='/teams' component={TeamsPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
