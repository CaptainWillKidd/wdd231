
function openModal(modalId, event) {
    event.preventDefault();
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    
    const lastModified = document.lastModified;
    document.getElementById("lastmodified").textContent = `Last Modified: ${lastModified}`;

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navigation");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    if (document.getElementById('current-temp')) {
        const currentTemp = document.querySelector('#current-temp');
        const weatherIcon = document.querySelector('#weather-icon');
        const captionDesc = document.querySelector('figcaption');
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-23.5587&lon=-46.6489&units=metric&appid=f3416162ccea6fa1ff1b0b01916b5a49';

        async function apiFetch() {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    displayResults(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        function displayResults(data) {
            currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
            const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            let desc = data.weather[0].description;
            desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            weatherIcon.setAttribute('src', iconsrc);
            weatherIcon.setAttribute('alt', desc);
            captionDesc.textContent = desc;
        }

        apiFetch();
    }

    if (document.getElementById('spotlight-cards')) {
        async function loadSpotlights() {
            try {
                const response = await fetch('scripts/members.json');
                const members = await response.json();
                const spotlightContainer = document.getElementById('spotlight-cards');
                const filtered = members.filter(member => member.membership_level >= 2);
                const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
                
                spotlightContainer.innerHTML = shuffled.map(member => `
                    <div class="spotlight-card">
                        <h3>${member.name}</h3>
                        <img src="${member.image}" alt="${member.name} logo">
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p class="highlight">${member.other_info.industry} Specialist</p>
                        <p>${member.other_info.tagline || 'Leading industry expert'}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                        <p class="membership">Membership Level: ${['Member', 'Silver', 'Gold'][member.membership_level - 1]}</p>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Error loading spotlights:', error);
            }
        }
        loadSpotlights();
    }

    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    const visitMessage = document.getElementById('visit-message');
    const currentDate = new Date();
    
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDiff = currentDate - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDiff === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate.toISOString());
});