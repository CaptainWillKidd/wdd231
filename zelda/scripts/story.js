
async function loadStory() {
    try {
        const response = await fetch('scripts/story.json');
        const storyData = await response.json();
        
        const container = document.getElementById('story-container');
        
        storyData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'story-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="story-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="meta">
                        <span>📍 ${item.location}</span>
                        <span>🎮 ${item.characters.join(', ')}</span>
                        <span>🔑 ${item.key_item}</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading story:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadStory);