document.addEventListener('DOMContentLoaded', () => {
    renderTable(); // Initialize the league table
    renderFixtures(); // Initialize fixtures if applicable
});

// Dummy data for the league table and fixtures
const teams = [
    { name: 'Jamus FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Kator FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Malakia FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Lion Hunters FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Koryom FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Al Hilal FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Holy Family FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Nile City FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Olympic FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Salam FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'El Merriekh Bentiu SC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Wajuma FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Young Stars FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Bentiu City SC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
];


const fixtures = [
    { home: 'Team A', away: 'Team B', date: '2024-01-15' },
    { home: 'Team C', away: 'Team D', date: '2024-01-16' },
];

// Helper function to render the league table
function renderTable() {
    const tableBody = document.getElementById('league-table-body');
    tableBody.innerHTML = '';

    // Sort teams by points, goal difference (if applicable), then alphabetically
    teams.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

    // Render each team's data with position
    teams.forEach((team, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td> <!-- Position -->
                <td>${team.name}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}


// Helper function to render the fixtures
function renderFixtures() {
    const fixturesList = document.getElementById('fixtures-list');
    fixturesList.innerHTML = '';
    fixtures.forEach(fixture => {
        fixturesList.innerHTML += `<li>${fixture.home} vs ${fixture.away} - ${fixture.date}</li>`;
    });
}

// Handle tab switching
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = tab.id === tabId ? 'block' : 'none';
    });
}

// Handle result submission
document.getElementById('results-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const homeTeam = document.getElementById('home-team').value;
    const awayTeam = document.getElementById('away-team').value;
    const homeScore = parseInt(document.getElementById('home-score').value);
    const awayScore = parseInt(document.getElementById('away-score').value);

    const home = teams.find(team => team.name === homeTeam);
    const away = teams.find(team => team.name === awayTeam);

    if (home && away) {
        home.played += 1;
        away.played += 1;

        if (homeScore > awayScore) {
            home.won += 1;
            home.points += 3;
            away.lost += 1;
        } else if (homeScore < awayScore) {
            away.won += 1;
            away.points += 3;
            home.lost += 1;
        } else {
            home.drawn += 1;
            away.drawn += 1;
            home.points += 1;
            away.points += 1;
        }

        renderTable();
        alert('Result added successfully!');
        e.target.reset();
    } else {
        alert('Invalid team names!');
    }
});

// Initialize the page
renderTable();
renderFixtures();

// Helper function to render results
function renderResults() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    results.forEach((result) => {
        resultsList.innerHTML += `
            <tr>
                <td>${result.home} vs ${result.away}</td>
                <td>${result.homeScore} - ${result.awayScore}</td>
                <td>${result.date}</td>
                <td><button class="edit-result" data-id="${result.id}">Edit</button></td>
            </tr>`;
    });

    // Attach event listeners to "Edit" buttons
    document.querySelectorAll('.edit-result').forEach((button) => {
        button.addEventListener('click', (e) => {
            const matchId = e.target.getAttribute('data-id');
            loadResultIntoForm(matchId);
        });
    });
}

// Load a result into the update form for editing
function loadResultIntoForm(matchId) {
    const result = results.find((r) => r.id == matchId);

    if (result) {
        document.getElementById('update-match-id').value = result.id;
        document.getElementById('update-home-score').value = result.homeScore;
        document.getElementById('update-away-score').value = result.awayScore;
    } else {
        alert('Match not found!');
    }
}

// Handle result update form submission
document.getElementById('update-results-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const matchId = parseInt(document.getElementById('update-match-id').value);
    const homeScore = parseInt(document.getElementById('update-home-score').value);
    const awayScore = parseInt(document.getElementById('update-away-score').value);

    const result = results.find((r) => r.id === matchId);

    if (result) {
        result.homeScore = homeScore;
        result.awayScore = awayScore;

        alert('Result updated successfully!');
        renderResults();
        updateLeagueTable(result.home, result.away, homeScore, awayScore);
    } else {
        alert('Invalid Match ID!');
    }
});

// Update league table after result update
function updateLeagueTable(homeTeamName, awayTeamName, homeScore, awayScore) {
    const home = teams.find((team) => team.name === homeTeamName);
    const away = teams.find((team) => team.name === awayTeamName);

    if (home && away) {
        home.played += 1;
        away.played += 1;

        if (homeScore > awayScore) {
            home.won += 1;
            home.points += 3;
            away.lost += 1;
        } else if (homeScore < awayScore) {
            away.won += 1;
            away.points += 3;
            home.lost += 1;
        } else {
            home.drawn += 1;
            away.drawn += 1;
            home.points += 1;
            away.points += 1;
        }

        renderTable();
    }
}

