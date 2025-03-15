document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastmodified").textContent = `Last Modified: ${lastModified}`;

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navigation");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    const chamberCards = document.getElementById('chamber-cards');
    let currentView = 'grid';

    addViewToggleButton();
    
    loadMembers();

    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error loading members:', error);
        }
    }

    function displayMembers(members) {
        chamberCards.innerHTML = members.map(member => `
            <div class="member-card">
                <img src="${member.image}" alt="${member.name} logo">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                <p class="membership">Membership Level: ${getMembershipLevel(member.membership_level)}</p>
                <div class="additional-info">
                    <p>Industry: ${member.other_info.industry}</p>
                    <p>Founded: ${member.other_info.founded}</p>
                </div>
            </div>
        `).join('');
    }

    function getMembershipLevel(level) {
        return ['Member', 'Silver', 'Gold'][level - 1];
    }

    function addViewToggleButton() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'view-toggle';
        toggleBtn.textContent = 'Switch to List View';
        document.querySelector('main').insertBefore(toggleBtn, chamberCards);

        toggleBtn.addEventListener('click', () => {
            currentView = currentView === 'grid' ? 'list' : 'grid';
            chamberCards.className = currentView + '-view';
            toggleBtn.textContent = `Switch to ${currentView === 'grid' ? 'List' : 'Grid'} View`;
        });
    }
});