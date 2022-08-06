import React from "react";
import CreateDeckButton from "./CreateDeckButton";
import ShowDecks from "./ShowDecks";

function Home() {
  
  return (
    <div className="container">
      <CreateDeckButton />
      <ShowDecks />
    </div>
  )
} 

export default Home;