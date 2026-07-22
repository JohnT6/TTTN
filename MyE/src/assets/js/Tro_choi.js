// Xử lý active state cho Header navigation
function initHeaderActive() {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove(
            'border-bottom-3', 'border-orange-500',
            'pb-1', 'fw-bold', 'text-orange-500'
        );
        if (href === fileName || (fileName === '' && href === 'Tro_choi.html')) {
            link.classList.add(
                'border-bottom-3', 'border-orange-500',
                'pb-1', 'fw-bold', 'text-orange-500'
            );
        }
    });
}
document.addEventListener('DOMContentLoaded', initHeaderActive);

// ===================== DU LIEU GAME =====================
const INITIAL_DISPLAY_COUNT = 4;

const games = [
    { id: 1, name: "Hào Khí Tam Quốc", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-tam-quoc.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-1.png", genre: "RPG", tag: "", homeLink: "#hao-khi-tam-quoc", downloadLink: "#tai-hao-khi-tam-quoc", featured: true },
    { id: 2, name: "Hào Khí Chiến Hồn", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-chien-hon.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-2.png", genre: "Action", tag: "HOT", homeLink: "#hao-khi-chien-hon", downloadLink: "#tai-hao-khi-chien-hon", featured: true },
    { id: 3, name: "Boom Tank", image: "../assets/images/Tro_Choi/Game_Noi_Bat/boom-tank.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-3.png", genre: "Simulation", tag: "", homeLink: "#boom-tank", downloadLink: "#tai-boom-tank", featured: true },
    { id: 4, name: "Hào Khí Du Hiệp", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-du-hiep.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-4.png", genre: "Shooting", tag: "MOI", homeLink: "#hao-khi-du-hiep", downloadLink: "#tai-hao-khi-du-hiep", featured: true },
    { id: 5, name: "Hào Khí Chiến Hồn", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-chien-hon.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-2.png", genre: "Racing", tag: "", homeLink: "#hao-khi-chien-hon", downloadLink: "#tai-hao-khi-chien-hon", featured: true },
    { id: 6, name: "Hào Khí Du Hiệp", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-du-hiep.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-4.png", genre: "RPG", tag: "MOI", homeLink: "#hao-khi-du-hiep", downloadLink: "#tai-hao-khi-du-hiep", featured: false },
    { id: 7, name: "Hào Khí Tam Quốc", image: "../assets/images/Tro_Choi/Game_Noi_Bat/hao-khi-tam-quoc.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-1.png", genre: "RPG", tag: "", homeLink: "#hao-khi-tam-quoc", downloadLink: "#tai-hao-khi-tam-quoc", featured: true },
    { id: 8, name: "Boom Tank", image: "../assets/images/Tro_Choi/Game_Noi_Bat/boom-tank.png", banner: "../assets/images/Tro_Choi/Game_Noi_Bat/featured-3.png", genre: "RPG", tag: "MOI", homeLink: "#boom-tank", downloadLink: "#tai-boom-tank", featured: false },
];

let isExpandedGameList = false;
let currentNewGameSlide = 0;

// ===================== CLONE GAME CARD =====================
function createGameCard(game) {
    const template = document.getElementById("game-card-template");
    const clone = template.content.cloneNode(true);
    const tagImg = clone.querySelector(".tag-img");
    if (game.tag) {
        const isHot = game.tag === "HOT";
        tagImg.src = `../assets/images/Trang_Chu/${isHot ? "gamehot02.png" : "gamemoi02_green.png"}`;
        tagImg.alt = game.tag;
    } else {
        tagImg.remove();
    }
    const nameEl = clone.querySelector(".game-name");
    nameEl.textContent = game.name;
    nameEl.title = game.name;
    const imgEl = clone.querySelector(".game-image");
    const needsCornerFix =
        (game.name && game.name.toUpperCase() === "BOOM TANK") ||
        (game.name && game.name === "Hào Khí Tam Quốc");
    imgEl.src = game.image;
    imgEl.alt = game.name;
    imgEl.classList.add(...(needsCornerFix
        ? ["scale-110", "group-hover-scale-125"]
        : ["group-hover-scale-105"]));
    clone.querySelector(".home-link").href = game.homeLink;
    clone.querySelector(".download-link").href = game.downloadLink;
    return clone;
}

// ===================== CLONE FEATURED BANNER =====================
function createFeaturedBanner(game, spanClass, isSmall) {
    const template = document.getElementById("featured-banner-template");
    const clone = template.content.cloneNode(true);
    const sizeMap = {
        avatar: isSmall ? "w-10 h-10 md:w-11 md:h-11" : "w-14 h-14 md:w-16 md:h-16",
        title: isSmall ? "text-xs md:text-sm" : "text-sm md:text-lg",
        genre: isSmall ? "text-[10px] md:text-xs" : "text-xs md:text-sm",
        padding: isSmall ? "p-4" : "p-5 md:p-6",
        spacing: isSmall ? "gap-2" : "gap-3",
        actionsPos: isSmall ? "right-2 bottom-2 md:right-3 md:bottom-3" : "right-4 bottom-4 md:right-5 md:bottom-5",
        actionText: isSmall ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs",
    };
    const banner = clone.querySelector(".featured-banner");
    spanClass.split(/\s+/).filter(Boolean).forEach(c => banner.classList.add(c));
    clone.querySelector(".banner-image").src = game.banner;
    clone.querySelector(".banner-image").alt = game.name;
    const avatar = clone.querySelector(".avatar-img");
    avatar.className += " " + sizeMap.avatar;
    avatar.alt = game.name + " Avatar";
    clone.querySelector(".banner-content").className += " " + sizeMap.padding;
    const title = clone.querySelector(".banner-title");
    title.textContent = game.name;
    title.title = game.name;
    title.className += " " + sizeMap.title;
    clone.querySelector(".banner-title-link").href = game.homeLink;
    clone.querySelector(".banner-home-link").href = game.homeLink;
    const genre = clone.querySelector(".banner-genre");
    genre.textContent = game.genre;
    genre.className += " " + sizeMap.genre;
    const actions = clone.querySelector(".banner-actions");
    actions.className += " " + sizeMap.actionsPos + " " + sizeMap.spacing;
    clone.querySelector(".action-home").className += " " + sizeMap.actionText;
    clone.querySelector(".action-home").href = game.homeLink;
    clone.querySelector(".action-download").className += " " + sizeMap.actionText;
    clone.querySelector(".action-download").href = game.downloadLink;
    return clone;
}

// ===================== POPULATE DATA =====================
function populateData() {
    const gameListGrid = document.getElementById("game-list-grid");
    if (gameListGrid) {
        games.slice(0, INITIAL_DISPLAY_COUNT).forEach(game => {
            gameListGrid.appendChild(createGameCard(game));
        });
    }
    const expandedGrid = document.getElementById("expanded-game-grid");
    if (expandedGrid) {
        games.slice(INITIAL_DISPLAY_COUNT).forEach(game => {
            expandedGrid.appendChild(createGameCard(game));
        });
    }
    populateNewGameCards();
    populateFeaturedBanners();
}

function getDisplayedNewGames() {
    const mainGames = games.slice(0, INITIAL_DISPLAY_COUNT);
    if (currentNewGameSlide === 0) return mainGames;
    return [mainGames[3], mainGames[0], mainGames[1], mainGames[2]];
}

function populateNewGameCards() {
    const container = document.getElementById("new-game-cards");
    if (!container) return;
    container.innerHTML = "";
    getDisplayedNewGames().forEach(game => {
        const wrapper = document.createElement("div");
        wrapper.className = "min-w-0 flex-1 basis-0";
        wrapper.appendChild(createGameCard(game));
        container.appendChild(wrapper);
    });
}

function populateFeaturedBanners() {
    const grid = document.getElementById("featured-grid");
    if (!grid) return;
    const featuredGames = games.filter(game => game.featured);
    const sourceGames = featuredGames.length ? featuredGames : games.slice(0, 5);
    const slots = [
        { span: "md:col-span-3 h-[240px] rounded-2xl", isSmall: false },
        { span: "md:col-span-3 h-[240px] rounded-2xl", isSmall: false },
        { span: "md:col-span-2 h-[180px] rounded-2xl", isSmall: true },
        { span: "md:col-span-2 h-[180px] rounded-2xl", isSmall: true },
        { span: "md:col-span-2 h-[180px] rounded-2xl", isSmall: true },
    ];
    slots.forEach((slot, idx) => {
        const game = sourceGames[idx] || sourceGames[0];
        grid.appendChild(createFeaturedBanner(game, slot.span, slot.isSmall));
    });
}

// ===================== CAROUSEL NAVIGATION =====================
function updateNewGameNavButtons() {
    const prevBtn = document.getElementById("new-game-prev");
    const nextBtn = document.getElementById("new-game-next");
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentNewGameSlide === 0;
    nextBtn.disabled = currentNewGameSlide === 1;
}

function setCurrentNewGameSlide(slide) {
    currentNewGameSlide = slide === 1 ? 1 : 0;
    populateNewGameCards();
    updateNewGameNavButtons();
}

// ===================== CẬP NHẬT NÚT TOGGLE =====================
function updateToggleButton(expanded) {
    const btn = document.getElementById("toggle-more-games");
    if (!btn) return;
    btn.firstChild.textContent = expanded ? "Thu gọn " : "Xem thêm ";
    const svg = btn.querySelector("svg");
    if (svg) {
        svg.style.transition = "transform 0.2s ease";
        svg.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
    }
}

// ===================== EVENT BINDING =====================
function bindEvents() {
    updateToggleButton(false);
    const toggleButton = document.getElementById("toggle-more-games");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            isExpandedGameList = !isExpandedGameList;
            const expandedSection = document.getElementById("expanded-game-section");
            const gameListSection = document.getElementById("game-list-section");
            if (isExpandedGameList) {
                expandedSection.classList.remove("d-none");
                expandedSection.classList.add("mb-6");
                gameListSection.classList.remove("mb-82px");
                gameListSection.classList.add("mb-6");
            } else {
                expandedSection.classList.add("d-none");
                expandedSection.classList.remove("mb-6");
                gameListSection.classList.add("mb-82px");
                gameListSection.classList.remove("mb-6");
            }
            updateToggleButton(isExpandedGameList);
        });
    }
    const prevBtn = document.getElementById("new-game-prev");
    const nextBtn = document.getElementById("new-game-next");
    if (prevBtn) prevBtn.addEventListener("click", () => setCurrentNewGameSlide(0));
    if (nextBtn) nextBtn.addEventListener("click", () => setCurrentNewGameSlide(1));
    updateNewGameNavButtons();
}

// ===================== KHOI CHAY =====================
document.addEventListener("DOMContentLoaded", () => {
    populateData();
    bindEvents();
});