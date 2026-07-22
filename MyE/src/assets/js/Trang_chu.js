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
        if (href === fileName) {
            link.classList.add(
                'border-bottom-3', 'border-orange-500',
                'pb-1', 'fw-bold', 'text-orange-500'
            );
        }
    });
}
document.addEventListener('DOMContentLoaded', initHeaderActive);

// ========== DỮ LIỆU ==========

// Mảng dữ liệu các slide của Banner đầu trang
const heroBanners = [
    {
        id: 1,
        bgImage: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/BO_1(1).png",
        cardImage: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/BO_1(2).png",
        caption: "HÀO KHÍ CHIẾN HỒN – siêu phẩm kiếm hiệp mobile PK rực lửa nay đã chính thức ra mắt.<br>Tải game miễn phí và chinh chiến ngay hôm nay!"
    },
    {
        id: 2,
        bgImage: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/BO_2(1).png",
        cardImage: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/BO_2(2).png",
        caption: "HÀO KHÍ DU HIỆP – siêu phẩm kiếm hiệp mobile phong cách vẽ tay cổ điển nay đã ra mắt.<br>Tải game miễn phí và chinh chiến ngay hôm nay!"
    }
];

const INITIAL_DISPLAY_COUNT = 4;

const games = [
    { id: 1, name: "Hào Khí Tam Quốc", image: "../assets/images/Trang_Chu/Ds_Game/CARD(1).png", genre: "RPG", tag: "", homeLink: "#hao-khi-tam-quoc", downloadLink: "#tai-hao-khi-tam-quoc" },
    { id: 2, name: "Hào Khí Chiến Hồn", image: "../assets/images/Trang_Chu/Ds_Game/CARD(2).png", genre: "Action", tag: "HOT", homeLink: "#hao-khi-chien-hon", downloadLink: "#tai-hao-khi-chien-hon" },
    { id: 3, name: "Boom Tank", image: "../assets/images/Trang_Chu/Ds_Game/CARD(3).png", genre: "Simulation", tag: "", homeLink: "#boom-tank", downloadLink: "#tai-boom-tank" },
    { id: 4, name: "Hào Khí Du Hiệp", image: "../assets/images/Trang_Chu/Ds_Game/CARD(4).png", genre: "Shooting", tag: "MOI", homeLink: "#hao-khi-du-hiep", downloadLink: "#tai-hao-khi-du-hiep" },
    { id: 5, name: "Hào Khí Chiến Hồn", image: "../assets/images/Trang_Chu/Ds_Game/CARD(2).png", genre: "Racing", tag: "", homeLink: "#hao-khi-chien-hon", downloadLink: "#tai-hao-khi-chien-hon" },
    { id: 6, name: "Hào Khí Du Hiệp", image: "../assets/images/Trang_Chu/Ds_Game/CARD(4).png", genre: "RPG", tag: "HOT", homeLink: "#hao-khi-du-hiep", downloadLink: "#tai-hao-khi-du-hiep" },
    { id: 7, name: "Hào Khí Tam Quốc", image: "../assets/images/Trang_Chu/Ds_Game/CARD(1).png", genre: "RPG", tag: "", homeLink: "#hao-khi-tam-quoc", downloadLink: "#tai-hao-khi-tam-quoc" },
    { id: 8, name: "Boom Tank", image: "../assets/images/Trang_Chu/Ds_Game/CARD(3).png", genre: "RPG", tag: "MOI", homeLink: "#boom-tank", downloadLink: "#tai-boom-tank" },
];

const newsList = [
    { id: 1, image: "../assets/images/Trang_Chu/Tin_tuc/Tin_tuc_3.png", title: "NẠP GAME XUYÊN BIÊN GIỚI CỰC DỄ VỚI APPLE PAY TRÊN SPAY", desc: "Nạp game quốc tế nhanh hơn với Apple Pay trên SPay. Thanh toán tiện lợi, bảo mật và tối ưu trải nghiệm cho game thủ mọi lúc mọi nơi.", time: "Tin tức | 02/06/2026, 14:30" },
    { id: 2, image: "../assets/images/Trang_Chu/Tin_tuc/Tin_tuc_1.png", title: "MOMO TẶNG BẠN CODE SK NẠP GAME!", desc: "Nhận ngay code ưu đãi lên tới 50K khi nạp game qua Ví MoMo. Thanh toán cực nhanh chóng, tiện lợi săn quà hot với chi phí tiết kiệm giảm sức.", time: "Tin tức | 01/06/2026, 10:00" },
    { id: 3, image: "../assets/images/Trang_Chu/Tin_tuc/Tin_tuc_2.png", title: "MOMO TẶNG 10K - CÁNG GAME THỦ CÀY RANK ĐUA TOP!", desc: "Nhận ngay quà tặng 10K từ MoMo để sẵn sàng cùng đồng đội cày rank, đua top cực sung. Nạp game nhanh chóng, săn quà dễ dàng!", time: "Tin tức | 30/05/2026, 09:00" }
];

