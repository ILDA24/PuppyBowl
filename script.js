const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${2305-FTB-ET-WEB-PT}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();
        const players = data.data.players;
        console.log(players);
        return players;

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

// Get single player by ID

const fetchSinglePlayer = async (playerId) => {
    try {
        // fetch single player
        const response = await fetch(`${APIURL}/${Id}`);
        const data = await response.json();
        const player = data.data.player;
        return player;

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

// Get a new player

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(APIURL, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json,'
            },
            body: json.stringify(playerObj),
            }
        );
    
    const result = await response.json();
    console.log(result);
    

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

// Remove a player

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${Id}`, {
            method: "DELETE",
        });
        const player = await response.json();
        fetchAllPlayers();

        // Reload Window
        window.location.reload();

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    if (!playerList || playerList.length === 0) {
        playerContainer.innerHTML = "<h3>No players found</h3>";
        return;
    }
    playerContainer.innerHTML = "";
    // Loop through players
    playerList.forEach((player) => {
        const playerElement = document.createElement("div");
        playerElement.playerList.add("player-card");
        playerElement.innerHTML = `
        <h4>${player.name}</h4>
        <img src="${player.image_url}" alt="${player.name}"
        <p>${player.status}</P>
        <p>${player.id}</p>
        <button class="Remove-button" data-id="${player.id}">Remove From Roster</button>
        <button class="details-button" data-id="${player.id}">See Details</button>`;
        playerContainer.appendChild(playerElement);
        // create remove button
        let RemoveButton = playerElement.querySelector(".Remove-button");
        RemoveButton.addEventListener("click", (event) => {
          const playerId = event.target.dataset.id
           event.preventDefault();
          removePlayer(player.id);
        });
        // create detail button to render single recipe
        let detailButton = playerElement.querySelector(".detail-button");
    detailButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderSinglePlayer(player);
    });

    // RENDER single player
const renderSinglePlayer = (player) => {
    // check if no players found
    if (!player|| player.length === 0) {
      playersContainer.innerHTML = "<h3>No player found</h3>";
      return;
    }
    // display single player
    let playerHTML = `
    <div class="single-player-view">
      <div class="players">
        <h4>${player.name}</h4>
        <img src="${player.image_url}" alt="${player.name}">
        <p>${player.status}</p>
        <p>${player.id}</p>
      </div>
  
      <button class="back-button">Back</button>
    </div>
    `;
    playersContainer.innerHTML = playerHTML;
    // create back button
    let backButton = playerContainer.querySelector(".back-button");
    backButton.addEventListener("click", async () => {
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });
  };
  

});
    try {
} catch (err) {
  console.error("Uh oh, trouble rendering players!", err);
}
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {

        let formHtml = `
        <form>
          <label for="name">Name</label>
          <input type="text id="name" name="name" placeholder="Name">
      
          <label for="image_url">Image URL</label>
          <input type="text id="image_url" name="image_url" placeholder="Image URL">

          <label for="status">Status</label>
          <input type="text id="status" name="status" placeholder="Status">
      
          <label for="breed">Breed</label>
          <textarea id="breed" name="breed" placeholder="Breed"></textarea>
          
          <label for="id">Id</label>
          <input type="number" id="id" name="id" placeholder="Id"

          <button type="submit">Create</button>
        </form>
        `;
        newPlayerFormContainer.innerHTML = formHtml;
        // add event listener
        let form = newPlayerFormContainer.querySelector("form");
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
      
          let playerData = {
            name: form.name.value,
            image_url: form.image_url.value,
            breed: form.breed.value,
            status: form.status.value,
            id: form.id.value,
          };
      
          await createNewPlayer(
            playerData.name,
            playerData.image_url,
            playerData.breed,
            playerData.status,
            playerData.id,
          );
      
          const player = await fetchAllPlayers();
          renderAllPlayers(players);
      
          form.name.value = "";
          form.image_urle.value = "";
          form.breed.value = "";
          form.status.value = "";
          form.id.value`` = "";
        });
      };

      
      try {}  
     catch (err) {
        Console.error('Uh oh, trouble rendering the new player form!', err);
    }


const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();