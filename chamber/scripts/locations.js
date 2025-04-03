document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cardys-container');
    
    fetch('scripts/locations.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(locations => {
            if (!locations || !locations.length) {
                throw new Error('No locations found');
            }
            
            container.innerHTML = '';
            
            locations.forEach((location, index) => {
                const card = document.createElement('article');
                card.className = 'cardy';
                card.setAttribute('aria-label', `Attraction: ${location.name}`);
                
                card.innerHTML = `
                    <h2 id="title-${index}">${location.name}</h2>
                    <figure>
                        <img src="${location.image}" 
                            alt="${location.name}" 
                            aria-labelledby="title-${index}"
                            loading="lazy">
                    </figure>
                    <address>${location.address}</address>
                    <p>${location.description}</p>
                    <button class="learn-more" data-id="${index}" aria-label="Learn more about ${location.name}">Learn More</button>
                `;
                
                container.appendChild(card);
            });

            document.querySelectorAll('.learn-more').forEach(button => {
                button.addEventListener('click', function() {
                    const locationId = this.dataset.id;
                    showLocationDetails(locations[locationId]);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = `
                <div class="error-message">
                    <p>We're sorry, we couldn't load the attractions at this time.</p>
                    <p>${error.message}</p>
                </div>
            `;
        });

    function showLocationDetails(location) {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${location.name}</h2>
                <img src="${location.image}" alt="${location.name}">
                <address>${location.address}</address>
                <p>${location.description}</p>
            </div>
        `;
        
        modal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
    }
});