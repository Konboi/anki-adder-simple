import React, { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import ankiConnect from "./api/AnkiConnect";
import { MemoryRouter as Router, Route } from "react-router";
import { connect } from "react-redux";
import { initNotes } from "./reducer/noteReducer";

const App = props => {
  const [deckNames, setDeckNames] = useState([]);
  const [modelNames, setModelNames] = useState([]);

  useEffect(() => {
    const inits = async () => {
      const deckNames = await ankiConnect.deckNames();
      setDeckNames(deckNames);
      const modelNames = await ankiConnect.modelNames();
      setModelNames(modelNames);
      props.initNotes();
    };
    inits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <Route
        exact
        path="/"
        render={() => <AddCard deckNames={deckNames} modelNames={modelNames} />}
      />
      <Route path="/save" render={() => <SavedNote />} />
    </Router>
  );
};

const mapToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapToProps, { initNotes })(App);
