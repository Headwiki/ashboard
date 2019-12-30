import React from 'react';
import ApolloClient from "apollo-boost"; //connect with our server which is running at backend
import { ApolloProvider } from "react-apollo"; // Connect react with apollo.

import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import NavMenu from "./components/NavMenu";
import ActionMenu from "./components/ActionMenu";

//Using ApolloClient to connect with server
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <NavMenu />
        <ActionMenu />
        <Main />
      </div>
    </ApolloProvider>
  );
}

export default App;
