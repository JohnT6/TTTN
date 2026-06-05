
const categoriesData = [
    { id: 'all', name: 'TẤT CẢ', quantity: 60 },
    { id: 'simulation', name: 'SIMULATION', quantity: 4 },
    { id: 'action', name: 'ACTION', quantity: 11 },
    { id: 'rpg', name: 'RPG', quantity: 37 },
    { id: 'shooting', name: 'SHOOTING', quantity: 5 },
    { id: 'racing', name: 'RACING', quantity: 1 }
];

let currentActiveTab = 'all';


function renderCategoryTabs() {

    const tabsContainer = document.querySelector('.category-tabs');
    if (!tabsContainer) return; 


    const tabsHTML = categoriesData.map(category => {

        const isActive = category.id === currentActiveTab ? 'active' : '';


        return `
            <button 
                class="tab-btn ${isActive}" 
                onclick="handleChangeTab('${category.id}')"
            >
                ${category.name} <span class="quantity">${category.quantity}</span>
            </button>
        `;
    }).join('');


    tabsContainer.innerHTML = tabsHTML;
}


function handleChangeTab(clickedTabId) {

    currentActiveTab = clickedTabId;


    renderCategoryTabs();



    console.log("Bấm sang tab:", clickedTabId);
}


renderCategoryTabs();


const gameData = [
    { id: 'mye', name: 'MYE COIN', image: './images/ListGame/MYE_COIN-removebg-preview.png' },
    { id: 1, name: 'HÀO KHÍ CHIẾN HỒN', image: './images/ListGame/CARD (4).png' },
    { id: 2, name: 'HÀO KHÍ DU HIỆP', image: './images/ListGame/CARD (1).png' },
    { id: 3, name: 'BOOM TANK', image: './images/ListGame/CARD (2).png' },
    { id: 4, name: 'CHÂN VƯƠNG', image: './images/ListGame/CARD (3).png' },
    { id: 5, name: 'BOOM TANK', image: './images/ListGame/CARD (2).png' },
    { id: 6, name: 'HÀO KHÍ CHIẾN HỒN', image: './images/ListGame/CARD (4).png' },
    { id: 7, name: 'HÀO KHÍ DU HIỆP', image: './images/ListGame/CARD (1).png' },
    { id: 8, name: 'BOOM TANK', image: './images/ListGame/CARD (2).png' },
    { id: 9, name: 'CHÂN VƯƠNG', image: './images/ListGame/CARD (3).png' },
    { id: 10, name: 'BOOM TANK', image: './images/ListGame/CARD (2).png' },
    { id: 11, name: 'HÀO KHÍ CHIẾN HỒN', image: './images/ListGame/CARD (4).png' },
    { id: 12, name: 'HÀO KHÍ DU HIỆP', image: './images/ListGame/CARD (1).png' },
    { id: 13, name: 'BOOM TANK', image: './images/ListGame/CARD (2).png' },
    { id: 14, name: 'CHÂN VƯƠNG', image: './images/ListGame/CARD (3).png' }
];


function renderGameGrid() {
    const gridContainer = document.getElementById('game-grid-container');
    

    const htmlCards = gameData.map(game => {

        const specialClass = game.id === 'mye' ? 'mye-coin-card' : '';
        

        return `
            <div class="game-card ${specialClass}" onclick="selectGame('${game.id}')">
                <div class="game-image-wrapper">
                    <img src="${game.image}" alt="${game.name}" class="game-img">
                </div>
                <h3 class="game-title">${game.name}</h3>
            </div>
        `;
    }).join('');


    gridContainer.innerHTML = htmlCards;
}


renderGameGrid();


function selectGame(id) {
    console.log("Đang chuyển đến trang nạp của game ID:", id);
    // Xử lý logic đổi màu, active, hoặc chuyển Component ở đây
}

