import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home/Home";
import CreateDeck from "../Components/Decks/CreateDeck";
import DisplayDeck from "../Components/Decks/DisplayDeck";
import Study from "../Components/Study/Study";
import EditDeck from "../Components/Decks/EditDeck";
import AddCard from "../Components/Decks/AddCard";
import EditCard from "../Components/Decks/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route path="/decks/new">
              <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
              <DisplayDeck />
          </Route>
          <Route path="/decks/:deckId/study">
              <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
              <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
              <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
