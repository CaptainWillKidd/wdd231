document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('theoryForm');
    
    const savedData = JSON.parse(localStorage.getItem('zeldaTheoryDraft'));
    if(savedData) {
        form.name.value = savedData.name || '';
        form.theory.value = savedData.theory || '';
        if(savedData.character) {
            form.querySelector(`input[value="${savedData.character}"]`).checked = true;
        }
    }

    form.addEventListener('input', () => {
        const draft = {
            name: form.name.value,
            theory: form.theory.value,
            character: form.character.value
        };
        localStorage.setItem('zeldaTheoryDraft', JSON.stringify(draft));
    });

    form.addEventListener('submit', () => {
        localStorage.removeItem('zeldaTheoryDraft');
    });
});