
let isLoggedIn = false; 


const currentUser = {
    username: "myepro01",
    id: "00123",
    coin: 1000,
    avatar: "./images/avatar-smile.png"
};


function renderHeader() {
    let authHTML = '';

    if (isLoggedIn) {
        authHTML = `
            <div class="user-logged-in" id="user-profile-wrapper">
                <div class="user-profile-toggle" onclick="toggleDropdown()">
                    <img src="${currentUser.avatar}" alt="Avatar" class="user-avatar">
                    <div class="user-info">
                        <span class="user-name">${currentUser.username}</span>
                        <span class="user-id">MyE ID: ${currentUser.id}</span>
                    </div>
                    <div class="user-balance">
                        <img src="./images/coin-icon.png" alt="Coin" class="coin-icon">
                        <span class="coin-amount">${currentUser.coin}</span>
                    </div>
                </div>

                <div class="user-dropdown-menu" id="dropdown-menu">
                    <div class="dropdown-header">
                        <img src="${currentUser.avatar}" alt="Avatar" class="dropdown-avatar">
                        <div class="dropdown-info">
                            <span class="dropdown-name">${currentUser.username}</span>
                            <span class="dropdown-id">MyE ID: ${currentUser.id}</span>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <ul class="dropdown-list">
                        <li>
                            <a href="#">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                Quản lý thanh toán
                            </a>
                        </li>
                        <li>
                            <a href="#" onclick="handleLogout(event)">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        authHTML = `<button class="btn-login" id="btn-login-header" onclick="handleLogin()">ĐĂNG NHẬP</button>`;
    }

    const templateHeader = `
        <header class="mye-header">
            <div class="header-content">
                <div class="logo">
                    <img src="./images/Logo-myE.png" alt="MyE">
                </div>
                <nav class="main-nav">
                    <a href="#">Trang Chủ</a>
                    <a href="#">Trò Chơi</a>
                    <a href="#" class="active">Nạp Game</a>
                    <a href="#">Tin Tức</a>
                    <a href="#">Hỗ Trợ</a>
                </nav>
                <div class="auth-action">
                    ${authHTML} 
                </div>
            </div>
        </header>
    `;

    document.getElementById('header-container').innerHTML = templateHeader;
}




function toggleDropdown() {
    const menu = document.getElementById('dropdown-menu');
    if (menu) menu.classList.toggle('show');
}


function handleLogout(event) {
    event.preventDefault(); 
    isLoggedIn = false;     
    renderHeader();         
}

function handleLogin() {
    isLoggedIn = true;      
    renderHeader();         
}

document.addEventListener('click', function(event) {
    const wrapper = document.getElementById('user-profile-wrapper');
    const menu = document.getElementById('dropdown-menu');
    if (wrapper && menu && !wrapper.contains(event.target)) {
        menu.classList.remove('show');
    }
});

renderHeader();