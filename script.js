const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-FTB-ET-WEB-FT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;



/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players`, {
            method: "GET",
            body: JSON.stringify()});
        
        const data = await response.json();
        console.log("Success, response: ", response); 
        console.log("Success, data: ", data)
        return data;
        

    } catch (error) {
        console.error('Uh oh, trouble fetching players!', error);
    }
};

//Get single player by ID

const fetchSinglePlayer = async (id) => {
    try {
        const response = await fetch(`${APIURL}/players/${id}`);
        const player = await response.json();
        return player.data.player;
    } catch (err) {
        console.error('Oh no, trouble fetching player ID', err);
    }
};


const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}/players`, {
            method: "POST",
            body: JSON.stringify({id, breed, teamId, imageUrl}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        fetchAllPlayers();

    } catch (error) {
        console.error('Oops, something went wrong with adding that player!', error);
    }
};

//Remove a player by ID

const removePlayer = async (id) => {
    try {
        const response = await fetch(`${APIURL}/players/${id}`, {
            method: "DELETE",
        });
        const player = await response.json();
        fetchAllPlayers();

        // reload the window
        window.location.reload();
    } catch (error) {
        console.error(`Whoops, trouble removing player #${id} from the roster!`, error);
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


// Render all the players
// Create the details button and remove from roster button
const renderAllPlayers = (playerList) => {
    try {

        if(!playerList || playerList.length === 0) {
            console.log("Nothing Found");
            return
        } else {
            const playerData = (playerList.data.players);
            console.log("RENDER: ", playerData);

            //loop throught players

            for (let i = 0; i < playerData.length; i++) { 
                    const playerLi = document.createElement("div");
                    playerLi.classList.add("Puppers")
                    playerLi.innerHTML = `<h4>ID: ${playerData[i].id}</h4>
                                         <img src = "${playerData[i].imageUrl}"> 
                                         <p>Name: ${playerData[i].name} 
                                         Breed: ${playerData[i].breed}
                                         Team: ${playerData[i].teamId}</p>

                                        <button class="details-button" data-id="${playerData[i].id}">Details</button>
                                        <button class="delete-button" data-id="${playerData[i].id}">Remove from Roster</button>
                                         `;                                         
                    playerContainer.appendChild(playerLi);

                // create details button
                const detailsButton = playerLi.querySelector(".details-button");
                detailsButton.addEventListener('click', async (event) => {
                    try {
                        const id = playerData[i].id;
                        const player = await fetchSinglePlayer(id);
                        renderSinglePlayer(player);
                    } catch (error) {
                        console.error(error);
                    }
                });

          
                const deleteButton = playerLi.querySelector('.delete-button');
                deleteButton.addEventListener('click', async (event) => {
                    event.preventDefault();
                    removePlayer(playerData[i].id);
                });
            }
        }
    } catch (error) {
        console.error('Uh oh, trouble rendering players!', error);
    }
};

//render single player
const renderSinglePlayer = (player) => {
    // check if no player found
    if (!player || player.length === 0) {
        playerContainer.innerHTML = "<h3>No player found</h3>";
        return;
    }
    // display single player
    let playerHTML = `
    <div class="single-player-view">
      <div class="player">
        <h1 class="player-name">${player.name}</h4>
        <img src="${player.imageUrl}" alt="${player.name}">
        <p>ID: ${player.id}</p>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <p>Created at: ${player.createdAt}</p>
        <p>Updated at: ${player.updatedAt}</p>
        <p>Team ID: ${player.teamId}</p>
        <p>Cohort ID: ${player.cohortId}</p>
      </div>
  
      <button class="back-button">Back</button>
    </div>
    `;

    playerContainer.innerHTML = playerHTML;

    //Create a back button
    let backButton = playerContainer.querySelector(".back-button");
    backButton.addEventListener("click", async () => {
        const players = await fetchAllPlayers();
        renderAllPlayers(players);
        window.location.reload();
    });
};

// Create the form to add the new player
const renderNewPlayerForm = () => {
    try {
        let formHtml = `
        <form>
            <label for ="id">ID</label>
            <input type="text id="ID" name="ID" placeholder="ID">
            <label for="breed">Breed</label>
            <textarea id="breed" name="breed" placeholder="Breed"></textarea>
            <label for ="teamID">teamID</label>
            <input type="text id="teamID" name="teamID" placeholder="TeamID">
            <label for ="imageUrl">imageUrl</label>
            <input type="text id="imageUrl" name="imageUrl" placeholder="ImageURL">
           
            
            <button type="submit">Create</button>
            </form>`;
            newPlayerFormContainer.innerHTML = formHtml;

            let form = newPlayerFormContainer.querySelector("form");
            form.addEventListener("submit", async (event) => {
                event.preventDefault();

                let playersData = {
                    id: form.id.valueOf,
                    breed: form.breed.value,
                    teamID: form.teamID.value,
                    imageUrl: form.imageUrl.value,
                  
                    
                };

                await addNewPlayer(
                    playersData.id,
                    playersData.breed,
                    playersData.teamID,
                    playersData.imageUrl,
                    
                );

                const data = await fetchAllPlayers();
                renderAllPlayers(data);

                form.id.valueOf = "";
                form.breed.value = "";
                form.teamID.value = "";
                form.imageUrl.value = "";
                
            });

    } catch (error) {
        console.error('Uh oh, trouble rendering the new player form!', error);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}
init();
   