import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";

///////// Component should display all of the information about a deck /////////

function DisplayDeck () {
    const history = useHistory();
    const { deckId } = useParams();

    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // create function that calls on readDeck from utils/api/index.js, which retrieves the deck with the specified `deckId`
        async function getDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        getDeck();
        // function is called everytime 'deckId' changes
    }, [deckId]);


    async function handleDeleteDeck(deck) {
        if (window.confirm("Delete this deck? You will not be able to recover it once deleted.")){
            await deleteDeck(deck.id);
            // redirect to the home page if deleted
            history.push("/")
        } else {
            // if the delete is not confirmed, leave the deck as is and remain on the same page
            history.go(0)
        }
    }

    async function handleDeleteCard(card) {
        if (window.confirm("Delete this card? You will not be able to recover it once deleted.")){
            await deleteCard(card.id);
            history.go(0)
        } else {
            history.go(0)
        }
    }

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleEditCard(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }


    // if there is no deck or no cards, return null
    if (!deck || !cards){
        return null;
    } else {
        return (
      <div className="col-9 mx-auto">
        {/* a navigation bar with the following links */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* a link to the home page */}
            <li className="breadcrumb-item">
              <Link to={"/"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
              </svg>
                Home
              </Link>
            </li>

            {/* a string containing the deck's name */}
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>

        {/* a container holding the card deck, including their name,
                description, a button to study it, a button to edit it, a 
                button to add cards to the deck, and a button to delete it */}

        <div className="card border-0 mb-4">
          <div className="card-body">
            {/* deck name */}
            <div className="row px-3">
              <h5 className="card-title">{deck.name}</h5>
            </div>

            {/* deck description */}
            <p className="card-text">{deck.description}</p>

            <div className="row px-3">
              {/* edit button */}
              <button 
                className="btn btn-secondary"
                onClick={() => handleEditDeck()}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 20 20">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
                Edit
              </button>

              {/* study button */}
              <button
                className="btn btn-primary ml-2"
                onClick={() => handleStudy()}
              >  
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
              </svg>
                Study
              </button>

              {/* add cards button */}
              <button
                className="btn btn-primary ml-2"
                onClick={() => handleAddCard()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 1 20 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                Add Cards
              </button>

              {/* delete button */}
              <button
                onClick={() => handleDeleteDeck(deck)}
                className="btn btn-danger ml-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        {/* a container containing all cards, including their front, back
                an edit button, and a delete button */}

        <div className="row pl-3 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  {/* front */}
                  <p className="col-6 card-text">{card.front}</p>

                  {/* back */}
                  <p className="col-6 card-text">{card.back}</p>
                </div>

                <div className="d-flex justify-content-end p-2">
                  {/* edit button */}
                  <button
                    onClick={() => handleEditCard(card)}
                    className="btn btn-secondary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 20 20">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCard(card)}
                    className="btn btn-danger ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    {/* Delete */}
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        )
    }

}
export default DisplayDeck;