/* ==========================
   Crop Recommendations Data
========================== */
const cropRecommendations = {
    wheat: {
        soil: "Loamy or clay soil with good drainage",
        season: "Winter (cool climate)",
        water: "Weekly irrigation, avoid waterlogging",
        fertilizer: "Nitrogen-rich fertilizers during growth",
        harvest: "120-150 days after sowing"
    },
    rice: {
        soil: "Clay or silty soil with water retention",
        season: "Summer/Monsoon",
        water: "Requires standing water for most of the growing season",
        fertilizer: "Balanced NPK fertilizers",
        harvest: "100-180 days after transplanting"
    },
    corn: {
        soil: "Well-drained loamy soil",
        season: "Spring/Summer",
        water: "1-1.5 inches of water per week",
        fertilizer: "High nitrogen requirement",
        harvest: "60-100 days after sowing"
    }
    // 👉 Add more crops here as needed
};

/* ==========================
   DOM Elements
========================== */
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const dashboardSection = document.getElementById('dashboardSection');
const featuresSection = document.getElementById('featuresSection');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const recommendationForm = document.getElementById('recommendationForm');

const recommendationsContainer = document.getElementById('recommendationsContainer');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

const logoutItem = document.getElementById('logoutItem');
const logoutBtn = document.getElementById('logoutBtn');

const getStartedBtn = document.getElementById('getStartedBtn');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

const homeLink = document.getElementById('homeLink');
const dashboardLink = document.getElementById('dashboardLink');
const loginLink = document.getElementById('loginLink');

/* ==========================
   Helper Functions
========================== */
// Show a specific section
function showSection(section) {
    // Hide all
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    featuresSection.classList.add('hidden');

    if (section === 'login') loginSection.classList.remove('hidden');
    if (section === 'register') registerSection.classList.remove('hidden');
    if (section === 'dashboard') dashboardSection.classList.remove('hidden');
    if (section === 'features') featuresSection.classList.remove('hidden');
}

// Show notification popup
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/* ==========================
   Navigation Handlers
========================== */
getStartedBtn?.addEventListener('click', () => {
    showSection('login');
});

showRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('register');
});

showLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login');
});

homeLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('features');
});

dashboardLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('dashboard');
});

loginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login');
});

/* ==========================
   Auth System (LocalStorage)
========================== */
// Handle login
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple auth simulation
    showSection('dashboard');
    loginLink.classList.add('hidden');
    logoutItem.classList.remove('hidden');
    showNotification('Login successful! Welcome back 👨‍🌾');
});

// Handle register
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Save user data (in real apps, connect to backend)
    showSection('login');
    showNotification('Registration successful! Please log in ✅');
});

// Handle logout
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login');
    loginLink.classList.remove('hidden');
    logoutItem.classList.add('hidden');
    showNotification('You have been logged out 👋');
});

/* ==========================
   Recommendations Logic
========================== */
recommendationForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const cropType = document.getElementById('cropType').value;
    const soilType = document.getElementById('soilType').value;
    const season = document.getElementById('season').value;

    if (!cropType || !soilType || !season) {
        showNotification("⚠️ Please fill all fields before getting recommendations");
        return;
    }

    const recommendation = cropRecommendations[cropType];

    if (recommendation) {
        recommendationsContainer.innerHTML = `
            <div class="recommendation-card">
                <h5><i class="bi bi-seedling me-2"></i> ${cropType.toUpperCase()} Recommendations</h5>
                <ul>
                    <li><strong>Soil Requirement:</strong> ${recommendation.soil}</li>
                    <li><strong>Best Season:</strong> ${recommendation.season}</li>
                    <li><strong>Watering Needs:</strong> ${recommendation.water}</li>
                    <li><strong>Fertilizer:</strong> ${recommendation.fertilizer}</li>
                    <li><strong>Harvest Time:</strong> ${recommendation.harvest}</li>
                </ul>
            </div>
        `;
        showNotification(`🌱 Recommendations generated for ${cropType}`);
    } else {
        recommendationsContainer.innerHTML = `
            <div class="alert alert-warning">
                Sorry, no recommendations available for this crop yet.
            </div>
        `;
    }
});
