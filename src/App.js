import React, { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import ankiConnect from "./api/AnkiConnect";
import { MemoryRouter as Router, Route } from "react-router";

function App() {
  const [deckNames, setDeckNames] = useState([]);
  const [modelNames, setModelNames] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const inits = async () => {
      const deckNames = await ankiConnect.deckNames();
      setDeckNames(deckNames);
      const modelNames = await ankiConnect.modelNames();
      setModelNames(modelNames);
    };
    inits();
  }, []);

  const addCard = ({ deckName, modelName, front, back, tags }) => {
    setNotes(
      notes.concat({
        deckName: deckName,
        modelName: modelName,
        front: front,
        back: back,
        tags: tags
      })
    );
  };

  const deleteCard = front => {
    setNotes(notes.filter(note => note.front !== front));
  };

  const resetCard = front => {
    setNotes([]);
  };

  return (
    <Router>
      <Header />
      <Route
        exact
        path="/"
        render={() => (
          <AddCard
            deckNames={deckNames}
            modelNames={modelNames}
            addCard={addCard}
          />
        )}
      />
      <Route
        path="/save"
        render={() => (
          <SavedNote
            notes={notes}
            deleteCard={deleteCard}
            resetCard={resetCard}
          />
        )}
      />
    </Router>
  );
}

export default App;
