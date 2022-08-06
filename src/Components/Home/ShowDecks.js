import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { deleteDeck, listDecks } from "./../../utils/api/index";

/////////// This function should list all existing decks ///////////

function ShowDecks() {

    const history = useHistory();

    // declare variable, decks, with default state set to an empty array
    const [decks, setDecks] = useState([]);


    // use useEffect hook to fetch deck data
    // pass empty array as second parameter in the hook to run fetch only once (only on page load up)
    useEffect(() => {
        // declare async fetching function
        const fetchDecks = async () => {
            // use await to call listDecks, which returns all existing decks by making API call using fetch
            // await just tells code to wait until listDecks has resolved
            const response = await listDecks();
            setDecks(response);
        }
        // call fetchDecks function
        fetchDecks();
    }, []);

    console.log(decks);

    // map over decks to create list of existing decks
    // with buttons (links) to View, Study & Delete each deck listing
    // should also show how many cards are in each deck
    // creates a card listing for each deck
    const deckListings = decks.map((deck) => {
    const cards = deck.cards;
    
    const handleDelete = async () => {
      // 'Delete' btn is clicked; if 'confirmed', calls 'deleteDeck' function from utils/api/index.js
      if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it once deleted.")){
        await deleteDeck(deck.id);
        // 'history.go(0)' refreshes the page
        // for more info see Thinkful mod 29.5
        history.go(0);
      }
      else { history.go(0) }
    }
    
    return (
      <div className="col-sm-6" key={deck.id}>
        <div className="card">
          <div className="card-body">
            <div className='d-flex justify-content-between'>
              <h5 className="card-title">{deck.name}</h5>
              <p>{`${cards.length} cards`}</p>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
              </div>
              <div>
                <button className="btn btn-danger" onMouseDown={(event) => event.target.parentElement.parentElement.parentElement.style.backgroundColor = "#E8eff1"} onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  })
  
  return (
    <div className="row">
      {deckListings}
    </div>
  )
}


export default ShowDecks;