const avatarConfig = [
    { img: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/O_Nho(1).png", slideIndex: -1 },
    { img: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/O_Nho(2).png", slideIndex: 0 },
    { img: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/O_Nho(5).png", slideIndex: 1 },
    { img: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/O_Nho(3).png", slideIndex: -1 },
    { img: "../assets/images/Trang_Chu/Hero_Banner_Trang_Chu/O_Nho(4).png", slideIndex: -1 }
];

// ========== DOM ELEMENTS ==========
const gridGame = document.getElementById("game-list-grid");
const expandedGrid = document.getElementById("expanded-game-grid");
const btnToggle = document.getElementById("toggle-more-games");

// ========== HÀM RENDER DỮ LIỆU ==========
function renderGames(games, container) {
    const template = document.getElementById("game-card-template");
    if (!container || !template) return;
    container.innerHTML = "";
    games.forEach(game => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".game-card");
        card.setAttribute("data-game-id", game.id);
        const tagImg = card.querySelector(".tag-img");
        if (game.tag) {
            const isHot = game.tag === "HOT";
            const normalSrc = `../assets/images/Trang_Chu/${isHot ? "gamehot02.png" : "gamemoi02_green.png"}`;
            const hoverSrc = `../assets/images/Trang_Chu/${isHot ? "gamehot_hover.png" : "gamemoi_hover.png"}`;
            tagImg.src = normalSrc;
            tagImg.alt = isHot ? "HOT" : "MOI";
            tagImg.dataset.hoverSrc = hoverSrc;
            tagImg.style.display = "";
            card.addEventListener("mouseenter", () => { tagImg.src = hoverSrc; });
            card.addEventListener("mouseleave", () => { tagImg.src = normalSrc; });
        } else {
            tagImg.remove();
        }
        const nameEl = card.querySelector(".game-name");
        nameEl.textContent = game.name;
        nameEl.title = game.name;
        card.querySelector(".game-genre").textContent = game.genre;
        const imgEl = card.querySelector(".game-image");
        const needsCornerFix =
            (game.name && game.name.toUpperCase() === "BOOM TANK") ||
            (game.name && game.name.toUpperCase() === "HÀO KHÍ TAM QUỐC");
        imgEl.src = game.image;
        imgEl.alt = game.name;
        imgEl.classList.add(...(needsCornerFix
            ? ["scale-110", "group-hover-scale-125"]
            : ["group-hover-scale-105"]));
        clone.querySelector(".home-link").href = game.homeLink;
        clone.querySelector(".download-link").href = game.downloadLink;
        container.appendChild(clone);
    });
}

function renderHeroBanners() {
    const bgLayer = document.querySelector(".hero-bg-layer");
    const sliderContainer = document.querySelector(".slider-container");
    const sliderDots = document.querySelector(".slider-dots");
    const bgTemplate = document.getElementById("bg-slide-template");
    const cardTemplate = document.getElementById("slider-card-template");
    const dotTemplate = document.getElementById("thumbnail-dot-template");
    if (!bgLayer || !sliderContainer || !sliderDots || !bgTemplate || !cardTemplate || !dotTemplate) return;
    heroBanners.forEach((banner, index) => {
        const isFirst = index === 0;
        const bgClone = bgTemplate.content.cloneNode(true);
        const bgSlide = bgClone.querySelector(".bg-slide");
        bgSlide.style.backgroundImage = `url('${banner.bgImage}')`;
        if (isFirst) bgSlide.classList.add("active");
        bgLayer.appendChild(bgClone);
        const cardClone = cardTemplate.content.cloneNode(true);
        const cardItem = cardClone.querySelector(".slider-card-item");
        if (isFirst) cardItem.classList.add("active");
        cardItem.querySelector(".banner-card-img").src = banner.cardImage;
        cardItem.querySelector(".banner-card-img").alt = `Banner Card ${index + 1}`;
        cardItem.querySelector(".banner-caption").innerHTML = banner.caption;
        sliderContainer.appendChild(cardClone);
    });
    avatarConfig.forEach((avatar, index) => {
        const dotClone = dotTemplate.content.cloneNode(true);
        const dot = dotClone.querySelector(".thumbnail-dot");
        if (index === 1) dot.classList.add("active");
        if (avatar.slideIndex === -1) dot.classList.add("disabled");
        if (avatar.slideIndex !== -1) dot.setAttribute("data-slide-index", avatar.slideIndex);
        dot.setAttribute("data-avatar-index", index);
        dot.querySelector("img").src = avatar.img;
        dot.querySelector("img").alt = `Avatar ${index + 1}`;
        sliderDots.appendChild(dotClone);
    });
}

function renderNews() {
    const newsContainer = document.querySelector(".news-list");
    const template = document.getElementById("news-item-template");
    if (!newsContainer || !template) return;
    newsList.forEach(news => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".news-img img").src = news.image;
        clone.querySelector(".news-img img").alt = news.title;
        clone.querySelector(".news-detail h4").textContent = news.title;
        clone.querySelector(".news-desc").textContent = news.desc;
        clone.querySelector(".news-time").textContent = news.time;
        newsContainer.appendChild(clone);
    });
}

