const baseUrl = 'https://rickandmortyapi.com/api';
let currentPage = 1;

function fetchCharacters(page) {
    const charactersUrl = `${baseUrl}/character?page=${page}`;

    fetch(charactersUrl)
        .then(response => response.json())
        .then(data => {
            const characters = data.results;
            let output = '';
            characters.forEach(character => {
                output += `
                    <div class="col-md-3">
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text">Species: ${character.species}</p>
                                <p class="card-text">Status: ${character.status}</p>
                                <a href="#" class="btn btn-custom" onclick="showCharacterDetails(${character.id})">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('characters').innerHTML += output;
        })
        .catch(error => console.error('Error:', error));
}

function fetchCharacterDetails(characterId) {
    const characterDetailsUrl = `${baseUrl}/character/${characterId}`;

    fetch(characterDetailsUrl)
        .then(response => response.json())
        .then(character => {
            const output = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${character.image}" class="card-img-top" alt="${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">Species: ${character.species}</p>
                            <p class="card-text">Status: ${character.status}</p>
                            <p class="card-text">Gender: ${character.gender}</p>
                            <p class="card-text">Origin: ${character.origin.name}</p>
                            <p class="card-text">Location: ${character.location.name}</p>
                            <a href="#" class="btn btn-custom mt-3" onclick="showCharacterList()">Back to Home</a>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('character-details').innerHTML = output;

            document.getElementById('characters').style.display = 'none';
            document.getElementById('load-more').style.display = 'none';
            document.getElementById('character-details').style.display = 'flex';
        })
        .catch(error => console.error('Error: Trouble fetching character details', error));
}

function showCharacterList() {
    document.getElementById('character-details').style.display = 'none';
    document.getElementById('characters').style.display = 'flex';
    document.getElementById('load-more').style.display = 'block';
}

function showCharacterDetails(characterId) {
    fetchCharacterDetails(characterId);
}

function loadMoreCharacters() {
    currentPage++;
    fetchCharacters(currentPage);
}

function searchCharacters() {
    const searchInput = document.querySelector('.characterInput').value;
    const searchUrl = `${baseUrl}/character/?name=${searchInput}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const character = data.results[0];
                showCharacterDetails(character.id);
            } else {
                document.getElementById('characters').innerHTML = '<p>Error. Character is not in system.</p>';
                document.getElementById('character-details').style.display = 'none';
            }
        })
        .catch(error => console.error('Error: Could not fetch character details', error));
}

fetchCharacters(currentPage);