// Initialize the page with results
renderResults();
// Handle match results upload form submission
document.getElementById('upload-results-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const homeTeam = document.getElementById('upload-home-team').value;
    const awayTeam = document.getElementById('upload-away-team').value;
    const homeScore = parseInt(document.getElementById('upload-home-score').value);
    const awayScore = parseInt(document.getElementById('upload-away-score').value);
    const matchDate = document.getElementById('upload-date').value;

    if (homeTeam && awayTeam && !isNaN(homeScore) && !isNaN(awayScore) && matchDate) {
        const newResult = {
            id: results.length + 1,
            home: homeTeam,
            away: awayTeam,
            homeScore: homeScore,
            awayScore: awayScore,
            date: matchDate,
        };

        // Add the new result to the results array
        results.push(newResult);

        // Update the results table and league table
        renderResults();
        updateLeagueTable(homeTeam, awayTeam, homeScore, awayScore);

        // Clear the form and display a success message
        document.getElementById('upload-results-form').reset();
        document.getElementById('upload-message').innerText = 'Result uploaded successfully!';
    } else {
        document.getElementById('upload-message').innerText = 'Please fill in all fields correctly.';
    }
});
const team = [
    { name: 'Jamus FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Kator FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Malakia FC Juba', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Lion Hunters FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Koryom FC Bor', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Al Hilal FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Holy Family FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Nile City FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Olympic FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Salam FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'El Merriekh Bentiu SC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Wajuma FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Young Stars FC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { name: 'Bentiu City SC', played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
];

const results = [];

// Populate team options in the form
function populateTeamOptions() {
    const homeTeamSelect = document.getElementById('home-team');
    const awayTeamSelect = document.getElementById('away-team');

    teams.forEach((team) => {
        const option = `<option value="${team.name}">${team.name}</option>`;
        homeTeamSelect.innerHTML += option;
        awayTeamSelect.innerHTML += option;
    });
}

// Render league table
function renderTable() {
    const tableBody = document.getElementById('league-table-body');
    tableBody.innerHTML = '';

    teams.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
    teams.forEach((team, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${team.name}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

// Render results list
function renderResults() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    results.forEach((result) => {
        resultsList.innerHTML += `
            <tr>
                <td>${result.home} vs ${result.away}</td>
                <td>${result.homeScore} - ${result.awayScore}</td>
                <td>${result.date}</td>
            </tr>`;
    });
}

// Handle results form submission
document.getElementById('results-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const homeTeam = document.getElementById('home-team').value;
    const awayTeam = document.getElementById('away-team').value;
    const homeScore = parseInt(document.getElementById('home-score').value);
    const awayScore = parseInt(document.getElementById('away-score').value);

    if (homeTeam && awayTeam && homeTeam !== awayTeam && !isNaN(homeScore) && !isNaN(awayScore)) {
        // Update results
        results.push({
            home: homeTeam,
            away: awayTeam,
            homeScore,
            awayScore,
            date: new Date().toLocaleDateString(),
        });

        // Update league table
        updateLeagueTable(homeTeam, awayTeam, homeScore, awayScore);

        // Re-render results and table
        renderResults();
        renderTable();

        alert('Result submitted successfully!');
        e.target.reset();
    } else {
        alert('Invalid input. Please fill in all fields correctly.');
    }
});

// Update league table dynamically
function updateLeagueTable(homeTeamName, awayTeamName, homeScore, awayScore) {
    const home = teams.find((team) => team.name === homeTeamName);
    const away = teams.find((team) => team.name === awayTeamName);

    if (home && away) {
        home.played += 1;
        away.played += 1;

        if (homeScore > awayScore) {
            home.won += 1;
            home.points += 3;
            away.lost += 1;
        } else if (homeScore < awayScore) {
            away.won += 1;
            away.points += 3;
            home.lost += 1;
        } else {
            home.drawn += 1;
            away.drawn += 1;
            home.points += 1;
            away.points += 1;
        }
    }
}

// Initialize the page
populateTeamOptions();
renderTable();
renderResults();
