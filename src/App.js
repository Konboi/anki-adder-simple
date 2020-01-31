import React, { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import ankiConnect from "./api/AnkiConnect";

function App() {
  const [deckNames, setDeckNames] = useState([]);
  const [modelNames, setModelNames] = useState([]);

  useEffect(() => {
    const inits = async () => {
      const deckNames = await ankiConnect.deckNames();
      setDeckNames(deckNames);
      const modelNames = await ankiConnect.modelNames();
      setModelNames(modelNames);
    };
    inits();
  }, []);

  return (
    <div>
      <Header />
      <AddCard deckNames={deckNames} modelNames={modelNames} />
      <SavedNote />
    </div>
  );
}

export default App;