// ========== THỰC THI RENDER ==========
renderHeroBanners();
renderNews();

let isExpanded = false;
if (gridGame) {
    renderGames(games.slice(0, INITIAL_DISPLAY_COUNT), gridGame);
}
if (expandedGrid) {
    renderGames(games.slice(INITIAL_DISPLAY_COUNT), expandedGrid);
}
updateToggleButton(false);

// ========== XỬ LÝ SỰ KIỆN ==========
function updateToggleButton(expanded) {
    if (!btnToggle) return;
    btnToggle.firstChild.textContent = expanded ? "Thu gọn " : "Xem thêm ";
    const svg = btnToggle.querySelector("svg");
    if (svg) {
        svg.style.transition = "transform 0.2s ease";
        svg.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
    }
}

if (btnToggle) {
    btnToggle.addEventListener("click", () => {
        isExpanded = !isExpanded;
        const expandedSection = document.getElementById("expanded-game-section");
        const gameListSection = document.getElementById("game-list-section");
        if (isExpanded) {
            expandedSection.classList.remove("hidden");
            expandedSection.classList.add("mb-6");
            gameListSection.classList.remove("mb-82px");
            gameListSection.classList.add("mb-6");
        } else {
            expandedSection.classList.add("hidden");
            expandedSection.classList.remove("mb-6");
            gameListSection.classList.add("mb-82px");
            gameListSection.classList.remove("mb-6");
        }
        updateToggleButton(isExpanded);
    });
}

const filterTabs = document.querySelectorAll(".filter-tab");
if (filterTabs.length > 0) {
    filterTabs[0].classList.add("active");
}
filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.getAttribute("data-filter");
        const filtered = category === "TẤT CẢ"
            ? games
            : games.filter(game => game.genre.toUpperCase() === category);
        renderGames(filtered.slice(0, INITIAL_DISPLAY_COUNT), gridGame);
        if (expandedGrid) {
            renderGames(filtered.slice(INITIAL_DISPLAY_COUNT), expandedGrid);
        }
    });
});

// ========== BANNER SLIDER ==========
function initSlider() {
    const bgSlides = document.querySelectorAll(".hero-bg-layer .bg-slide");
    const cardSlides = document.querySelectorAll(".slider-container .slider-card-item");
    const dots = document.querySelectorAll(".banner-slider .thumbnail-dot");
    if (cardSlides.length === 0) return;
    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        bgSlides.forEach(slide => slide.classList.remove("active"));
        cardSlides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        currentSlideIndex = (index + cardSlides.length) % cardSlides.length;
        if (bgSlides[currentSlideIndex]) bgSlides[currentSlideIndex].classList.add("active");
        if (cardSlides[currentSlideIndex]) cardSlides[currentSlideIndex].classList.add("active");
        const activeDot = document.querySelector(`.thumbnail-dot[data-slide-index="${currentSlideIndex}"]`);
        if (activeDot) activeDot.classList.add("active");
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function startSlideTimer() {
        stopSlideTimer();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideTimer() {
        if (slideInterval) clearInterval(slideInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const dotEl = e.currentTarget;
            if (dotEl.classList.contains("disabled")) return;
            const targetIndex = parseInt(dotEl.getAttribute("data-slide-index"));
            showSlide(targetIndex);
            startSlideTimer();
        });
    });
    startSlideTimer();
}
initSlider();