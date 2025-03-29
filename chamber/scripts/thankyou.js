document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    
    const membershipLevels = {
        '1': 'NP Membership',
        '2': 'Bronze Membership',
        '3': 'Silver Membership',
        '4': 'Gold Membership'
    };

    const formatDate = (isoString) => {
        if(!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('pt-BR');
    };

    document.querySelector("#review").innerHTML = `
        <h3>Application Details</h3>
        <p><strong>First Name:</strong> ${params.get('firstname') || 'N/A'}</p>
        <p><strong>Last Name:</strong> ${params.get('lastname') || 'N/A'}</p>
        <p><strong>Organizational Title:</strong> ${params.get('organizational') || 'N/A'}</p>
        <p><strong>Email:</strong> ${params.get('email') || 'N/A'}</p>
        <p><strong>Phone Number:</strong> ${params.get('phonenumber') || 'N/A'}</p>
        <p><strong>Business Name:</strong> ${params.get('business') || 'N/A'}</p>
        <p><strong>Membership Level:</strong> ${membershipLevels[params.get('membership')] || 'N/A'}</p>
        <p><strong>Reason for Joining:</strong> ${params.get('reason') || 'N/A'}</p>
        <p><strong>Time of Application:</strong> ${formatDate(params.get('timestamp'))}</p>
    `;
});