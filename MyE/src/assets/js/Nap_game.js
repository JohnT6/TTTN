// Xử lý active state cho Header navigation
function initHeaderActive() {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf("/") + 1);
    const navLinks = document.querySelectorAll("header nav a");
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.remove(
            "border-bottom-3",
            "border-orange-500",
            "pb-1",
            "fw-bold",
            "text-orange-500",
        );
        if (
            href === fileName ||
            (fileName === "" && href === "Nap_game.html") ||
            href === "Nap_game.html"
        ) {
            link.classList.add(
                "border-bottom-3",
                "border-orange-500",
                "pb-1",
                "fw-bold",
                "text-orange-500",
            );
        }
    });
}

document.addEventListener("DOMContentLoaded", initHeaderActive);

const categoriesData = [
    { id: "all", name: "TẤT CẢ", quantity: 60 },
    { id: "simulation", name: "SIMULATION", quantity: 4 },
    { id: "action", name: "ACTION", quantity: 11 },
    { id: "rpg", name: "RPG", quantity: 37 },
    { id: "shooting", name: "SHOOTING", quantity: 5 },
    { id: "racing", name: "RACING", quantity: 1 },
];

let currentActiveTab = "all";

function renderCategoryTabs() {
    const tabsContainer = document.querySelector(".category-tabs");

    if (!tabsContainer) return;

    const tabsHTML = categoriesData
        .map((category) => {
            const isActive = category.id === currentActiveTab ? "active" : "";

            return `
            <button 
                class="tab-btn ${isActive}" 
                onclick="handleChangeTab('${category.id}')"
            >
                ${category.name} <span class="quantity">${category.quantity}</span>
            </button>
        `;
        })
        .join("");

    tabsContainer.innerHTML = tabsHTML;
}

function handleChangeTab(clickedTabId) {
    currentActiveTab = clickedTabId;

    renderCategoryTabs();

    console.log("Bấm sang tab:", clickedTabId);
}

renderCategoryTabs();

const gameData = [
    {
        id: "mye",
        name: "MYE COIN",
        image: "../assets/images/Nap_Game/DS-game_nap/MYECOIN.png",
    },
    {
        id: 1,
        name: "HÀO KHÍ CHIẾN HỒN",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
    },
    {
        id: 2,
        name: "HÀO KHÍ DU HIỆP",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png",
    },
    {
        id: 3,
        name: "BOOM TANK",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png",
    },
    {
        id: 4,
        name: "CHÂN VƯƠNG",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png",
    },
    {
        id: 5,
        name: "BOOM TANK",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
    },
    {
        id: 6,
        name: "HÀO KHÍ CHIẾN HỒN",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png",
    },
    {
        id: 7,
        name: "HÀO KHÍ DU HIỆP",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png",
    },
    {
        id: 8,
        name: "BOOM TANK",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png",
    },
    {
        id: 9,
        name: "CHÂN VƯƠNG",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png",
    },
    {
        id: 10,
        name: "BOOM TANK",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png",
    },
    {
        id: 11,
        name: "HÀO KHÍ CHIẾN HỒN",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(4).png",
    },
    {
        id: 12,
        name: "HÀO KHÍ DU HIỆP",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(1).png",
    },
    {
        id: 13,
        name: "BOOM TANK",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(2).png",
    },
    {
        id: 14,
        name: "CHÂN VƯƠNG",
        image: "../assets/images/Nap_Game/DS-game_nap/CARD(3).png",
    },
];

function renderGameGrid() {
    const gridContainer = document.getElementById("game-grid-container");

    const htmlCards = gameData
        .map((game) => {
            const specialClass = game.id === "mye" ? "mye-coin-card" : "";

            return `
            <div class="game-card ${specialClass}" onclick="selectGame('${game.id}')">
                <div class="game-image-wrapper">
                    <img src="${game.image}" alt="${game.name}" class="game-img">
                </div>
                <h3 class="game-title">${game.name}</h3>
            </div>
        `;
        })
        .join("");

    gridContainer.innerHTML = htmlCards;
}

renderGameGrid();

function selectGame(id) {
    // Nếu chọn MYE COIN thì chuyển đến trang MyE_Coin
    if (id === "mye") {
        window.location.href = "MyE_Coin.html";
        return;
    }
    console.log("Đang chuyển đến trang nạp của game ID:", id);
}
// ===================== LOAD HEADER & FOOTER COMPONENTS =====================
async function loadComponents() {
    try {
        // Load Header
        const headerResponse = await fetch("/src/components/Header.html");
        if (headerResponse.ok) {
            const headerContent = await headerResponse.text();
            document.getElementById("header-placeholder").innerHTML =
                headerContent;
            if (typeof initHeaderActive === "function") initHeaderActive();
        }

        // Load Footer
        const footerResponse = await fetch("/src/components/Footer.html");
        if (footerResponse.ok) {
            const footerContent = await footerResponse.text();
            document.getElementById("footer-placeholder").innerHTML =
                footerContent;
        }
    } catch (error) {
        console.error("Lỗi khi tải components:", error);
    }
}

// ===================== KHỞI CHẠY =====================
document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
});
