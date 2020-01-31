import React, { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import ankiConnect from "./api/AnkiConnect";

function App() {
  const [deckNames, setDeckNames] = useState([]);

  useEffect(() => {
    const inits = async () => {
      const deckNames = await ankiConnect.deckNames();
      setDeckNames(deckNames);
    };
    inits();
  }, []);

  return (
    <div>
      <Header />
      <AddCard deckNamess={deckNames} />
      <SavedNote />
    </div>
  );
}

export default App;
