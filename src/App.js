import React, { useEffect } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import { MemoryRouter as Router, Route } from "react-router";
import { connect } from "react-redux";
import { initNotes } from "./reducer/noteReducer";
import { initDecks } from "./reducer/deckReducer";
import { initModels } from "./reducer/modelReducer";
import { initCurrentDeck } from "./reducer/currentDeckReducer";
import { initCurrentModel } from "./reducer/currentModelReducer";
import { initCurrentFront } from "./reducer/currentFrontReducer";

const App = props => {
  useEffect(() => {
    const inits = async () => {
      props.initDecks();
      props.initModels();
      props.initNotes();
      props.initCurrentDeck();
      props.initCurrentModel();
      props.initCurrentFront();
    };
    inits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" render={() => <AddCard />} />
      <Route path="/save" render={() => <SavedNote />} />
    </Router>
  );
};

const mapToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapToProps, {
  initNotes,
  initDecks,
  initModels,
  initCurrentDeck,
  initCurrentModel,
  initCurrentFront
})(App);
