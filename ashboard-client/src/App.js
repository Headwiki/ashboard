import React from 'react';
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import NavMenu from "./components/NavMenu";
import ActionMenu from "./components/ActionMenu";

function App() {
  return (
    <div className="App">
      <Header />
      <NavMenu />
      <Main />
      <ActionMenu />
    </div>
  );
}

export default App;
