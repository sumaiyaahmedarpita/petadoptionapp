fetch('http://localhost:3000/api/pets')
  .then(response => response.json())
  .then(pets => {
    const container = document.getElementById('pet-list');
    container.innerHTML = ''; // Clear before adding

    if (pets.length === 0) {
      container.innerHTML = '<p>No pets available for adoption at the moment.</p>';
      return;
    }

    pets.forEach(pet => {
      const card = document.createElement('div');
      card.className = 'pet-card';
      card.innerHTML = `
        <img src="${pet.image || 'https://via.placeholder.com/260x180?text=No+Image'}" alt="${pet.name}" />
        <div class="pet-card-content">
          <h3>${pet.name}</h3>
          <p><strong>Breed:</strong> ${pet.breed || 'N/A'}</p>
          <p><strong>Age:</strong> ${pet.age} year${pet.age > 1 ? 's' : ''}</p>
          <p>${pet.description || ''}</p>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching pets:', error);
    const container = document.getElementById('pet-list');
    container.innerHTML = '<p>Failed to load pets. Please try again later.</p>';
  });
