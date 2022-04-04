import React from "react";
import AddCard from "./components/AddCard";
import Header from "./components/Header";
import SavedNote from "./components/SavedNote";
import { MemoryRouter as Router, Route } from "react-router";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/" element={<AddCard />} />
      <Route path="/save" element={<SavedNote />} />
    </Router>
  );
};

export default App;
