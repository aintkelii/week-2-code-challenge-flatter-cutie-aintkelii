
document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");


  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () =>
          displayCharacterDetails(character)
        );
        characterBar.appendChild(span);
      });
    })
    .catch((error) => console.error("Error fetching characters:", error));
});
function displayCharacterDetails(character) {
  const detailedInfo = document.getElementById("detailed-info");
  detailedInfo.innerHTML = `
    <img src="${character.image}" alt="${character.name}" />
    <h2>${character.name}</h2>
    <p>Votes: <span id="vote-count">${character.votes}</span></p>
  `;

  
  const votesForm = document.getElementById("votes-form");
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes");
    const voteCount = document.getElementById("vote-count");
    const newVotes =
      parseInt(voteCount.textContent) + parseInt(votesInput.value);
    voteCount.textContent = newVotes;
    votesForm.reset();
  });
}

const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', () => {
  const voteCount = document.getElementById('vote-count');
  voteCount.textContent = 0;
});
const characterForm = document.getElementById("character-form");
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  const newCharacter = {
    name,
    image,
    votes: 0,
  };

  
  const span = document.createElement("span");
  span.textContent = newCharacter.name;
  span.addEventListener("click", () => displayCharacterDetails(newCharacter));
  characterBar.appendChild(span);

  
  displayCharacterDetails(newCharacter);

  characterForm.reset();
});

votesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const votesInput = document.getElementById('votes');
  const voteCount = document.getElementById('vote-count');
  const newVotes = parseInt(voteCount.textContent) + parseInt(votesInput.value);
  voteCount.textContent = newVotes;

 
  fetch(`http://localhost:3000/characters/${character.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ votes: newVotes }),
  })
    .then(response => response.json())
    .then(updatedCharacter => console.log('Votes updated:', updatedCharacter))
    .catch(error => console.error('Error updating votes:', error));

  votesForm.reset();
});


resetButton.addEventListener('click', () => {
  const voteCount = document.getElementById('vote-count');
  voteCount.textContent = 0;


  fetch(`http://localhost:3000/characters/${character.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ votes: 0 }),
  })
    .then(response => response.json())
    .then(updatedCharacter => console.log('Votes reset:', updatedCharacter))
    .catch(error => console.error('Error resetting votes:', error));
});
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;

  const newCharacter = {
    name,
    image,
    votes: 0,
  };


  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then((savedCharacter) => {
      // Add the new character to the character bar
      const span = document.createElement("span");
      span.textContent = savedCharacter.name;
      span.addEventListener("click", () =>
        displayCharacterDetails(savedCharacter)
      );
      characterBar.appendChild(span);

      
      displayCharacterDetails(savedCharacter);
    })
    .catch((error) => console.error("Error saving character:", error));

  characterForm.reset();
});
