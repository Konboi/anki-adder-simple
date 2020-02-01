import React, { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import ankiConnect from "./api/AnkiConnect";

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
    <div>
      <Header />
      <AddCard
        deckNames={deckNames}
        modelNames={modelNames}
        addCard={addCard}
      />
      <SavedNote notes={notes} deleteCard={deleteCard} resetCard={resetCard} />
    </div>
  );
}

export default App;
