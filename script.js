// ==================== 1 & 2 : DATA & STATE ====================
const testUsers = [
    { id: 1, login: "torvalds", name: "Linus Torvalds", avatar_url: "https://avatars.githubusercontent.com/u/1024588?v=4", bio: "Linux creator", followers: 200000, following: 0, public_repos: 50 },
    { id: 2, login: "gvanrossum", name: "Guido van Rossum", avatar_url: "https://avatars.githubusercontent.com/u/6490553?v=4", bio: "Python creator", followers: 50000, following: 50, public_repos: 30 }
];

const state = {
    currentUser: null,
    bookmarks: JSON.parse(localStorage.getItem('gh-bookmarks')) || [],
    isViewingBookmarks: false
};

// ==================== 3 : DOM ELEMENTS ====================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const userProfile = document.getElementById('userProfile');
const reposList = document.getElementById('reposList');
const welcomeState = document.getElementById('welcomeState');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultsContainer = document.getElementById('resultsContainer');

// ==================== 4 & 5 : DISPLAY FUNCTIONS ====================
function displayUserProfile(user) {
    userProfile.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" width="100" style="border-radius:50%">
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || 'Pas de bio disponible'}</p>
            <ul>
                <li>Followers: ${user.followers}</li>
                <li>Repos: ${user.public_repos}</li>
            </ul>
            <button onclick="toggleBookmark('${user.login}')">Ajouter aux favoris</button>
        </div>
    `;
    showSection(resultsContainer);
}

function displayRepositories(repos) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `<h4>${repo.name}</h4><p>${repo.language || 'JS'}</p>`;
        reposList.appendChild(card);
    });
}

// ==================== 6 : STATE HANDLERS ====================
function showSection(sectionToShow) {
    [welcomeState, loadingState, errorState, resultsContainer].forEach(s => s.classList.add('hidden'));
    sectionToShow.classList.remove('hidden');
}

// ==================== 7 : SEARCH LOGIC ====================
function searchUserLocal(username) {
    showSection(loadingState);
    
    setTimeout(() => {
        const user = testUsers.find(u => u.login.toLowerCase() === username.toLowerCase());
        if (user) {
            state.currentUser = user;
            displayUserProfile(user);
            // Simuler l'affichage de repos de test
            displayRepositories([{name: "Test Repo", language: "JavaScript"}]);
        } else {
            showSection(errorState);
        }
    }, 500);
}

// ==================== 8 : EVENT LISTENERS ====================
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) searchUserLocal(query);
});

// Initialisation
showSection(welcomeState);