import React from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";

function App() {
  return (
    <div>
      <Header />
      <AddCard />
      <SavedNote />
    </div>
  );
}

export default App;
