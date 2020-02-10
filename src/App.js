import React from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import { MemoryRouter as Router, Route } from "react-router";
import { connect } from "react-redux";

const App = props => {
  return (
    <Router>
      <Header />
      <Route exact path="/" render={() => <AddCard />} />
      <Route path="/save" render={() => <SavedNote />} />
    </Router>
  );
};

export default connect(null, {})(App);
