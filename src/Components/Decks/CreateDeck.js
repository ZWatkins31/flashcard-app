import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

/////////// Component should display a deck creation form /////////////

function CreateDeck() {
    const history = useHistory();

    // declare initial form state variable
    const initialState = {
        name: "",
        description: "",
    };

    // set newDeck default state to using initialState variable
    const [newDeck, setNewDeck] = useState(initialState);

    // on change, update & set newDeck variable with targetted values
    function handleChange({ target }) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        });
    }

    // on submit, use createDeck from utils/api/index.js to save the deck to the database
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await createDeck(newDeck);
        // use history hook to go back to home page once submitted
        history.push("/");
        return response;
    }

    async function handleCancel() {
        history.push("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.name}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.description}
                    />
                </div>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateDeck;