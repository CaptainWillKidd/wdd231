
document.addEventListener("DOMContentLoaded", function() {
    const chamberCards = document.getElementById('chamber-cards');
    let currentView = 'grid';

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'view-toggle';
    toggleBtn.textContent = 'Switch to List View';
    document.querySelector('main').insertBefore(toggleBtn, chamberCards);

    toggleBtn.addEventListener('click', () => {
        currentView = currentView === 'grid' ? 'list' : 'grid';
        chamberCards.className = currentView + '-view';
        toggleBtn.textContent = `Switch to ${currentView === 'grid' ? 'List' : 'Grid'} View`;
    });

    async function loadMembers() {
        try {
            const response = await fetch('scripts/members.json');
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
                <p class="membership">Membership Level: ${['Member', 'Silver', 'Gold'][member.membership_level - 1]}</p>
                <div class="additional-info">
                    <p>Industry: ${member.other_info.industry}</p>
                    <p>Founded: ${member.other_info.founded}</p>
                </div>
            </div>
        `).join('');
    }

    loadMembers();
});