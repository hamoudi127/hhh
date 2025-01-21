// Initialize candidates with their Arabic names
const candidates = [
    { id: 'candidate1', name: ' المرشح محمد الباقر التسلسل(5)', votes: 0 },
    { id: 'candidate2', name: 'المرشح امير مهند التسلسل (12)', votes: 0 },
    { id: 'candidate3', name: ' المرشح حسين علي التسلسل (18)', votes: 0 }
];

// Load votes from localStorage when page loads
function loadVotes() {
    const savedVotes = localStorage.getItem('candidateVotes');
    if (savedVotes) {
        const votesData = JSON.parse(savedVotes);
        candidates.forEach((candidate, index) => {
            candidate.votes = votesData[index].votes;
        });
    }
    updateVoteDisplay();
}

// Save votes to localStorage
function saveVotes() {
    localStorage.setItem('candidateVotes', JSON.stringify(candidates));
}

// Update the display of votes
function updateVoteDisplay() {
    const votingSection = document.getElementById('التصويت');
    if (!votingSection.querySelector('.vote-results')) {
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'vote-results';
        votingSection.appendChild(resultsDiv);
    }
    
    const resultsDiv = votingSection.querySelector('.vote-results');
    resultsDiv.innerHTML = '<h3>نتائج التصويت:</h3>' +
        candidates.map(candidate => 
            `<p>${candidate.name}: ${candidate.votes} صوت</p>`
        ).join('');
}

// Handle the voting form submission
document.getElementById('votingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedCandidate = document.getElementById('candidate').value;
    const candidate = candidates.find(c => c.id === selectedCandidate);
    
    if (candidate) {
        candidate.votes++;
        saveVotes();
        updateVoteDisplay();
        alert('تم التصويت بنجاح!');
    }
});

// Load votes when page loads
loadVotes();