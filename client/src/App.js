import React from "react";
import "./App.css";
import Discription from "./components/Discription/Discription";
import Home from "./components/home";
import Update from "./components/Updateproduct/Update";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <ConfigProvider direction="rtl">
      <Router>
        <Switch>
          <Route path="/discription/:idParam">
            <Discription />
          </Route>
          <Route path="/update_products/">
            <Update />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
